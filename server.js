const express = require("express");
const app = express();

const quotes = require("./quotes.json");

app.get("/quotes/:id", function (request, response) {
  //'/quotes/17 should return one quote, by id'
  const id = parseInt(request.params.id);
  response.send(quotes[id]);
});

app.get("/quotes", function (request, response) {
  response.json(quotes);
});

app.listen(3000, () => console.log("Listening on port 3000"));
