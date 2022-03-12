import { Container } from "./styles";
// import { ResponsiveContainer, LineChart, XAxis, CartesianGrid } from 'recharts';
import io from 'socket.io-client';
import { useState } from "react";

const socket = io('http://localhost:3333');

function LineChartBox() {
  const [sales, setSales] = useState([]);
  
  socket.on("new_sale", sale => {

    setSales([...sales, sale])
  });

  console.log(sales)


  return (
    <Container>
      <h1>Line Chart</h1>
    </Container>
  );
}

export { LineChartBox };