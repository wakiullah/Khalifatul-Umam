import NewsManager from "@/components/dashboard/NewsManager";
import { getNewsData } from "@/services/news.api";
import React from "react";

export default async function NewsPage() {
  const { data } = await getNewsData();

  const latestUpdate = data.reduce(
    (latest, item) =>
      new Date(item.updatedAt) > new Date(latest) ? item.updatedAt : latest,
    "",
  );
  const key = `${data.length}-${latestUpdate}`;

  return <NewsManager key={key} initialData={data || []} />;
}
