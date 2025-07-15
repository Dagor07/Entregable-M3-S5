import { getCurrentUser, logout } from '../auth.js';
import { getEvents } from '../events.js';
import { navigateTo } from '../router.js';

export async function renderDashboardAdmin(container) {
  const user = getCurrentUser();
  const events = await getEvents();

  container.innerHTML = `
    <div class="container-fluid">
      <div class="row min-vh-100">
        <!-- Sidebar -->
        <div class="col-md-3 bg-light p-4 shadow-sm">
          <h3 class="mb-4">Admin Panel</h3>
          <p><strong>${user.username}</strong> <span class="badge bg-dark">${user.role}</span></p>
          <button id="btn-logout" class="btn btn-danger w-100 my-2">Cerrar sesión</button>
          <button id="btn-create-event" class="btn btn-primary w-100">Crear Evento</button>
        </div>

        <!-- Main Content -->
        <div class="col-md-9 p-4">
          <h3 class="mb-4">Lista de Eventos</h3>
          <div class="row g-3">
            ${events.map(event => `
              <div class="col-md-6">
                <div class="card h-100 shadow-sm">
                  <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <p class="card-text"><small class="text-muted">Capacidad: ${event.capacity}</small></p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-logout').addEventListener('click', () => {
    logout();
    navigateTo('/login');
  });

  document.getElementById('btn-create-event').addEventListener('click', () => {
    navigateTo('/dashboard/events/create');
  });
}
