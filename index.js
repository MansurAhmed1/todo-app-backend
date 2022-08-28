/** @format */

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.v85be.mongodb.net:27017,cluster0-shard-00-01.v85be.mongodb.net:27017,cluster0-shard-00-02.v85be.mongodb.net:27017/?ssl=true&replicaSet=atlas-e24feo-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

async function run() {
  try {
    await client.connect();
    const EventCollection = client.db("Event").collection("EventCollection");


    ///////////// get event///////////// 
    app.get("/event", async (req, res) => {
      const query = {};
      const cursor = EventCollection.find(query);
      const todos = await cursor.toArray();
      res.send(todos);
    });

    ///////////// get event///////////// 


    ///////////////  post event///////// 
    app.post("/addevent", async (req, res) => {
      const event = req.body;
      const result = await EventCollection.insertOne(event);
      res.send(result);
    });
    ///////////// get event///////////// 

  } finally {
  }
}

run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("running internshala task");
});
app.listen(port, () => {
  console.log("listening to port variable");
});

//  ///////////////////////////////get todo///////////////////////////////
//  app.get("/todos", async (req, res) => {
//   const query = {};
//   const cursor = todoCollection.find(query);
//   const todos = await cursor.toArray();
//   res.send(todos);
// });
// ///////////////////////////////get todo///////////////////////////////

// ///////////////////////////////post todo///////////////////////////////
// app.post("/todo", async (req, res) => {
//   const added = req.body;
//   const result = await todoCollection.insertOne(added);
//   res.send(result);
// });

// ///////////////////////////////post todo///////////////////////////////

// ///////////////////////////////delete todo//////////////////////////
// app.delete("/deletetodo/:id", async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: ObjectId(id) };
//   const result = await todoCollection.deleteOne(query);
//   res.send(result);
// });
// ///////////////////////////////delete todo//////////////////////////

// ///////////////////////////////update todo//////////////////////////

// app.put("/updatetodo/:id", async (req, res) => {
//   const id = req.params.id;
//   const updateUser = req.body;

//   const filter = { _id: ObjectId(id) };
//   const options = { upsert: true };
//   const updatedDoc = {
//     $set: {
//       toDo: updateUser.todo
//     }
//   };
//   const result = await todoCollection.updateOne(
//     filter,
//     updatedDoc,
//     options
//   );
//   res.send(result);
// });
// ///////////////////////////////update todo//////////////////////////

// ///////////////////////////////taskdone//////////////////////////

// app.put("/taskdone/:id", async (req, res) => {
//   const id = req.params.id;
//   const updateUser = req.body;

//   const filter = { _id: ObjectId(id) };
//   const options = { upsert: true };
//   const updatedDoc = {
//     $set: {
//       taskDone: updateUser.taskDone
//     }
//   };
//   const result = await todoCollection.updateOne(
//     filter,
//     updatedDoc,
//     options
//   );
//   res.send(result);
// });

// ///////////////////////////////taskdone//////////////////////////
