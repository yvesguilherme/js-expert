import express from 'express';
const app = express();

const SERVER_PORT = 5000;

app.get("/slowrequest", (req, res) => {
  setTimeout(() => res.json({ message: "sry i was late" }), 10000); //setTimeout is used to mock a network delay of 10 seconds
});

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));