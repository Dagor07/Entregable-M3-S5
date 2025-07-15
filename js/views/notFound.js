import { isAuthenticated } from '../auth.js';
import { navigateTo } from '../router.js';

export function renderNotFound(container) {
  container.innerHTML = `
    <h2>404 - Página no encontrada</h2>
    <p>Oops... esta ruta no existe o no tienes acceso.</p>
    <button id="go-home">Ir al inicio</button>
  `;

  document.getElementById('go-home').addEventListener('click', () => {
    if (isAuthenticated()) {
      navigateTo('/dashboard');
    } else {
      navigateTo('/login');
    }
  });
} 