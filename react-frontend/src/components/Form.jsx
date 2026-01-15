function Form({ button }) {
  return (
    <form>
      <input type="text" placeholder="Título" className="form-control"></input>
      <input type="text" placeholder="Tipo" className="form-control"></input>
      <input
        type="text"
        placeholder="Categoria"
        className="form-control"
      ></input>
      <input type="number" placeholder="Valor" className="form-control"></input>

      {button ? (
        <input
          type="button"
          value="Cadastrar"
          className="btn btn-primary"
        ></input>
      ) : (
        <div>
          <input
            type="button"
            value="Alterar"
            className="btn btn-warning"
          ></input>
          <input
            type="button"
            value="Remover"
            className="btn btn-danger"
          ></input>
          <input
            type="button"
            value="Cancelar"
            className="btn btn-secondary"
          ></input>
        </div>
      )}
    </form>
  );
}

export default Form;