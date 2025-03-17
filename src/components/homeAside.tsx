import Image from "next/image";

export default function HomeAside() {
  return (
    <aside id="aside" className="flex flex-col justify-between pr-4">
      <div>
        <h1>Logo Nome do bagulho</h1>
        <ul>
          <li className="p-4 font-medium hover:bg-hover hover:text-background rounded-md cursor-pointer mt-2 flex align-baseline">
            <Image
              src="/pie-chart.svg"
              alt="Ícone de dashboard"
              className="mr-2"
              width={24}
              height={24}
            />
            Dashboard
          </li>
          <li className="p-4 font-medium hover:bg-hover hover:text-background rounded-md cursor-pointer mt-2 flex align-baseline">
            <Image
              src="/transaction.svg"
              alt="Ícone de transações"
              className="mr-2"
              width={24}
              height={24}
            />
            Transações
          </li>
          <li className="p-4 font-medium hover:bg-hover hover:text-background rounded-md cursor-pointer mt-2 flex align-baseline">
            <Image
              src="/setting.svg"
              alt="Ícone de configurações"
              className="mr-2"
              width={24}
              height={24}
            />
            Configurações
          </li>
        </ul>
      </div>

      <footer className="flex gap-4 items-center">
        <Image
          src="/user.svg"
          alt="Foto do usuário"
          className="border-primary border-4 w-14 h-14 rounded-full p-1"
          width={48}
          height={48}
        />
        <div>
          <h2 className="text-xl font-semibold my-1">Wallace Vieira</h2>
          <p>wallaceofc@hotmail.com</p>
        </div>
      </footer>
    </aside>
  );
}
