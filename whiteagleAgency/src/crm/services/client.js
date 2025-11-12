// Simple API client with Bearer token support and base URL from env
// Usage: import api from '../services/client'; await api.get('/auth/me')

const BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:3000';

function getToken() {
  try { return localStorage.getItem('token'); } catch { return null; }
}

async function request(path, { method = 'GET', headers = {}, body, auth = true } = {}) {
  const url = `${BASE_URL}${path}`;
  const finalHeaders = { 'Content-Type': 'application/json', ...headers };
  if (auth) {
    const token = getToken();
    if (token) finalHeaders['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(url, { method, headers: finalHeaders, body: body ? JSON.stringify(body) : undefined });
  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json().catch(() => ({})) : await res.text();
  if (!res.ok) {
    const message = (data && data.message) || `HTTP ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
  baseUrl: BASE_URL,
};

export default api;
