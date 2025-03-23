export default function TransactionsHeader() {
  return (
    <>
      <header className="flex start gap-4" id="header">
        <button
          type="button"
          className="bg-categories-house hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg h-10"
        >
          Casa
        </button>
        <button
          type="button"
          className="bg-categories-leisure hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg h-10"
        >
          Lazer
        </button>
        <button
          type="button"
          className="bg-categories-transport hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg h-10"
        >
          Transporte
        </button>
        <button
          type="button"
          className="bg-categories-education hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg h-10"
        >
          Educação
        </button>
        <button
          type="button"
          className="bg-categories-clothing hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg h-10"
        >
          Vestuário
        </button>
        <button
          type="button"
          className="bg-categories-health hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg h-10"
        >
          Saúde
        </button>
        <button
          type="button"
          className="bg-categories-fixedExpenses hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg h-10"
        >
          Despesas fixas
        </button>
      </header>
    </>
  );
}
