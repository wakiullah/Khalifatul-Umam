export interface GeneralSettings {
  site_name: string;
  tagline: string;
  description: string;
  contact_email: string;
  language: string;
}

export interface SocialMediaSettings {
  facebook: string;
  twitter: string;
  youtube: string;
  instagram: string;
}

export interface AppearanceSettings {
  theme: string;
  primary_color: string;
  rtl_layout: boolean;
  animation: boolean;
}

export interface NotificationSettings {
  new_comments: boolean;
  new_members: boolean;
  forum_activity: boolean;
  system_updates: boolean;
  daily_summary: boolean;
  weekly_report: boolean;
}

export interface SecuritySettings {
  two_factor_auth: boolean;
  login_alert: boolean;
  session_timeout: string;
}

export interface AdvancedSettings {
  api_access: boolean;
}

export interface SettingsData {
  general: GeneralSettings;
  social_media: SocialMediaSettings;
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  advanced: AdvancedSettings;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SettingsResponse {
  success: boolean;
  data: SettingsData;
}

export type UpdateSettingsRequest = Partial<
  Omit<SettingsData, "_id" | "createdAt" | "updatedAt" | "__v">
>;
