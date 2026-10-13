export interface Notification {
  id: string;
  app: string;
  appIcon: string;
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
}

export interface AppDefinition {
  name: string;
  icon: string;
  color: string;
  badge?: number;
}

export interface iOSVersion {
  version: string;
  build: string;
  size: string;
  releaseDate: string;
  features: string[];
}

export type BootStage = 'off' | 'booting' | 'lockscreen' | 'homescreen' | 'app';

export type UpdateState = 'idle' | 'checking' | 'downloading' | 'preparing' | 'verifying' | 'installing' | 'complete';

export type ComponentState = 'intact' | 'damaged' | 'removed';

export interface RepairComponent {
  id: string;
  name: string;
  partNumber: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cost: string;
  description: string;
  state: ComponentState;
}

export interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  wind: number;
  uvIndex: number;
  visibility: number;
  pressure: number;
  hourly: { time: string; temp: number; condition: string }[];
  daily: { day: string; high: number; low: number; condition: string }[];
}
