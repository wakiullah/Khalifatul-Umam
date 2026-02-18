import BiographyManager from "@/components/dashboard/BiographyManager";
import { getBiographyData } from "@/services/biography.api";

export default async function BiographyPage() {
  const { data } = await getBiographyData();
  return <BiographyManager initialData={data} />;
}
