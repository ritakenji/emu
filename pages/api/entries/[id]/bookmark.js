import Entry from "@/db/models/Entry";
import dbConnect from "@/db/connect";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();

  try {
    await dbConnect();

    const { id } = req.query;
    const { bookmarked } = req.body;
    if (typeof bookmarked !== "boolean") {
      return res.status(400).json({ error: "`bookmarked` must be boolean" });
    }

    const entry = await Entry.findById(id).lean();
    if (!entry) return res.status(404).json({ error: "Not found" });

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
