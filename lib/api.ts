const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/products';

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const data = (await response.json()) as T & { message?: string };

  if (!response.ok) {
    throw new Error(data.message || 'API request failed.');
  }

  return data;
}

export function getApiUrl() {
  return API_URL;
}
