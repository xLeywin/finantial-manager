export async function getIncomes() {
  const response = await fetch('http://localhost:8080/incomes');
  return response.json();
}