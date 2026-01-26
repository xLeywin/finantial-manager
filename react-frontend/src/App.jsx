import { useEffect, useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import Login from "./components/Login";
import UpdUser from "./components/UpdUser";
import { api } from "./services/api";

// Initial form structure
const initialForm = {
  title: "",
  type: "",
  status: "",
  category: "",
  amount: "",
};

function App() {
  // Set user
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  // Login Handle
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Button control (register / edit mode)
  const [btnRegister, setBtnRegister] = useState(true);

  // Backend data
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Form data state
  const [formData, setFormData] = useState(initialForm);

  // Update user
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  const handleUserUpdated = (updatedData) => {
    localStorage.setItem("user", JSON.stringify(updatedData));
    setUser(updatedData);
    setIsUpdatingUser(false); // Return to main screen
  };

  // Load incomes and expenses
  const loadData = async () => {
    if (!user) return;

    try {
      const [incomesRes, expensesRes] = await Promise.all([
        api.get(`/incomes?userId=${user.id}`),
        api.get(`/expenses?userId=${user.id}`),
      ]);

      setIncomes(incomesRes.data);
      setExpenses(expensesRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  // Save income or expense
  const handleSave = async (data) => {
    const endpoint = data.type === "income" ? "/incomes" : "/expenses";

    const payload = {
      title: data.title,
      amount: Number(data.amount),
      status: data.status,
      category: data.category,
      user: { id: user.id },
    };

    if (!user) return;

    try {
      await api.post(endpoint, payload);

      setFormData(initialForm);
      loadData();
    } catch (error) {
      console.error("Erro ao salvar item:", error);
    }
  };

  // Filters
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const filterByMonthYear = (item) => {
    if (!filterMonth && !filterYear) return true;

    const d = new Date(item.date);

    const monthMatch = !filterMonth || d.getMonth() + 1 === Number(filterMonth);

    const yearMatch = !filterYear || d.getFullYear() === Number(filterYear);

    return monthMatch && yearMatch;
  };

  // Merge incomes and expenses
  const mergedData = [
    ...incomes.map((i) => ({ ...i, type: "income" })),
    ...expenses.map((e) => ({ ...e, type: "expense" })),
  ]
    .filter(filterByMonthYear)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Select item
  const selectItem = (item) => {
    setFormData({
      id: item.id,
      title: item.title,
      type: item.type,
      status: item.status,
      category: item.category,
      amount: item.amount.toString(),
    });

    setBtnRegister(false);
  };

  // Reset form
  const handleCancel = () => {
    setFormData(initialForm);
    setBtnRegister(true);
  };

  // Remove item
  const handleRemove = async () => {
    if (!formData.id) {
      alert("Selecione um item para remover.");
      return;
    }

    const endpoint =
      formData.type === "income"
        ? `/incomes/${formData.id}`
        : `/expenses/${formData.id}`;

    try {
      await api.delete(endpoint);

      handleCancel();
      loadData();
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  };

  // Update item
  const handleUpdate = async () => {
    if (!formData.id) return;

    const endpoint =
      formData.type === "income"
        ? `/incomes/${formData.id}`
        : `/expenses/${formData.id}`;

    const payload = {
      title: formData.title,
      amount: Number(formData.amount),
      status: formData.status,
      category: formData.category,
    };

    try {
      await api.put(endpoint, payload);

      handleCancel();
      loadData();
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }
  if (isUpdatingUser) {
    return (
      <UpdUser
        user={user}
        onUpdate={handleUserUpdated}
        onCancel={() => setIsUpdatingUser(false)}
      />
    );
  }
  return (
    <div className="container mt-4">
      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        <h1>Financial Manager</h1>
        <h2 className="text-muted">Gerenciador de Finanças</h2>
      </div>
      <button onClick={handleLogout} className="btn btn-sm btn-outline-danger">
        Sair
      </button>

    
      <button onClick={() => setIsUpdatingUser(true)} className="btn btn-sm btn-outline">
        Perfil
      </button>

      <br />
      <br />

      <Form
        button={btnRegister}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSave}
        onCancel={handleCancel}
        onRemove={handleRemove}
        onUpdate={handleUpdate}
      />

      <div className="mt-5 mb-3">
        <label className="fw-bold fs-4">Buscar por mês</label>

        <Table
          data={mergedData}
          select={selectItem}
          filterMonth={filterMonth}
          filterYear={filterYear}
          onMonthChange={setFilterMonth}
          onYearChange={setFilterYear}
        />
      </div>
    </div>
  );
}

export default App;