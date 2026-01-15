import { useEffect, useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import "./App.css";

// Initial form structure
const initialForm = {
  title: "",
  type: "",
  status: "",
  category: "",
  amount: "",
};

function App() {
  // Button control (register / edit mode)
  const [btnRegister, setBtnRegister] = useState(true);

  // Backend data
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Form data state
  const [formData, setFormData] = useState(initialForm);

  // Load incomes and expenses from backend
  const loadData = () => {
    fetch("http://localhost:8080/incomes")
      .then((res) => res.json())
      .then(setIncomes);

    fetch("http://localhost:8080/expenses")
      .then((res) => res.json())
      .then(setExpenses);
  };

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  // Save income or expense
  const handleSave = async (data) => {
    // Endpoint selection based on type
    const url =
      data.type === "income"
        ? "http://localhost:8080/incomes"
        : "http://localhost:8080/expenses";

    // Payload sent to backend
    const payload = {
      title: data.title,
      amount: Number(data.amount),
      status: data.status,
      category: data.category,
    };

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Reset form and reload table
    setFormData(initialForm);
    loadData();
  };

  // Merge incomes and expenses into one table
  const mergedData = [
    ...incomes.map((i) => ({ ...i, type: "income" })),
    ...expenses.map((e) => ({ ...e, type: "expense" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Newer first

  return (
    <div className="App">
      <div className="container">
        {/* Form */}
        <Form
          button={btnRegister}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSave}
        />

        {/* Table */}
        <Table data={mergedData} />
      </div>
    </div>
  );
}

export default App;
