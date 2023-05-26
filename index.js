const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

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

    const myToyCollection = client.db("crazeToyDB").collection("myToys");

    // Server route API
    // All Electronics toys

    app.get("/allToys", async (req, res) => {
      const toys = await myToyCollection.find({}).toArray();
      res.send(toys);
    });

    /** 
    app.get("/allToyByCategory/:category", async (req, res) => {
      console.log(req.params);
      const toys = await myToyCollection
      .find({
        subCategories: req.params.category,
      })
      .toArray();
      res.send(toys);
    });
    */
    // My Toys Show
    app.get("/myToys/:email", async (req, res) => {
      console.log(req.params.id);
      const toys = await myToyCollection
        .find({
          email: req.params.email,
        })
        .toArray();
      res.send(toys);
    });

    app.get("/allToys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await myToyCollection.findOne(query);
      res.send(result);
    });

    app.post("/electronicsToy", async (req, res) => {
      const body = req.body;
      const result = await myToyCollection.insertOne(body);
      res.send(result);
    });
    // Update
    app.put("/allToys/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedToy = req.body;

      const toy = {
        $set: {
          price: updatedToy.price,
          ratting: updatedToy.ratting,
          quantity: updatedToy.quantity,
          subCategories: updatedToy.subCategories,
          description: updatedToy.description,
        },
      };

      const result = await myToyCollection.updateOne(filter, toy, options);
      res.send(result);
    });
    // My toys Delete
    app.delete("/allToys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await myToyCollection.deleteOne(query);
      res.send(result);
    });

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
  console.log(`ToyCraze Server is running on port ${port}`);
});
