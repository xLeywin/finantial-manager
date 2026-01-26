function Table({
  data,
  select,
  filterMonth,
  filterYear,
  onMonthChange,
  onYearChange,
}) {
  // Currency formatter
  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  // Map technical status to readable labels
  const statusMap = {
    RECEIVED: "Recebido",
    SCHEDULED: "Agendado",
    PAID: "Pago",
    PENDING: "Pendente",
    DELAYED: "Atrasado",
  };

  // Map technical category values to readable labels
  const categoryMap = {
    SALARY: "Salário",
    BONUS: "Bônus",
    FOOD: "Alimentação",
    TRANSPORT: "Transporte",
    FUEL: "Combustível",
    HOUSING: "Moradia",
    UTILITIES: "Contas mensais",
    ENTERTAINMENT: "Lazer",
    OTHER: "Outros",
  };

  // Format date
  const formatDate = (value) => {
    if (!value) return "-";

    return new Date(value).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="row g-2 mb-3">
      <div className="col-auto">
        <label className="form-label fw-bold">Mês</label>
        <select
          className="form-select"
          value={filterMonth}
          onChange={(e) => onMonthChange(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="1">Janeiro</option>
          <option value="2">Fevereiro</option>
          <option value="3">Março</option>
          <option value="4">Abril</option>
          <option value="5">Maio</option>
          <option value="6">Junho</option>
          <option value="7">Julho</option>
          <option value="8">Agosto</option>
          <option value="9">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>
      </div>

      <div className="col-auto">
        <label className="form-label fw-bold">Ano</label>
        <select
          className="form-select"
          value={filterYear}
          onChange={(e) => onYearChange(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Título</th>
            <th>Status</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            // Has no items
            <tr>
              <td colSpan="6" className="text-center">
                Não há itens salvos.
              </td>
            </tr>
          ) : (
            // Has items
            data.map((obj) => (
              <tr key={`${obj.type}-${obj.id}`}>
                <td>{obj.title}</td>
                <td>{statusMap[obj.status] ?? obj.status}</td>
                <td>{categoryMap[obj.category] ?? obj.category}</td>
                <td
                  style={{
                    color: obj.type === "income" ? "#28a745" : "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  {obj.type === "income" ? "+ " : "- "}
                  {formatCurrency(obj.amount)}
                </td>
                <td>{formatDate(obj.date)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => select(obj)}
                  >
                    Selecionar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;