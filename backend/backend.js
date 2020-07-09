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

				console.log(result);
				res.send(result);
			});
		});

		app.get("/history/:email", (req, res) => {
			let email = req.params.email.substr(1);
			console.log(email);
			historyCollection
				.find({ emailAddress: email })
				.toArray((err, result) => {
					if (err) throw err;

					console.log(result);
					res.send(result);
				});
		});

		app.post("/adduser", function(req, res) {
			const user = req.body;

			const newItem = {
				firstName: `${user.firstName}`,
				lastName: `${user.lastName}`,
				zipCode: `${user.zipCode}`,
				emailAddress: `${user.emailAddress}`,
			};

			if (
				user.firstName &&
				user.lastName &&
				user.zipCode &&
				user.emailAddress
			) {
				userCollection
					.insertOne(newItem)
					.then((result) =>
						console.log(
							`Successfully inserted item with _id: ${result.insertedId}`
						)
					)
					.then(res.send(200))
					.catch((err) => res.send(400));
			} else res.send(400);
		});

		app.post("/addhist", function(req, res) {
			const message = req.body;

			const newItem = {
				message: `${message.message}`,
				emailAddress: `${message.emailAddress}`,
				date: new Date().toString(),
			};

			if (message.message && message.emailAddress) {
				historyCollection
					.insertOne(newItem)
					.then((result) =>
						console.log(
							`Successfully inserted item with _id: ${result.insertedId}`
						)
					)
					.then(res.send(200))
					.catch((err) => res.send(400));
			} else res.send(400);
		});

		app.delete("/delete", function(req, res) {
      const del = req.body;
      const email = del.emailAddress

      console.log(email)

      const query = { "emailAddress": email };
      
      console.log(query)

			historyCollection
				.deleteMany(query)
				.then((result) =>
					console.log(`Deleted ${result.deletedCount} item(s).`)
        )
        .then(res.sendStatus(200))
				.catch((err) =>
          res.sendStatus(400)
        );
        
		});
	})
	.catch(console.error);

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);
