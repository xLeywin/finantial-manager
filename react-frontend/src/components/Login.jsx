import { useState } from "react";
import { api } from "../services/api";

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
      if (error.response?.status === 401) {
        setErrorMessage("E-mail ou senha inválidos");
      }
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
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

        <form className="login-form" onSubmit={isRegistering ? handleRegister : handleSubmit}>
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
                onChange={(e) => setName(e.target.value)}
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;