import express from 'express';
const app = express();

import fetch from 'node-fetch'; //node-fetch is a library used to make http request in nodejs.
const SERVER_PORT = 4000;

app.get("/calltoslowserver", async (req, res) => {
  const result = await fetch("http://localhost:5000/slowrequest"); //fetch returns a promise
  const resJson = await result.json();
  res.json(resJson);
});

app.get("/testrequest", (req, res) => {
  res.send("I'm unblocked now");
});

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));