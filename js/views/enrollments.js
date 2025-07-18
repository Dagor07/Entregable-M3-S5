import { getCurrentUser, logout } from '../auth.js';
import { navigateTo } from '../router.js';

export async function renderEnrollments(container) {
  const user = getCurrentUser();
  const res = await fetch(`http://localhost:3000/enrollments?userId=${user.id}&_expand=event`);
  const enrollments = await res.json();

  container.innerHTML = `
    <div class="container-fluid">
      <div class="row min-vh-100">
        <!-- Sidebar -->
        <div class="col-md-3 bg-light p-4 shadow-sm">
          <h4 class="mb-4">My Events</h4>
          <p><strong>${user.username}</strong></p>
          <button id="btn-logout" class="btn btn-danger w-100 mb-2">Sing Out</button>
          <button id="btn-dashboard" class="btn btn-secondary w-100">Return to Dashboard</button>
        </div>

        <!-- Main Content -->
        <div class="col-md-9 p-4">
          <h3 class="mb-4">Registered Events</h3>
          ${
            enrollments.length > 0
              ? `<div class="row g-3">
                  ${enrollments.map(e => `
                    <div class="col-md-6">
                      <div class="card shadow-sm h-100">
                        <div class="card-body">
                          <h5 class="card-title">${e.event.name}</h5>
                          <p class="card-text">${e.event.description}</p>
                          <p class="card-text"><small class="text-muted">Date: ${e.event.date || 'Undefined'}</small></p>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>`
              : `<div class="alert alert-info">You are not yet registered for any event.</div>`
          }
        </div>
      </div>
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
