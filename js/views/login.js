import { login } from '../auth.js';
import { navigateTo } from '../router.js';

export function renderLogin(container) {
  container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
        <h2 class="text-center mb-4">Login</h2>
        <form id="login-form">
          <div class="mb-3">
            <label for="username" class="form-label">User</label>
            <input type="text" id="username" class="form-control" placeholder="Enter your user" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" class="form-control" placeholder="Enter your password" required />
          </div>
          <button type="submit" class="btn btn-success w-100">Enterr</button>
        </form>
        <p class="text-center mt-3">Don't have an account? <a href="/register" id="go-register">Register</a></p>
      </div>
    </div>
  `;

  document.getElementById('go-register').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/register');
  });

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      await login(username, password);
      navigateTo('/dashboard');
    } catch (err) {
      alert(err.message); // Puedes usar alertas Bootstrap si quieres mejorar esto
    }
  });
}
