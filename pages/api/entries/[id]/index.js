import dbConnect from "@/db/connect.js";
import Entry from "@/db/models/Entry";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    if (request.method === "GET") {
      const entry = await Entry.findById(id);

      if (!entry) {
        response.status(404).json({ status: "Not found" });
        return;
      }
      response.status(200).json(entry);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }

  response.status(405).json({ status: "Method not allowed" });
}
