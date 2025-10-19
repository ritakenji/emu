import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import mongoose from "mongoose";

import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/db/connect";
import Entry from "@/db/models/Entry";
import Emotion from "@/db/models/Emotion";
export default async function handler(request, response) {
  const allowed = ["GET", "POST"];
  if (!allowed.includes(request.method)) {
    return response.status(405).json({ status: "Method Not Allowed" });
  }

  if (request.method === "GET") {
    try {
      await dbConnect();

      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      const userId = token?.sub;

      const query = userId
        ? { owner: { $in: [userId] } }
        : { owner: "default" };
      const entries = await Entry.find(query)
        .populate("emotions")
        .sort({ dateTime: -1 })
        .lean();

      return response.status(200).json(entries || []);
    } catch (error) {
      console.error("GET /api/entries failed:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  if (!request.headers["content-type"]?.includes("application/json")) {
    return response
      .status(415)
      .json({ message: "Unsupported Media Type: expected application/json" });
  }
  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    return response.status(401).json({ status: "Not authorized" });
  }
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const userId = token?.sub;
  if (!userId) {
    return response.status(401).json({ status: "Not authorized" });
  }
  try {
    await dbConnect();
    const { emotions, dateTime, intensity, notes, imageUrl } =
      request.body ?? {};
    const errors = {};
    if (!Array.isArray(emotions) || emotions.length === 0) {
      errors.emotions = "Select at least one emotion.";
    }

    const parsedIntensity = Number(intensity);
    if (
      !Number.isInteger(parsedIntensity) ||
      parsedIntensity < 1 ||
      parsedIntensity > 10
    ) {
      errors.intensity = "Intensity must be an integer between 1 and 10.";
    }

    const dt = new Date(dateTime);
    if (!dateTime || isNaN(dt.getTime())) {
      errors.dateTime = "Date and time is required and must be a valid date.";
    }

    if (typeof notes === "string" && notes.length > 1000) {
      return response
        .status(400)
        .json({ message: "Notes must be 1000 characters or fewer.", errors });
    }

    if (Object.keys(errors).length) {
      return response
        .status(400)
        .json({ message: "Validation failed", errors });
    }

    const emotionIds = Array.isArray(emotions)
      ? emotions
          .map((emotion) =>
            emotion && emotion._id ? String(emotion._id) : String(emotion)
          )
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

    const created = await Entry.create({
      emotions: emotionIds,
      dateTime: dt.toISOString(),
      intensity: parsedIntensity,
      notes: typeof notes === "string" ? notes.trim() : notes,
      owner: userId,
      imageUrl: imageUrl ? imageUrl : "",
    });

    await created.populate("emotions");
    return response.status(201).json(created);
  } catch (error) {
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
