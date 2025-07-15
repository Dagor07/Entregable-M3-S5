import { getCurrentUser, logout } from '../auth.js';
import { navigateTo } from '../router.js';

export async function renderEnrollments(container) {
  const user = getCurrentUser();
  const res = await fetch(`http://localhost:3000/enrollments?userId=${user.id}&_expand=event`);
  const enrollments = await res.json();

  container.innerHTML = `
    <div class="sidebar">
      <h2>Mis Eventos</h2>
      <p>${user.username}</p>
      <button id="btn-logout">Logout</button>
      <button id="btn-dashboard">Volver al Dashboard</button>
    </div>
    <div class="content">
      <h3>Eventos Inscritos</h3>
      <ul>
        ${enrollments.map(e => `
          <li><strong>${e.event.name}</strong> - ${e.event.description}</li>
        `).join('')}
      </ul>
    </div>
  `;

  document.getElementById('btn-logout').addEventListener('click', () => {
    logout();
    navigateTo('/login');
  });

  document.getElementById('btn-dashboard').addEventListener('click', () => {
    navigateTo('/dashboard');
  });
}

