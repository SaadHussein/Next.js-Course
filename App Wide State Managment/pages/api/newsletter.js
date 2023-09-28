import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid User Email!" });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "Failed To Connect Database" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Failed To Insert Data" });
      return;
    }

    res.status(201).json({ message: "Signed Up!" });
  }
}

export default handler;
