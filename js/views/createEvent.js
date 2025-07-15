import { createEvent } from '../events.js';
import { navigateTo } from '../router.js';

export function renderCreateEvent(container) {
  container.innerHTML = `
    <h2>Crear Evento</h2>
    <form id="create-event-form">
      <input type="text" id="name" placeholder="Nombre del evento" required />
      <textarea id="description" placeholder="Descripción" required></textarea>
      <input type="date" id="date" required />
      <input type="number" id="capacity" placeholder="Capacidad" required />
      <button type="submit">Crear</button>
    </form>
    <button id="back">Volver</button>
  `;

  document.getElementById('back').addEventListener('click', () => {
    navigateTo('/dashboard');
  });

  document.getElementById('create-event-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newEvent = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      date: document.getElementById('date').value,
      capacity: parseInt(document.getElementById('capacity').value),
      enrolled: 0
    };

    try {
      await createEvent(newEvent);
      alert('Evento creado');
      navigateTo('/dashboard');
    } catch (err) {
      alert('Error al crear evento');
    }
  });
}
