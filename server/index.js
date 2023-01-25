const express = require("express");
const cors = require('cors');
const app = express();
const crypto = require('crypto');
const port = process.env.PORT || 3001;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.URL
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.use(cors({
    origin: "*"
}));
app.use(express.json());

app.get("/", (req, res) => {
    const collection = client.db("fullstack").collection("data");
    collection.find({}).toArray(function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})
app.post("/", (req, res) => {
    let obj = req.body
    obj.id = crypto.randomUUID();
    insertData(obj, res)
})

function insertData(obj, res) {
    client.connect(async err => {
        const collection = client.db("fullstack").collection("data");
        await collection.insertOne(obj)
        collection.find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json(result)
        });
    });
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));