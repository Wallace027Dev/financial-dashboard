"use client";
import HomeAside from "@/components/homeAside";
import HomeHeader from "@/components/homeHeader";
import HomeMain from "@/components/homeMain";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const userId = Number(params.id);

  return (
    <>
      <HomeHeader />
      <HomeAside />
      <HomeMain userId={userId} />
    </>
  );
}
