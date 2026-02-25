import NewsManager from "@/components/dashboard/NewsManager";
import { getNewsData } from "@/services/news.api";
import React from "react";

export default async function NewsPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const limit = 12; // Show 12 items per page in dashboard

  const newsResponse = await getNewsData(currentPage, limit);
  const data = newsResponse.data || [];
  const totalPages = newsResponse.pages || 1;

  const latestUpdate = data.reduce(
    (latest, item) =>
      new Date(item.updatedAt) > new Date(latest) ? item.updatedAt : latest,
    "",
  );
  const key = `${data.length}-${latestUpdate}-${currentPage}`;

  return (
    <NewsManager
      key={key}
      initialData={data}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
