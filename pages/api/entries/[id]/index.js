import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";

import { authOptions } from "../../auth/[...nextauth]";
import dbConnect from "@/db/connect.js";
import Entry from "@/db/models/Entry";
import Emotion from "@/db/models/Emotion"; 
import mongoose from "mongoose"; 
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(request, response) {

  const allowed = ["GET", "PUT", "DELETE"];
  if (!allowed.includes(request.method)) {
    return response.status(405).json({ status: "Method Not Allowed" });
  }


  const { id } = request.query;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "Invalid entry id." });
  }

  if (request.method === "GET") {
    try {
      await dbConnect();

      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      const userId = token?.sub;

      const filter = userId
        ? { _id: id, owner: { $in: [userId, "default"] } }
        : { _id: id, owner: "default" };

      const entry = await Entry.findOne(filter).populate("emotions").lean();

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
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const userId = token?.sub;
  if (!userId) {
    return response.status(401).json({ status: "Not authorized" });
  }

  await dbConnect();
  const existing = await Entry.findById(id).lean();
  if (!existing) return response.status(404).json({ message: "Not found" });

  if (existing.owner !== userId) {
    return response.status(403).json({ status: "Forbidden" });
  }

  if (request.method === "PUT") {
    if (!request.headers["content-type"]?.includes("application/json")) {
      return response
        .status(415)
        .json({ message: "Unsupported Media Type: expected application/json" });
    }

    try {
      await dbConnect();

      const { emotions, intensity, dateTime, notes, imageUrl } =
        request.body ?? {};
      const updates = {};
      const errors = {};

      if (emotions !== undefined) {
        if (!Array.isArray(emotions) || emotions.length === 0) {
          errors.emotions = "Select at least one emotion.";
        } else {
          const ids = emotions
            .map((e) => (e && e._id ? String(e._id) : String(e)))
            .filter(Boolean);

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

      const updated = await Entry.findByIdAndUpdate(
        id,
        { ...updates, imageUrl },
        {
          new: true,
          runValidators: true,
        }
      )
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

      const entry = await Entry.findById(id).lean();
      if (!entry) {
        return response.status(404).json({ status: "Not found" });
      }

      if (entry.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(entry.imagePublicId);
        } catch (e) {
          console.error("Cloudinary destroy failed:", e);
        }
      }

      await Entry.findByIdAndDelete(id);

      return response.status(204).end();
    } catch (error) {
      console.error("DELETE /api/entries/[id] failed:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }
}
