var express = require("express");
//var cookieParser = require("cookie-parser");
//var logger = require("morgan");
var cors = require("cors");
var fetch = require("node-fetch");

const port = 3001;

var app = express();

app.use(cors());
//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017/chatbot", {
  useUnifiedTopology: true,
})
  .then((client) => {
    const db = client.db("chatbot");
    const userCollection = db.collection("users");
    const historyCollection = db.collection("history");

    app.get("/", (req, res) => {
      userCollection.find().toArray((err, result) => {
        if (err) throw err;

        console.log(result)
        res.send(result);
      });
    });

    app.get("/history", (req, res) => {
        historyCollection.find().toArray((err, result) => {
          if (err) throw err;
  
          console.log(result)
          res.send(result);
        });
      });

  })
  .catch(console.error);

  app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);

