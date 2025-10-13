import dbConnect from "@/db/connect";
import Entry from "@/db/models/Entry";
import Emotion from "@/db/models/Emotion"; //import to validate emotion IDs
import mongoose from "mongoose"; // for ObjectId validation

export default async function handler(request, response) {
  const allowed = ["GET", "POST"];
  if (!allowed.includes(request.method)) {
    return response.status(405).json({ status: "Method Not Allowed" });
  }

  if (request.method === "GET") {
    try {
      //connect inside try for consistent 500 handling
      await dbConnect();
      //Use lean() for faster, lighter read returning plain js objects instead of full Mongoose documents
      const entries = await Entry.find()
        .populate("emotions")
        .sort({ dateTime: -1 })
        .lean();

      //200 with [] instead of 404 when no entries
      return response.status(200).json(entries || []);
    } catch (error) {
      console.error("GET /api/entries failed:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  // request.method === "POST"
  //Optional but recommended—enforce JSON bodies for create.
  if (!request.headers["content-type"]?.includes("application/json")) {
    return response
      .status(415)
      .json({ message: "Unsupported Media Type: expected application/json" });
  }
  try {
    await dbConnect();
    //Server-side validation to mirror front-end checks (Postman/curl can bypass UI).
    const { emotions, dateTime, intensity, notes } = request.body ?? {};
    const errors = {};

    // emotions must be a non-empty array
    if (!Array.isArray(emotions) || emotions.length === 0) {
      errors.emotions = "Select at least one emotion.";
    }

    // intensity must be 1–10 integer
    const parsedIntensity = Number(intensity);
    if (
      !Number.isInteger(parsedIntensity) ||
      parsedIntensity < 1 ||
      parsedIntensity > 10
    ) {
      errors.intensity = "Intensity must be an integer between 1 and 10.";
    }

    // dateTime must be a valid date
    const dt = new Date(dateTime);
    if (!dateTime || isNaN(dt.getTime())) {
      errors.dateTime = "Date and time is required and must be a valid date.";
    }

    // cap notes length to prevent unbounded input
    if (typeof notes === "string" && notes.length > 1000) {
      errors.notes = "Notes must be 1000 characters or fewer.";
    }

    if (Object.keys(errors).length) {
      //400 with field-level errors → predictable for clients
      return response
        .status(400)
        .json({ message: "Validation failed", errors });
    }

    //Verify all emotion IDs exist
    // Verify all emotion IDs exist (accept either plain ids or objects with _id)
    const emotionIds = Array.isArray(emotions)
      ? emotions
          .map((e) => (e && e._id ? String(e._id) : String(e)))
          .filter(Boolean)
      : [];

    if (!emotionIds.length) {
      return response
        .status(400)
        .json({ message: "Select at least one emotion." });
    }

    if (!emotionIds.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return response
        .status(400)
        .json({ message: "One or more emotion IDs are invalid." });
    }

    const found = await Emotion.countDocuments({ _id: { $in: emotionIds } });
    if (found !== emotionIds.length) {
      return response
        .status(400)
        .json({ message: "One or more emotion IDs do not exist." });
    }

    //Normalize values before insert
    const created = await Entry.create({
      emotions: emotionIds,
      dateTime: dt.toISOString(),
      intensity: parsedIntensity,
      notes: typeof notes === "string" ? notes.trim() : notes,
    });

    //Return 201 + created resource (more useful than plain status text)
    await created.populate("emotions");
    return response.status(201).json(created);
  } catch (error) {
    //Map Mongoose validation errors to 400 rather than 500
    if (error?.name === "ValidationError") {
      const fieldErrors = Object.fromEntries(
        Object.entries(error.errors).map(([k, v]) => [k, v.message])
      );
      return response
        .status(400)
        .json({ message: "Validation failed", errors: fieldErrors });
    }
    console.error("POST /api/entries failed:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
