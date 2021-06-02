const express = require("express");
const app = express();

const quotes = require("./quotes.json");

//GET all of the quotes
app.get("/quotes", function (request, response) {
  response.json(quotes);
});

//GET quotes by ID
app.get("/quotes/:id", function (request, response) {
  //'/quotes/17 should return one quote, by id'
  const id = parseInt(request.params.id);
  response.send(quotes[id]);
});

//POST - Change a quote API server to allow POSTs of new quotes. The new quotes should be added to your quotes list, which is just an array in memory. You can assume the POSTed quotes are all in the correct JSON format.

app.post("/quotes", (req, res) => {
  //Get new quote object. Identify the final object quote's ID and then add a 1 to that number to set the new ID.
  const newQuote = {
    quote: req.query.quote,
    author: req.query.author,
    id: quotes[quotes.length - 1].id + 1,
  };
  console.log(quotes[1]);
  console.log(quotes[quotes.length - 1]);
  console.log(newQuote);
  //Add the new quote object to the end of the quotes array
  quotes.push(newQuote);
  //Return status 201 for Created and the final 3 quotes
  res.status(201).send(quotes.slice(quotes.length - 3));
});

app.listen(3000, () => console.log("Listening on port 3000"));
