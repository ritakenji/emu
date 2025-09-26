import dbConnect from "@/db/connect";
import Entry from "@/db/models/Entry";

export default async function handler(request, response) {
  await dbConnect();

  try {
    const { id } = request.query;

    if (request.method === "GET") {
      const entry = await Entry.findById(id).populate("reviews");

      if (!entry) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(product);
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
