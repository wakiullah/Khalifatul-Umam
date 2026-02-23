import GalleryManager from "@/components/dashboard/GalleryManager";
import { getGalleryData } from "@/services/gallery.api";
import React from "react";

export default async function GalleryPage() {
  const { data } = await getGalleryData();

  return <GalleryManager initialData={data || []} />;
}