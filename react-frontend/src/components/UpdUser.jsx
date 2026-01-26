import { useState } from "react";
import { api } from "../services/api";

function UpdUser({ user, onUpdate, onCancel }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the password is empty
    if (!password.trim()) {
      alert(
        "Por favor, digite uma senha.",
      );
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

  return (
    <div className="container mt-5">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
          placeholder="Nome"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
          placeholder="Email"
        />

        <label>Nova Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-2"
          placeholder="Senha"
        />

        <button type="submit" className="btn btn-primary">
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
    </div>
  );
}

export default UpdUser;
