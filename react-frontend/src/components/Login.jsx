import { useState } from "react";
import { api } from "../services/api";
import {
  isNameValid,
  isEmailValid,
  isPasswordValid,
} from "../utils/validators";

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      onLogin(response.data);
    } catch (error) {
      console.error("Login Error Details:", error.response?.data); // Add this
      if (error.response?.status === 401) {
        setErrorMessage("E-mail ou senha inválidos");
      } else {
        setErrorMessage("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  }

  const handleChange = (value) => {
    const nameFiltered = value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
    setName(nameFiltered);
  };

  async function handleRegister(e) {
    e.preventDefault();

    if (!isNameValid(name)) {
      setErrorMessage("Nome inválido.");
      return;
    }
    if (!isEmailValid(email)) {
      setErrorMessage("E-mail inválido.");
      return;
    }
    if (!isPasswordValid(password)) {
      setErrorMessage("Senha não atende aos requisitos.");
      return;
    }

    try {
      await api.post("/users", { name, email, password });
      alert("Conta criada com sucesso! Agora faça seu login.");
      setIsRegistering(false);
    } catch (error) {
      setErrorMessage("Erro ao criar conta. Verifique os dados.");
    }
  }

  return (
    <div className="page-login">
      <div className="login-container">
        <div className="login-header">
          <img
            src="/assets/favicon-fm.ico"
            alt="Financial Manager"
            className="login-logo"
          />
          <h1>Financial Manager</h1>
          <h2 className="text-muted">Gerenciador de Finanças</h2>
        </div>

        <br />
        <br />
        <br />
        <br />

        <form
          className="login-form"
          onSubmit={isRegistering ? handleRegister : handleSubmit}
        >
          <h2 className="h2-login">
            {isRegistering ? "Criar Conta" : "Login"}
          </h2>
          <label className={`alert ${errorMessage ? "visible" : ""}`}>
            {errorMessage}
          </label>

          <div className="form-fields">
            {isRegistering && (
              <input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => handleChange(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-dark px-5 fw-bold">
              {isRegistering ? "Cadastrar" : "Entrar"}
            </button>

            <div className="mt-3 text-center">
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setErrorMessage("");
                }}
              >
                {isRegistering
                  ? "Já possui uma conta? Entrar"
                  : "Não possui conta? Cadastre-se"}
              </button>
            </div>
            {isRegistering && (
              <div className="mt-4">
                <h5>Requisitos da conta</h5>
                <ul>
                  <li>Nome válido (apenas letras e espaços)</li>
                  <li>E-mail válido</li>
                  <li>Senha com no mínimo 14 caracteres</li>
                  <li>Ao menos 1 letra maiúscula e 1 minúscula</li>
                  <li>Ao menos 1 caractere especial (@, $, %, etc)</li>
                  <li>Ao menos 4 números</li>
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
