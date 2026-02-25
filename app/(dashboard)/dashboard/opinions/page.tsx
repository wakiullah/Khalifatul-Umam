import OpinionsManager from "@/components/dashboard/OpinionsManager";
import { getAllOpinions } from "@/services/opinions.api";

export default async function OpinionsPage() {
  try {
    const opinionsResponse = await getAllOpinions();
    const data = opinionsResponse?.data || [];

    return <OpinionsManager initialData={data} />;
  } catch (error) {
    // Return empty data on error
    return <OpinionsManager initialData={[]} />;
  }
}
