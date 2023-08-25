import express from 'express';
const app = express();

const SERVER_PORT = 3000;

app.get("/getfibonacci", (req, res) => {
  const startTime = new Date();
  const result = fibonacci(parseInt(req.query.number)); //parseInt is for converting string to number
  const endTime = new Date();
  res.json({
    number: parseInt(req.query.number),
    fibonacci: result,
    time: endTime.getTime() - startTime.getTime() + "ms",
  });
});

app.get('/testreq', (req, res) => {
  res.send('I\'m unblocked now');
});


const fibonacci = n => {
  if (n <= 1) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));