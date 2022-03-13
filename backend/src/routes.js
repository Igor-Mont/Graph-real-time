const { app } = require("./http");
const { io } = require("./http");

let sales = [];

app.post("/sales", (req, res) => {
  const { date, amountPerDay } = req.body;

  const fullDate = new Date(date);
  const month = String(fullDate.getMonth() + 1).padStart(2, '0');
  const year = fullDate.getFullYear();
  const day = String(fullDate.getDate()).padStart(2, '0');

  const dateFormatted = `${day}/${month}/${year}`;

  const sale = { date: dateFormatted, amountPerDay, day }

  sales.push(sale);

  io.emit('new_sale', sale);
  
  res.status(201).send();
});

app.delete("/sales", (req, res) => {
  sales = [];

  res.status(200).send();
});

app.get("/sales", (req, res) => {
  const uniques = sales.filter(function (sale) {
    return !this[JSON.stringify(sale)] && (this[JSON.stringify(sale)] = true);
  }, Object.create(null));
  
  res.json(uniques).status(200);
});