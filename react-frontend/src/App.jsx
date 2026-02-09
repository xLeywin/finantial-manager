import Form from "./components/Form";
import Table from "./components/Table";
import Login from "./components/Login";
import UpdUser from "./components/UpdUser";

import { useEffect, useState, useMemo, memo, useCallback } from "react";
import { api } from "./services/api";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initial form structure
const initialForm = {
  title: "",
  type: "",
  status: "",
  category: "",
  amount: "",
};

function AppRoutes() {
  const navigate = useNavigate();

  // ============
  // Auth / User
  // ============
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  const handleLogin = useCallback((userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    setIncomes([]);
    setExpenses([]);
    navigate("/login");
  }, [navigate]);

  const isAdmin = user?.role === "ADMIN";

  // =============
  // Backend data
  // =============
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Load incomes and expenses
  const loadData = useCallback(async () => {
    if (!user) return;

    try {
      const [incomesRes, expensesRes] = await Promise.all([
        api.get(`/incomes?userId=${user.id}`),
        api.get(`/expenses?userId=${user.id}`),
      ]);

      setIncomes(incomesRes.data);
      setExpenses(expensesRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar dados");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  // =============
  // Form control
  // =============
  const [btnRegister, setBtnRegister] = useState(true);
  const [formData, setFormData] = useState(initialForm);

  const handleCancel = useCallback(() => {
    setFormData(initialForm);
    setBtnRegister(true);
  }, []);

  const handleSave = useCallback(
    async (data) => {
      if (!user) return;

      const endpoint = data.type === "income" ? "/incomes" : "/expenses";

      const payload = {
        title: data.title,
        amount: Number(data.amount),
        status: data.status,
        category: data.category,
        user: { id: user.id },
      };

      try {
        await api.post(endpoint, payload);
        setFormData(initialForm);
        await loadData();
        toast.success("Item cadastrado com sucesso!");
      } catch (error) {
        console.error("Erro ao cadastrar item:", error);
        toast.error("Erro ao cadastrar item.");
      }
    },
    [user, loadData],
  );

  const handleRemove = useCallback(async () => {
    if (!formData.id) {
      toast.warn("Selecione um item para remover.");
      return;
    }

    if (!window.confirm("Deseja realmente remover este item?")) return;

    const endpoint =
      formData.type === "income"
        ? `/incomes/${formData.id}`
        : `/expenses/${formData.id}`;

    try {
      await api.delete(endpoint);
      handleCancel();
      await loadData();
      toast.warning("Item removido.");
    } catch (error) {
      console.error("Erro ao remover item:", error);
      toast.error("Erro ao remover item.");
    }
  }, [formData, handleCancel, loadData]);

  const handleUpdate = useCallback(async () => {
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
      await loadData();
      toast.info("Atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      toast.error("Erro ao atualizar item.");
    }
  }, [formData, handleCancel, loadData]);

  const selectItem = useCallback((item) => {
    setFormData({
      id: item.id,
      title: item.title,
      type: item.type,
      status: item.status,
      category: item.category,
      amount: item.amount.toString(),
    });

    setBtnRegister(false);
  }, []);

  // ========
  // Filters
  // ========
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterUser, setFilterUser] = useState("");

  // Merge incomes and expenses
  const mergedData = useMemo(() => {
    const filterByMonthYear = (item) => {
      if (!filterMonth && !filterYear) return true;

      const d = new Date(item.date);
      const monthMatch =
        !filterMonth || d.getMonth() + 1 === Number(filterMonth);
      const yearMatch = !filterYear || d.getFullYear() === Number(filterYear);

      return monthMatch && yearMatch;
    };

    const filterByUser = (item) => {
      if (!isAdmin || !filterUser) return true;

      const userName = item.user?.name ?? "";
      return userName.toLowerCase().includes(filterUser.toLowerCase());
    };

    return [
      ...incomes.map((i) => ({ ...i, type: "income" })),
      ...expenses.map((e) => ({ ...e, type: "expense" })),
    ]
      .filter(filterByMonthYear)
      .filter(filterByUser)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [incomes, expenses, filterMonth, filterYear, filterUser, isAdmin]);

  // =======
  // Routes
  // =======
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />

      <Routes>
        <Route
          path="/login"
          element={
            !user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
          }
        />

        <Route
          path="/profile"
          element={
            user ? (
              <UpdUser
                user={user}
                onUpdate={(updatedData) => {
                  localStorage.setItem("user", JSON.stringify(updatedData));
                  setUser(updatedData);
                  navigate("/");
                }}
                onCancel={() => navigate("/")}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/"
          element={
            user ? (
              <div className="container mt-4">
                <h1 className="text-center">Financial Manager</h1>
                <h2 className="text-center text-muted">
                  Gerenciador de Finanças
                </h2>

                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-danger me-2"
                >
                  Sair
                </button>

                <button
                  onClick={() => navigate("/profile")}
                  className="btn btn-sm btn-outline-dark"
                >
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

                <br />
                <br />
                <Table
                  data={mergedData}
                  select={selectItem}
                  filterMonth={filterMonth}
                  filterYear={filterYear}
                  filterUser={filterUser}
                  onMonthChange={setFilterMonth}
                  onYearChange={setFilterYear}
                  onUserChange={setFilterUser}
                  isAdmin={isAdmin}
                />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}