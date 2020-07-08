const fs = require("fs");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const port = 3001;

const Pool = require("pg").Pool;

const connection = new Pool({
	user: "postgres",
	host: "localhost",
	database: "email",
	password: "Orfitelli5",
	port: 5432,
});

app.use(bodyParser.json());

//const emails = JSON.parse(fs.readFileSync("emails.JSON"))

app.get("/emails", (req, res) => {
	connection.query("SELECT * FROM emails", (error, results) => {
		if (error) {
			res.send(error.message);
		} else {
			res.send(results.rows);
		}
	});
});

app.get("/emails/:id", (req, res) => {
	let id = req.params.id;

	connection.query(
		"SELECT * FROM emails WHERE id = $1",
		[id],
		(error, results) => {
			if (error) {
				res.send(error.message);
			} else {
				if (results.rowCount != 0) {
					res.send(results.rows);
				} else res.send(404);
			}
		}
	);
});

app.get("/search", (req, res) => {
    const query = req.query.query ? `%${req.query.query}%` : '%';
    console.log(query)
	connection.query(
		"SELECT * FROM emails WHERE subject ILIKE $1",
		[query],
		(error, results) => {
			if (error) {
				res.send(error.message);
			} else {
				if (results.rowCount != 0) {
					res.send(results.rows);
				} else res.send(404);
			}
		}
	);
});

app.post("/send", function (req, res) {
	let result;
	const emailSender = req.body;
	if (
		emailSender.sender &&
		emailSender.recipient &&
		emailSender.subject &&
		emailSender.message
	) {
		connection.query(
			"INSERT INTO emails(sender,recipient,subject,message) VALUES ($1, $2, $3, $4)",
			[
				emailSender.sender,
				emailSender.recipient,
				emailSender.subject,
				emailSender.message,
			],
			(error, results) => {
				if (error) {
					res.send(error.message);
				} else {
					result = {
						status: "success",
						message: "The message was successfully sent",
                    };
                    
				}
			}
		);
	} else {
		result = {
			status: "failed",
			message: "The message was not sent",
		};
		res.status(400);
    }

    res.send(result)
    
});

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);
