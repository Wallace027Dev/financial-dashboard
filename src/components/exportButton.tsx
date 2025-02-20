import ITransaction from "@/interfaces/ITransaction";
import { handleExportTransaction } from "@/utils/handleExportTransactions";
import { useEffect, useRef, useState } from "react";

interface IExportButtonProps {
  rawTransactions: ITransaction[];
}

export default function ExportButton({ rawTransactions }: IExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleExport = (type: "csv" | "pdf") => {
    console.log("Clicou no tipo de exportação: ", type);
    handleExportTransaction(type, rawTransactions);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="bg-blue-500 px-4 py-2 text-white font-bold rounded-md"
      >
        Exportar
      </button>

      {isOpen && (
        <div className="absolute bg-white border border-gray-300 rounded-md mt-2 w-40 shadow-lg">
          <ul>
            <li>
              <button
                onClick={() => handleExport("pdf")}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Exportar PDF
              </button>
            </li>
            <li>
              <button
                onClick={() => handleExport("csv")}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Exportar CSV
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
