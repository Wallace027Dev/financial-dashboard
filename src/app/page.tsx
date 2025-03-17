"use client";

import FinancialEvolutionChart from "@/components/FinancialEvolutionChart";
import TransactionsChart from "@/components/TransactionsChart";

export default function Home() {
  return (
    <div className="grid-custom p-8 font-sans justify-center">
      <header id="header" className="flex justify-between w-full max-w-7xl h-10">
        <button
          type="button"
          className="bg-categories-house hover:bg-hover hover:text-background font-medium px-4 rounded-md text-lg"
        >
          Casa
        </button>
        <button
          type="button"
          className="bg-categories-leisure hover:bg-hover hover:text-background font-medium px-4 rounded-md text-lg"
        >
          Lazer
        </button>
        <button
          type="button"
          className="bg-categories-transport hover:bg-hover hover:text-background font-medium px-4 rounded-md text-lg"
        >
          Transporte
        </button>
        <button
          type="button"
          className="bg-categories-education hover:bg-hover hover:text-background font-medium px-4 rounded-md text-lg"
        >
          Educação
        </button>
        <button
          type="button"
          className="bg-categories-clothing hover:bg-hover hover:text-background font-medium px-4 rounded-md text-lg"
        >
          Vestuário
        </button>
        <button
          type="button"
          className="bg-categories-health hover:bg-hover hover:text-background font-medium px-4 rounded-md text-lg"
        >
          Saúde
        </button>
        <button
          type="button"
          className="bg-categories-fixedExpenses hover:bg-hover hover:text-background font-medium px-4 rounded-md text-lg"
        >
          Despesas fixas
        </button>
      </header>
      <aside id="aside" className="flex flex-col justify-between pr-4">
        <div>
          <h1>Logo Nome do bagulho</h1>
          <ul>
            <li className="p-4 font-medium hover:bg-hover rounded-md cursor-pointer mt-2">
              imagem Dashboard
            </li>
            <li className="p-4 font-medium hover:bg-hover rounded-md cursor-pointer mt-2">
              imagem Transações
            </li>
            <li className="p-4 font-medium hover:bg-hover rounded-md cursor-pointer mt-2">
              imagem Configurações
            </li>
          </ul>
        </div>

        <footer>
          image
          <div>
            <h2>Nome</h2>
            <p>email</p>
          </div>
        </footer>
      </aside>
      <main id="main" className="py-4">
        <TransactionsChart />
        <FinancialEvolutionChart />
      </main>
    </div>
  );
}
