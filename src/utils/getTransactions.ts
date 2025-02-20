import axios from "axios";

export const getTransactions = async (
  userId: number,
  minDate: string,
  maxDate: string
) => {
  const response = await axios.get(
    `http://localhost:3000/api/transactions?userId=${userId}&minDate=${minDate}&maxDate=${maxDate}`
  );
  return response.data;
};
