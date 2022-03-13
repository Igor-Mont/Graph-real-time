import { AreaChartBox } from "./components/AreaChartBox";
import { GlobalStyle } from "./styles/global";

function App() {

  setInterval(() => {
    console.log('post');

    let date = `2022-03-${Math.floor(Math.random() * 31)} 00:00:00`
    let amountPerDay =  Math.floor(Math.random() * 20000)

    fetch("http://localhost:3333/sales", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ date, amountPerDay })
    }).then(response => console.log(response.status))

  }, 4000);

  return (
    <>
      <GlobalStyle />
      <AreaChartBox />
    </>
  )
}

export { App };

