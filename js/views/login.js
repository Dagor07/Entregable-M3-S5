import { login } from '../auth.js';
import { navigateTo } from '../router.js';

export function renderLogin(container) {
  container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
        <h2 class="text-center mb-4">Iniciar sesión</h2>
        <form id="login-form">
          <div class="mb-3">
            <label for="username" class="form-label">Usuario</label>
            <input type="text" id="username" class="form-control" placeholder="Ingresa tu usuario" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" id="password" class="form-control" placeholder="Ingresa tu contraseña" required />
          </div>
          <button type="submit" class="btn btn-success w-100">Ingresar</button>
        </form>
        <p class="text-center mt-3">¿No tienes cuenta? <a href="/register" id="go-register">Regístrate</a></p>
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
