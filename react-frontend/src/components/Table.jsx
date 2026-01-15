function Table({ data }) {
  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const statusMap = {
    RECEIVED: "Recebido",
    SCHEDULED: "Agendado",
    PAID: "Pago",
    PENDING: "Pendente",
    DELAYED: "Atrasado",
  };

  if (!data || data.length === 0) {
    return <p>Nenhum registro encontrado.</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Título</th>
          <th>Status</th>
          <th>Categoria</th>
          <th>Valor</th>
          <th>Selecionar</th>
        </tr>
      </thead>

      <tbody>
        {data.map((obj, index) => {
          const category =
            obj.expenseCategory?.title ?? obj.incomeCategory?.title ?? "-";

          return (
            <tr key={`${obj.type}-${obj.id}`}>
              <td>{index + 1}</td>
              <td>{obj.title}</td>
              <td>{statusMap[obj.status] ?? obj.status}</td>
              <td>{category}</td>
              <td
                style={{
                  color: obj.type === "income" ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {obj.type === "income" ? "+ " : "- "}
                {formatCurrency(obj.amount)}
              </td>
              <td>
                <button>Selecionar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
