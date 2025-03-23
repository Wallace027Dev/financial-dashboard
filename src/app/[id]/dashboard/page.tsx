"use client";
import HomeAside from "@/components/homeAside";
import TransactionsHeader from "@/components/TransactionsHeader";
import HomeMain from "@/components/homeMain";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const params = useParams();
  const userId = Number(params.id);

  return (
    <>
      <TransactionsHeader />
      <HomeAside />
      <HomeMain userId={userId} />
    </>
  );
}
