import express from 'express';
const app = express();

const SERVER_PORT = 3000;

app.get("/isprime", async (req, res) => {
  const startTime = new Date();
  const result = await isPrime(parseInt(req.query.number)); //parseInt is for converting string to number
  const endTime = new Date();
  res.json({
    number: parseInt(req.query.number),
    isprime: result,
    time: endTime.getTime() - startTime.getTime() + "ms",
  });
});

app.get("/testreq", (req, res) => {
  res.send("I'm unblocked now");
});

const isPrime = number => {
  return new Promise(resolve => {
    let isPrime = true;
    for (let i = 3; i < number; i++) {
      if (number % i === 0) {
        isPrime = false;
        break;
      }
    };

    resolve(isPrime);
  });
};

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));