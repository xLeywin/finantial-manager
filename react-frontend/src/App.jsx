import { useEffect, useState } from "react";  
import Form from "./components/Form";
import Table from "./components/Table";
import "./App.css";

function App() {
  // UseStage
  const [btnRegister, setBtnRegister] = useState(true);
  const [users, setUser] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/incomes")
      .then((res) => res.json())
      .then((data) => setIncomes(data));

    fetch("http://localhost:8080/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  const mergedData = [
    ...incomes.map((i) => ({ ...i, type: "income" })),
    ...expenses.map((e) => ({ ...e, type: "expense" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Newer to older

  return (
    <div className="App">
      <div className="container">
        <Form button={btnRegister} />

        <Table data={mergedData} />
      </div>
    </div>
  );
}

export default App;