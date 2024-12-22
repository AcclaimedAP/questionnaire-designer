interface ApiConfig {
  baseUrl: string;
  headers: Record<string, string>;
  timeout: number;
}

interface ApiResponse<T> {
  data: T;
  error: string | null;
}

class Api {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }
  
  async get<T>(url: string): Promise<ApiResponse<T>> {
    return this.request(url, {
      method: 'GET',
      headers: this.config.headers
    });
  }

  async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
    return this.request(url, {
      method: 'POST',
      headers: {
        ...this.config.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  async put<T>(url: string, data: any): Promise<ApiResponse<T>> {
    return this.request(url, {
      method: 'PUT',
      headers: {
        ...this.config.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.request(url, {
      method: 'DELETE',
      headers: this.config.headers
    });
  }

  private async request(url: string, options: RequestInit) {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timeout after ${this.config.timeout}ms`));
      }, this.config.timeout);
    });

    try {
      const fetchPromise = fetch(`${this.config.baseUrl}${url}`, options);
      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API request failed: ${error.message}`);
      }
      throw new Error('An unknown error occurred');
    }
  }

  setHeaders(headers: Record<string, string>) {
    this.config.headers = headers;
  }
}

const api = new Api({
  baseUrl: 'http://localhost:5173',
  headers: {},
  timeout: 5000
});

export default api;
