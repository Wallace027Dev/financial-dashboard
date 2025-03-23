"use client";
import HomeAside from "@/components/homeAside";
import TransactionsHeader from "@/components/TransactionsHeader";
import { useParams } from "next/navigation";

export default function TransactionsPage() {
  const params = useParams();
  const userId = Number(params.id);

  return (
    <>
      <HomeAside />
      <main id="main" className="py-4">
        <TransactionsHeader />

        {/* Gráfico de barras de transações por periodo, com cor para categorias */}

        {/* Gráfico de pizza de gasto por categoria || tabela com todos os gastos */}
      </main>
    </>
  );
}
