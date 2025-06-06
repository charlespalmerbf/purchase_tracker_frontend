const API_URL = process.env.REACT_APP_API_PATH || 'http://localhost:8000/api';

export async function login(username, password) {
  const res = await fetch(`${API_URL}/auth/token/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.non_field_errors?.[0] || 'Login failed');
  }

  const data = await res.json();
  return data.auth_token;
}

export async function register(username, password, rePassword) {
  const res = await fetch(`${API_URL}/auth/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, re_password: rePassword }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.username || data.password || 'Registration failed');
  }

  return await res.json();
}
