import { supabase } from './supabaseClient.js';

/**
 * Helper to fetch the active session access token.
 */
const getAuthToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
};

/**
 * Handle 401 unauthorized errors by logging out and redirecting to login.
 */
const handleResponse = async (response) => {
  if (response.status === 401) {
    console.warn('[API Wrapper] 401 Unauthorized detected. Clearing session.');
    await supabase.auth.signOut();
    // Force browser redirect to login
    window.location.href = '/login';
    throw new Error('Unauthorized session expired. Redirecting to login.');
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || `HTTP error! Status: ${response.status}`);
  }
  return data;
};

/**
 * Wrapper for HTTP GET requests.
 */
export const apiGet = async (path) => {
  const token = await getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(path, {
    method: 'GET',
    headers,
  });

  return handleResponse(response);
};

/**
 * Wrapper for HTTP POST requests.
 */
export const apiPost = async (path, body = {}) => {
  const token = await getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(path, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  return handleResponse(response);
};

/**
 * Wrapper for HTTP PATCH requests.
 */
export const apiPatch = async (path, body = {}) => {
  const token = await getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(path, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  });

  return handleResponse(response);
};
