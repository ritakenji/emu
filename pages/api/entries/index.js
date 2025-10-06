import dbConnect from "@/db/connect";
import Entry from "@/db/models/Entry";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const entries = await Entry.find()
        .populate("emotions")
        .sort({ dateTime: -1 });

      if (!entries) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(entries);
      return;
    }
    if (request.method === "POST") {
      const entryData = request.body; //Where can the FE send info on the new place to the BE? Int he body of the request
      await Entry.create(entryData); //create aka add for POST method in BE
      response.status(200).json({ status: "Entry created." });
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
