import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.URI_DB;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function conectarDB() {
  try {
    await client.connect();
    return await client.db("AnimeKira");
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log("Error al conectar a la DB: ");
    console.log(error);
  }
}
export { conectarDB };
