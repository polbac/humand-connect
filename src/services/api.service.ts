import { config } from '../config/index.js';

interface ApiErrorDetail {
  status: number;
  endpoint: string;
  method: string;
  timestamp: string;
  userMessage: string;
}

function buildErrorMessage(status: number, endpoint: string, method: string, originalMessage?: string): string {
  const timestamp = new Date().toISOString();
  const errorDetail: ApiErrorDetail = {
    status,
    endpoint,
    method,
    timestamp,
    userMessage: '',
  };

  if (status === 403) {
    errorDetail.userMessage = 'La API key configurada es inválida o ha expirado. Por favor, verifica tu API_KEY en la configuración.';
  } else if (status === 400 || status >= 500) {
    errorDetail.userMessage = 'Ha ocurrido un error al procesar tu solicitud. Por favor, contacta al equipo de Humand para recibir asistencia.';
  } else {
    errorDetail.userMessage = originalMessage || `Error HTTP ${status}`;
  }

  return JSON.stringify(errorDetail, null, 2);
}

export class ApiService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
  }

  private getHeaders(): HeadersInit {
    return {
      'Authorization': `Basic ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async get<T>(endpoint: string, params?: Record<string, string | number | undefined>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(buildErrorMessage(response.status, endpoint, 'GET', error.message));
    }

    return response.json();
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(buildErrorMessage(response.status, endpoint, 'POST', error.message));
    }

    return response.json();
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(buildErrorMessage(response.status, endpoint, 'PATCH', error.message));
    }

    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(buildErrorMessage(response.status, endpoint, 'DELETE', error.message));
    }

    return response.json();
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(buildErrorMessage(response.status, endpoint, 'PUT', error.message));
    }

    return response.json();
  }

  async putRaw(endpoint: string, data?: unknown): Promise<string> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(buildErrorMessage(response.status, endpoint, 'PUT', error.message));
    }

    return response.text();
  }
}

export const apiService = new ApiService();
