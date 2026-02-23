import SettingsManager from "@/components/dashboard/SettingsManager";
import { getSettings } from "@/services/settings.api";
import React from "react";

export default async function SettingsPage() {
  const { data } = await getSettings();
  return <SettingsManager initialData={data} />;
}
