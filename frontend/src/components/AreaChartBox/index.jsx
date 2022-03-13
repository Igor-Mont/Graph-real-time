import { Container } from "./styles";
import { ResponsiveContainer, AreaChart, Area, XAxis, CartesianGrid, YAxis, Tooltip } from 'recharts';
import io from 'socket.io-client';
import { useEffect, useState } from "react";

const socket = io('http://localhost:3333');

const sales2 = [
  {
    date: new Date(),
    amountPerDay: 1000,
    day: 1
  },
  {
    date: new Date(),
    amountPerDay: 10000,
    day: 12
  },
  {
    date: new Date(),
    amountPerDay: 5000,
    day: 23
  },
  {
    date: new Date(),
    amountPerDay: 6000,
    day: 25
  },
  {
    date: new Date(),
    amountPerDay: 12000,
    day: 29
  },
];

let newSales = [];

socket.on("new_sale", newSale => {
  if (newSales.includes(newSale)) return;

  newSales.push(newSale);
});

function AreaChartBox() {
  const [sales, setSales] = useState([]);
  
  console.log(sales);
  
  useEffect(() => {
    (async function getData() {
      const response = await fetch('http://localhost:3333/sales');
      const data = await response.json();

      setSales(data);
    })();
  }, []);

  useEffect(() => {
    setTimeout(
      setInterval(() => {
        console.log(newSales.length)
        if (newSales.length > 0) {
          let sale = newSales[0];

          if(!sales.some(elem => elem.day === sale.day)) {
            newSales = []
            setSales(prevState => [...prevState, sale]);
          }
  
          newSales = []
        }
      }, 1000)
    , 1000);
  }, []);
  
  return (
    <Container>
      <ResponsiveContainer>
        <AreaChart data={sales.sort((fst, snd) => fst.day - snd.day)}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16c784" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#16c784" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ececec" />
          <XAxis dataKey="day" stroke="#a1a7bb" />
          <YAxis dataKey="amountPerDay" stroke="#a1a7bb" />
          <Tooltip
            animationDuration={500}
            animationEasing='ease-out'
            cursor={false}
            formatter={amount => new Intl.NumberFormat('pt-BR',{
              style: 'currency',
              currency: 'BRL'
            }).format(amount)}
          />
          <Area 
            type="monotone"
            name="Amount"
            dataKey="amountPerDay"
            fillOpacity={1}
            stroke="#16c784"
            strokeWidth={2}
            fill="url(#color)"
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
}

export { AreaChartBox };