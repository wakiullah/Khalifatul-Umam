export interface DownloadData {
  _id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: string;
  category: string;
  language: string;
  download_count: number;
  is_published: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface DownloadsResponse {
  success: boolean;
  count: number;
  data: DownloadData[];
}

export interface CreateDownloadRequest {
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: string;
  category: string;
  language: string;
  is_published: boolean;
}

export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: string;
  category: string;
  language: string;
  download_count: number;
  is_published: boolean;
}
