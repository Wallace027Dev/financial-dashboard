import axios from "axios";

export default async function getFetch(
  endpoint: string,
  params?: Record<string, string | number>
) {
  try {
    const queryString = params
      ? "?" + new URLSearchParams(params as Record<string, string>).toString()
      : "";

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}${queryString}`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}:`, error);
    throw error;
  }
}
