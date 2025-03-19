export default function HomeHeader() {
  return (
    <header id="header" className="flex start gap-4">
      <button
        type="button"
        className="bg-categories-house hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg"
      >
        Casa
      </button>
      <button
        type="button"
        className="bg-categories-leisure hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg"
      >
        Lazer
      </button>
      <button
        type="button"
        className="bg-categories-transport hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg"
      >
        Transporte
      </button>
      <button
        type="button"
        className="bg-categories-education hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg"
      >
        Educação
      </button>
      <button
        type="button"
        className="bg-categories-clothing hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg"
      >
        Vestuário
      </button>
      <button
        type="button"
        className="bg-categories-health hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg"
      >
        Saúde
      </button>
      <button
        type="button"
        className="bg-categories-fixedExpenses hover:bg-hover hover:text-background font-medium px-5 rounded-md text-lg"
      >
        Despesas fixas
      </button>
    </header>
  );
}
