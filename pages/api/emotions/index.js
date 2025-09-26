import dbConnect from "@/db/connect";
import Emotion from "@/db/models/Emotion";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const emotions = await Emotion.find();

      if (!emotions) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(emotions);
      return;
    }

    /* if (request.method === "PUT") {
      const updateEntry = request.body;
      await Entry.findByIdAndUpdate(id, updateEntry);
      response.status(200).json({ message: "Entry successfully updated" });
      return;
    }
    if (request.method === "DELETE") {
      const deleteEntry = await Entry.findByIdAndDelete(id);
      response.status(200).json({ message: "Entry successfully deleted" });
      return;
    }*/
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }

  response.status(405).json({ status: "Method not allowed." });
}
