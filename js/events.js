const API_URL = 'http://localhost:3000/events';

export async function getEvents() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createEvent(event) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  });
  if (!res.ok) throw new Error('Error creating event');
  return res.json();
}

export async function updateEvent(id, updatedData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });
  return res.json();
}

export async function deleteEvent(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return res.ok;
}
