import { createEvent } from '../events.js';
import { navigateTo } from '../router.js';

export function renderCreateEvent(container) {
  container.innerHTML = `
    <div class="container py-5">
      <div class="card mx-auto shadow p-4" style="max-width: 600px;">
        <h2 class="mb-4 text-center">Crear Evento</h2>
        <form id="create-event-form">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre del evento</label>
            <input type="text" id="name" class="form-control" placeholder="Nombre del evento" required />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Descripción</label>
            <textarea id="description" class="form-control" placeholder="Descripción" required></textarea>
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">Fecha</label>
            <input type="date" id="date" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="capacity" class="form-label">Capacidad</label>
            <input type="number" id="capacity" class="form-control" placeholder="Capacidad" required />
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-success">Crear</button>
            <button type="button" id="back" class="btn btn-secondary">Volver</button>
          </div>
        </form>
        <div id="event-alert" class="alert alert-danger mt-3 d-none" role="alert"></div>
      </div>
    </div>
  `;

  document.getElementById('back').addEventListener('click', () => {
    navigateTo('/dashboard');
  });

  document.getElementById('create-event-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const newEvent = {
      name: document.getElementById('name').value.trim(),
      description: document.getElementById('description').value.trim(),
      date: document.getElementById('date').value,
      capacity: parseInt(document.getElementById('capacity').value),
      enrolled: 0
    };

    const alertBox = document.getElementById('event-alert');

    try {
      if (!newEvent.name || !newEvent.description || !newEvent.date || isNaN(newEvent.capacity)) {
        alertBox.textContent = 'Todos los campos son obligatorios y válidos.';
        alertBox.classList.remove('d-none');
        return;
      }

      await createEvent(newEvent);
      alert('Evento creado con éxito');
      navigateTo('/dashboard');
    } catch (err) {
      alertBox.textContent = 'Error al crear el evento';
      alertBox.classList.remove('d-none');
    }
  });
}
