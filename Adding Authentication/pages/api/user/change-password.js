import { getSession } from "next-auth/react";
import { connectToDatabase, verifyPassword } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not Authenticated..!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const userCollection = client.db().collection("users");

  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User Not Found.!" });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const PasswordsAreEquals = await verifyPassword(oldPassword, currentPassword);

  if (!PasswordsAreEquals) {
    res.status(403).json({ messgae: "Invalid Password" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password Updated..!" });
}

export default handler;
