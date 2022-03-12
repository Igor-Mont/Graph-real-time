const { app } = require("./http");
const { io } = require("./http");

const sales = [];

app.post("/sales", (req, res) => {
  const { date, amountPerDay } = req.body;

  const dateFormatted = new Date(date)

  const sale = { date: dateFormatted, amountPerDay, day: dateFormatted.getDate() }

  sales.push(sale);

  io.emit('new_sale', sale);
  
  res.status(201).send();
});

app.get("/sales", (req, res) => {
  res.json(sales).status(200);
});