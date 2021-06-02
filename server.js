const express = require("express");
const app = express();

const quotes = require("./quotes.json");

app.get("/quotes/:id", function (request, response) {
  //'/quotes/17 should return one quote, by id'
  const index = parseInt(request.params.id) - 1;
  response.send(quotes[index]);
});

app.get("/quotes", function (request, response) {
  response.json(quotes);
});

app.listen(3000, () => console.log("Listening on port 3000"));
