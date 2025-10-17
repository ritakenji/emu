// pages/api/entries/[id]/bookmark.js
import { getSession } from "next-auth/react";
import Entry from "@/db/models/Entry";
import dbConnect from "@/db/connect";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();

  try {
    await dbConnect();

    const { id } = req.query;
    const { bookmarked } = req.body;
    console.log("req.body", req.body);
    if (typeof bookmarked !== "boolean") {
      return res.status(400).json({ error: "`bookmarked` must be boolean" });
    }

    // Optional: enforce business rules server-side too
    const entry = await Entry.findById(id).lean();
    if (!entry) return res.status(404).json({ error: "Not found" });

    // Example ownership guard (adapt to your model, e.g., comparing userId):
    // if (entry.userId !== session.user.id) return res.status(403).json({ error: "Forbidden" });

    // If you never want “default” entries to be bookmarkable, refuse updates:
    // if (entry.owner === "default") return res.status(403).json({ error: "Default entries cannot be bookmarked" });

    const updated = await Entry.findByIdAndUpdate(
      id,
      { $set: { bookmarked } },
      { new: true }
    ).lean();

    return res.json({ ok: true, entry: updated });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to update bookmark" });
  }
}
