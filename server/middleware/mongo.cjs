const { MongoClient, ServerApiVersion } = require("mongodb");

const MONGO_PASSWORD= process.env.MONGO_PASSWORD;
const MONGO_USER=process.env.MONGO_USER;
const cluster = `testdevcluster0.r1bwgw6`;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${cluster}.mongodb.net/?retryWrites=true&w=majority&appName=TestDevCluster0`;

const mongoClient = new MongoClient("mongodb+srv://lisa:9mCcOCqmG1sSdtP4@myatlasclusteredu.nj66p.mongodb.net/sample_analytics?retryWrites=true&w=majority&appName=myAtlasClusterEDU");
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const mongoClient = new MongoClient(uri,  {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     }
// );

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await mongoClient.connect();

    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoClient.close();
  }
}
run().catch(console.dir);

