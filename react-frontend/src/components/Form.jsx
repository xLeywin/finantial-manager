import { useEffect } from "react";

// Status configuration mapped by transaction type
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

// Static list of financial categories
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
  
  // Unified handler for all input changes
  const handleChange = (e) => {
    let { name, value } = e.target;

    // Numerical handling: convert comma to dot for backend compatibility
    if (name === "amount") {
      value = value.replace(",", ".");
    }

    // Logical reset: if transaction type changes, clear the selected status
    if (name === "type") {
      setFormData({ 
        ...formData, 
        [name]: value, 
        status: "" 
      });
    } else {
      setFormData({ 
        ...formData, 
        [name]: value 
      });
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Clear form
  const handleCancel = () => {
    setFormData(initialForm);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-sm">
      {/* Title Field */}
      <div className="mb-3">
        <label className="form-label fw-bold">Descrição</label>
        <input
          name="title"
          placeholder="Ex: Aluguel, Salário..."
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        {/* Transaction Type Selection */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Tipo</label>
          <select
            name="type"
            className="form-select"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o tipo...</option>
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>
        </div>

        {/* Dynamic Status Selection (Depends on Type) */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Status</label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
            disabled={!formData.type}
            required
          >
            <option value="">Selecione o status...</option>
            {formData.type &&
              STATUS_BY_TYPE[formData.type].map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="row">
        {/* Category Selection */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Categoria</label>
          <select
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a categoria...</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Valor</label>
          <input
            type="text"
            name="amount"
            placeholder="0,00"
            className="form-control"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Centered Button Section */}
      <div className="d-flex justify-content-center gap-2 mt-4">
        {button ? (
          <button type="submit" className="btn btn-primary px-5 fw-bold">
            Cadastrar
          </button>
        ) : (
          <>
            <button type="button" className="btn btn-warning">Alterar</button>
            <button type="button" className="btn btn-danger">Remover</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
          </>
        )}
      </div>
    </form>
  );
}

export default Form;