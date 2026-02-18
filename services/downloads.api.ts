import { CreateDownloadRequest, DownloadsResponse } from "@/type/downloads";

export async function getDownloadsData(): Promise<DownloadsResponse > {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/downloads`);
  return res.json();
}

export async function createDownload(data: CreateDownloadRequest) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/downloads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteDownload(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/downloads/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function updateDownload(id: string, data: Partial<CreateDownloadRequest>) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/downloads/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}