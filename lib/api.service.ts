export interface ConnectionConfig {
  apiKey: string;
  baseUrl: string;
}

let currentConfig: ConnectionConfig = {
  apiKey: process.env.REDASH_API_KEY || '',
  baseUrl: process.env.HUMAND_API_BASE_URL || process.env.REDASH_URL || '',
};

export function getConnectionConfig(): ConnectionConfig {
  return currentConfig;
}

export function setConnectionConfig(config: ConnectionConfig): void {
  currentConfig = config;
}

export function getCurrentConfig(): ConnectionConfig {
  return currentConfig;
}

export function setConfigFromHeaders(request: Request): void {
  const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');
  const apiKeyHeader = request.headers.get('X-API-Key') || request.headers.get('x-api-key');
  const baseUrlHeader = request.headers.get('X-Base-Url') || request.headers.get('x-base-url');
  
  let apiKey = '';
  let baseUrl = currentConfig.baseUrl;

  if (apiKeyHeader) {
    apiKey = apiKeyHeader;
  } else if (authHeader) {
    if (authHeader.startsWith('Bearer ')) {
      apiKey = authHeader.slice(7);
    } else if (authHeader.startsWith('Basic ')) {
      apiKey = authHeader.slice(6);
    } else {
      apiKey = authHeader;
    }
  }

  if (baseUrlHeader) {
    baseUrl = baseUrlHeader;
  }

  if (apiKey || baseUrl) {
    currentConfig = {
      apiKey: apiKey || currentConfig.apiKey,
      baseUrl: baseUrl || currentConfig.baseUrl,
    };
  }
}

export class ApiService {
  constructor(private config: ConnectionConfig) {}

  private get headers(): HeadersInit {
    return {
      'Authorization': `Basic ${this.config.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    const url = new URL(`${this.config.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async post<T>(path: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.config.baseUrl}${path}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async put<T>(path: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.config.baseUrl}${path}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async patch<T>(path: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.config.baseUrl}${path}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}
