import { useEffect } from "react";

const STATUS_BY_TYPE = {
  income: [
    { value: "RECEIVED", label: "Recebido" },
    { value: "PENDING", label: "Pendente" },
    { value: "SCHEDULED", label: "Agendado" },
    { value: "DELAYED", label: "Atrasado" },
  ],
  expense: [
    { value: "PAID", label: "Pago" },
    { value: "PENDING", label: "Pendente" },
    { value: "SCHEDULED", label: "Agendado" },
    { value: "DELAYED", label: "Atrasado" },
  ],
};

const CATEGORIES = [
  { value: "SALARY", label: "Salário" },
  { value: "BONUS", label: "Bônus" },
  { value: "FOOD", label: "Alimentação" },
  { value: "TRANSPORT", label: "Transporte" },
  { value: "FUEL", label: "Combustível" },
  { value: "HOUSING", label: "Moradia" },
  { value: "UTILITIES", label: "Contas mensais" },
  { value: "ENTERTAINMENT", label: "Lazer" },
  { value: "OTHER", label: "Outros" },
];

function Form({ button, formData, setFormData, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setFormData({ ...formData, type: value, status: "" });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <input
        name="title"
        placeholder="Título"
        className="form-control"
        value={formData.title}
        onChange={handleChange}
      />
      {/* Type */}
      <select
        name="type"
        className="form-control"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="">Selecione o tipo</option>
        <option value="income">Receita</option>
        <option value="expense">Despesa</option>
      </select>

      {/* Status */}
      <select
        name="status"
        className="form-control"
        value={formData.status}
        onChange={handleChange}
        disabled={!formData.type}
      >
        <option value="">Selecione o status</option>
        {formData.type &&
          STATUS_BY_TYPE[formData.type].map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
      </select>
      
      {/* Category */}
      <select
        name="category"
        className="form-control"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Selecione a categoria</option>
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
      
      {/* Value */}
      <input
        type="text"
        name="amount"
        placeholder="Valor"
        className="form-control"
        value={formData.amount}
        onChange={(e) => {
          // Allow , and . inputs
          const value = e.target.value.replace(",", ".");
          setFormData({ ...formData, amount: value });
        }}
      />
      
      {/* Register */}
      {button ? (
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      ) : (
        <div>
          <button type="button" className="btn btn-warning">Alterar</button>
          <button type="button" className="btn btn-danger">Remover</button>
          <button type="button" className="btn btn-secondary">Cancelar</button>
        </div>
      )}
    </form>
  );
}

export default Form;
