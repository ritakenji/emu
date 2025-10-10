import dbConnect from "@/db/connect";
import Emotion from "@/db/models/Emotion";

export default async function handler(request, response) {
  //Guard unsupported methods up front → clearer flow.
  if (request.method !== "GET") {
    return response.status(405).json({ status: "Method Not Allowed" });
  }
  try {
    //Keep dbConnect inside try so connection failures return JSON 500.
    await dbConnect();
    //Use lean() for faster, lighter read returning plain js objects instead of full Mongoose documents; add sort for stable order.
    const emotions = await Emotion.find({}, null, { lean: true }).sort({
      emotion: 1,
    });

    //For list endpoints, return 200 with [] instead of 404 when empty.
    return response.status(200).json(emotions || []);
  } catch (error) {
    console.error("GET /api/emotions failed:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
