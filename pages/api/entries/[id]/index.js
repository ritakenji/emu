import dbConnect from "@/db/connect.js";
import Entry from "@/db/models/Entry";
import Emotion from "@/db/models/Emotion"; // validate emotion IDs on update
import mongoose from "mongoose"; // validate ObjectId

export default async function handler(request, response) {
  // Early guard: only allow these methods at this route
  const allowed = ["GET", "PUT", "DELETE"];
  if (!allowed.includes(request.method)) {
    return response.status(405).json({ status: "Method Not Allowed" });
  }

  // Validate the path param after method is known to be supported
  const { id } = request.query;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "Invalid entry id." });
  }

  if (request.method === "GET") {
    try {
      await dbConnect();

      const entry = await Entry.findById(id).populate("emotions").lean();
      if (!entry) {
        return response.status(404).json({ status: "Not found" });
      }

      return response.status(200).json(entry);
    } catch (error) {
      console.error("GET /api/entries/[id] failed:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }
  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    return response.status(401).json({ status: "Not authorized" });
  }
  if (request.method === "PUT") {
    if (!request.headers["content-type"]?.includes("application/json")) {
      return response
        .status(415)
        .json({ message: "Unsupported Media Type: expected application/json" });
    }

    try {
      await dbConnect();

      const { emotions, intensity, dateTime, notes } = request.body ?? {};
      const updates = {};
      const errors = {};

      if (emotions !== undefined) {
        if (!Array.isArray(emotions) || emotions.length === 0) {
          errors.emotions = "Select at least one emotion.";
        } else {
          // unwrap objects -> ids (accept either {_id: "..."} or plain string)
          const ids = emotions
            .map((e) => (e && e._id ? String(e._id) : String(e)))
            .filter(Boolean);

          // validate all are ObjectIds
          if (!ids.every((id) => mongoose.Types.ObjectId.isValid(id))) {
            errors.emotions = "One or more emotion IDs are invalid.";
          } else {
            const count = await Emotion.countDocuments({ _id: { $in: ids } });
            if (count !== ids.length) {
              errors.emotions = "One or more emotion IDs do not exist.";
            } else {
              updates.emotions = [...new Set(ids)];
            }
          }
        }
      }

      if (intensity !== undefined) {
        const i = Number(intensity);
        if (!Number.isInteger(i) || i < 1 || i > 10) {
          errors.intensity = "Intensity must be an integer between 1 and 10.";
        } else {
          updates.intensity = i;
        }
      }

      if (dateTime !== undefined) {
        const dt = new Date(dateTime);
        if (isNaN(dt.getTime())) {
          errors.dateTime = "Date must be valid.";
        } else {
          updates.dateTime = dt.toISOString();
        }
      }

      if (notes !== undefined) {
        if (typeof notes === "string" && notes.length > 1000) {
          errors.notes = "Notes must be 1000 characters or fewer.";
        } else {
          updates.notes = typeof notes === "string" ? notes.trim() : notes;
        }
      }

      if (Object.keys(errors).length) {
        return response
          .status(400)
          .json({ message: "Validation failed", errors });
      }

      const updated = await Entry.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      })
        .populate("emotions")
        .lean();

      if (!updated) {
        return response.status(404).json({ status: "Not found" });
      }

      return response.status(200).json(updated);
    } catch (error) {
      if (error?.name === "ValidationError") {
        const fieldErrors = Object.fromEntries(
          Object.entries(error.errors).map(([k, v]) => [k, v.message])
        );
        return response
          .status(400)
          .json({ message: "Validation failed", errors: fieldErrors });
      }
      console.error("PUT /api/entries/[id] failed:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  if (request.method === "DELETE") {
    try {
      await dbConnect();

      const deleted = await Entry.findByIdAndDelete(id);
      if (!deleted) {
        return response.status(404).json({ status: "Not found" });
      }

      return response.status(204).end();
    } catch (error) {
      console.error("DELETE /api/entries/[id] failed:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }
}
