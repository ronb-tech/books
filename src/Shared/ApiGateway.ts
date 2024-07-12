import { API_BASE } from "./config";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export default class ApiGateway {
  async get<T>(path: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE}${path}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return { data };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async post<T>(path: string, payload: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return { data };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
