import DownloadsManager from "@/components/dashboard/DownloadsManager";
import { getDownloadsData } from "@/services/downloads.api";
import React from "react";

export default async function DownloadsPage() {
  const { data } = await getDownloadsData();

  const latestUpdate = data.reduce(
    (latest, item) =>
      new Date(item.updatedAt) > new Date(latest) ? item.updatedAt : latest,
    "",
  );
  const key = `${data.length}-${latestUpdate}`;

  return <DownloadsManager key={key} initialData={data} />;
}