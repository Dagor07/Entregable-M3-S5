import { register } from '../auth.js';
import { navigateTo } from '../router.js';

export function renderRegister(container) {
  container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
        <h2 class="text-center mb-4">Registro</h2>
        <form id="register-form">
          <div class="mb-3">
            <label for="username" class="form-label">Usuario</label>
            <input type="text" id="username" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" id="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Registrarse</button>
        </form>
        <p class="text-center mt-3">¿Ya tienes cuenta? <a href="/login" id="go-login">Iniciar sesión</a></p>
        <div id="register-error" class="alert alert-danger mt-3 d-none"></div>
      </div>
    </div>
  `;

  document.getElementById('go-login').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/login');
  });

  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorBox = document.getElementById('register-error');

    if (!username || !password) {
      errorBox.textContent = 'Todos los campos son obligatorios.';
      errorBox.classList.remove('d-none');
      return;
    }

    try {
      await register(username, password);
      navigateTo('/dashboard');
    } catch (err) {
      errorBox.textContent = err.message;
      errorBox.classList.remove('d-none');
    }
  });
}
