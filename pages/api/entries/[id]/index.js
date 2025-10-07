import dbConnect from "@/db/connect.js";
import Entry from "@/db/models/Entry";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    if (request.method === "GET") {
      const entry = await Entry.findById(id).populate("emotions");

      if (!entry) {
        response.status(404).json({ status: "Not found" });
        return;
      }
      response.status(200).json(entry);
      return;
    }

    /*  if (request.method === "PUT") {
      const updateEntry = request.body;
      await Entry.findByIdAndUpdate(id, updateEntry);
      response.status(200).json({ message: "Entry successfully updated" });
      return;
    } */

    if (request.method === "DELETE") {
      const deleteEntry = await Entry.findByIdAndDelete(id);
      response.status(200).json({ message: "Entry successfully deleted" });
      return;
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
    return;
  }

  response.status(405).json({ status: "Method not allowed" });
}
