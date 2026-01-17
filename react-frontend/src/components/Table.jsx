function Table({ data, select }) {
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

  if (!data || data.length === 0) {
    return <p className="text-center mt-4">Nenhum registro encontrado.</p>;
  }

  return (
    <table className="table table-hover mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th>Título</th>
          <th>Status</th>
          <th>Categoria</th>
          <th>Valor</th>
          <th>Ação</th>
        </tr>
      </thead>

      <tbody>
        {data.map((obj, index) => {
          // Logic to handle both string category and nested object category
          const categoryKey = obj.category || obj.expenseCategory?.title || obj.incomeCategory?.title;
          const displayCategory = categoryMap[categoryKey] || categoryKey || "-";

          return (
            <tr key={`${obj.type}-${obj.id || index}`}>
              <td>{index + 1}</td>
              <td>{obj.title}</td>
              <td>{statusMap[obj.status] ?? obj.status}</td>
              <td>{displayCategory}</td>
              <td
                style={{
                  color: obj.type === "income" ? "#28a745" : "#dc3545",
                  fontWeight: "bold",
                }}
              >
                {obj.type === "income" ? "+ " : "- "}
                {formatCurrency(obj.amount)}
              </td>
              <td>
                <button className="btn btn-sm btn-outline-primary"
                  onClick={() => select(obj)}
                >Selecionar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;