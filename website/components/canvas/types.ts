export interface Module {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  authType?: "api_key" | "oauth";
}

export interface Endpoint {
  id: string;
  name: string;
  statusCode: string;
  jsonData: string;
}

export interface Component {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  type: "web" | "mobile" | "service" | "database";
  language?: string; // For services only
  framework?: string;
  apiEndpoints?: Endpoint[];
  modules?: Module[];
}

export interface Connection {
  id: string;
  from: string;
  to: string;
  fromSide?: "top" | "right" | "bottom" | "left";
  toSide?: "top" | "right" | "bottom" | "left";
  useSDK?: boolean;
}

export type Tool = "select" | "component" | "connection";

export const GRID_SIZE = 80;
