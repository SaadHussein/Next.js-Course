import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://Mee:Saad2001..@clustertolearn.nzjww4r.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
}
