import SayingsManager from "@/components/dashboard/SayingsManager";
import { getSayingsData } from "@/services/saying.api";

export default async function SayingsPage() {
  const { data } = await getSayingsData();
  return <SayingsManager initialData={data || []} />;
}
