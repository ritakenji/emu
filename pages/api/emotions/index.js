import dbConnect from "@/db/connect";
import Emotion from "@/db/models/Emotion";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Allowed" });

  try {
    await dbConnect();
    const emotions = await Emotion.find().sort({ emotion: 1 }).lean();
    return res.status(200).json(emotions);
  } catch (err) {
    console.error("GET /api/emotions failed:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
