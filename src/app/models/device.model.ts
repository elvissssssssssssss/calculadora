export interface Device {
  deviceId: string;
  model: string;
  osVersion: string;
  ipAddress: string;
  isOnline: boolean;
  lastSeen: string; // .NET envía fecha, aquí llega como string
}