import { useEffect, useState } from 'react';
import { getIncomes } from './services/api';

function App() {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    getIncomes().then(setIncomes);
  }, []);

  return (
    <div>
      <h1>Incomes</h1>
      <ul>
        {incomes.map(income => (
          <li key={income.id}>
            {income.description} - {income.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;