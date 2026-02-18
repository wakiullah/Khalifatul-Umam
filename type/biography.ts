export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon_type: string;
  _id: string;
}

export interface BiographyData {
  _id: string;
  full_name: string;
  title: string;
  arabic_name: string;
  english_name: string;
  description: string[];
  timeline: TimelineItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BiographyResponse {
  success: boolean;
  data: BiographyData;
}
