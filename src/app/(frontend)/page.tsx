import HomePage from "@/components/home-page";
import { connection } from "next/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  await connection();

  return <HomePage />;
}
