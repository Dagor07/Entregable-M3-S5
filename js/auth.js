const API_URL = 'http://localhost:3000';

export async function login(username, password) {
  const res = await fetch(`${API_URL}/users?username=${username}&password=${password}`);
  const users = await res.json();
  if (users.length > 0) {
    const user = users[0];
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } else {
    throw new Error('Invalid credentials');
  }
}

export async function register(username, password, role = 'visitor') {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, role })
  });

  if (!res.ok) throw new Error();
  const user = await res.json();
  localStorage.setItem('user', JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem('user');
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function isAuthenticated() {
  return !!localStorage.getItem('user');
}
