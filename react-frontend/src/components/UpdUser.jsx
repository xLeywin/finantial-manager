import { useState } from "react";
import { api } from "../services/api";
import {
  isNameValid,
  isEmailValid,
  isPasswordValid,
} from "../utils/validators";

function UpdUser({ user, onUpdate, onCancel }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isNameValid(name)) {
      alert("Nome inválido.");
      return;
    }
    if (!isEmailValid(email)) {
      alert("E-mail inválido.");
      return;
    }
    if (!isPasswordValid(password)) {
      alert("Senha não atende aos requisitos.");
      return;
    }

    try {
      const response = await api.put(`/users/${user.id}`, {
        name,
        email,
        password,
      });
      onUpdate(response.data);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Houve um erro ao atualizar os dados.");
    }
  };

  const handleChange = (value) => {
    const nameFiltered = value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
    setName(nameFiltered);
  };

  return (
    <div className="container mt-5">
      <br />
      <h2>Editar Perfil</h2>
      <br />

      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          value={name}
          onChange={(e) => handleChange(e.target.value)}
          className="form-control mb-2"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Nome completo"
        />

        <label>E-mail:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
          type="email"
          name="email"
          autoComplete="username"
          placeholder="E-mail"
        />

        <label>Senha:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-2"
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Senha"
        />

        <button type="submit" className="btn btn-dark">
          Salvar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary ms-2"
        >
          Cancelar
        </button>
      </form>

      <br />
      <br />
      <br />
      <div>
        <h5>O que a senha deve conter?</h5>
        <ul>
          <li>Pelo menos 14 caracteres</li>
          <li>Pelo menos uma letra maiúscula e uma minúscula</li>
          <li>Pelo menos um caractere especial (@, $, %, etc)</li>
          <li>Pelo menos 4 números</li>
        </ul>
      </div>
    </div>
  );
}

export default UpdUser;
