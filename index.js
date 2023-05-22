const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4000;
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());

// MongoDB code //
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ehhcnw6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const myToyCollection = client.db('crazeToyDB').collection('myToy');
    // Server route API


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("ToyCraze is running");
});

app.listen(port, () => {
  console.log(`ToyCraze Server is running on port ABC ${port}`);
});
