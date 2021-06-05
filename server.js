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

//PUT - Change the quote API server to allow updating a quote according to the given ID.The route should use the HTTP method PUT and ID should be given in the URL structure

app.put("/quotes/:id", (req, res) => {
  //Get the modified quote object
  const index = parseInt(req.params.id);
  const modifiedQuoteObj = {
    quote: req.query.quote,
    author: req.query.author,
    id: index,
  };
  //Find the quote that has the matching ID called in the URL. Identify the index
  const findQuoteIndexByID = quotes.findIndex((q) => q.id == index);

  //Replace the old quote using its ID/index with the new one
  quotes.splice(findQuoteIndexByID, 1, modifiedQuoteObj);

  //Return modified quote
  console.log(quotes);
  res.send(quotes[findQuoteIndexByID]);
});

// DELETE - Change a quote API server to allow updating a quote according to the given ID.
app.delete("/quotes/:id", (req, res) => {
  //Find the quote that has the matching ID called in the URL. Identify the index
  const id = parseInt(req.params.id);
  const findQuoteIndexByID = quotes.findIndex((q) => q.id == id);
  console.log(findQuoteIndexByID);
  //Delete the quote from the array by index
  quotes.splice(findQuoteIndexByID, 1);
  //Return the array without the quote (console) and a success message
  console.log(quotes);
  res.status(200).send(`Your quote ${id} has been successfully deleted`);
});

app.listen(3000, () => console.log("Listening on port 3000"));
