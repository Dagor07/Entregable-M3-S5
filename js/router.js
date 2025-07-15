import { isAuthenticated, getCurrentUser } from './auth.js';
import { renderLogin } from './views/login.js';
// import { renderRegister } from './views/register.js';
import { renderDashboardAdmin } from './views/dashboardAdmin.js';
import { renderDashboardVisitor } from './views/dashboardVisitor.js';
import { renderCreateEvent } from './views/createEvent.js';
import { renderEnrollments } from './views/enrollments.js';
import { renderNotFound } from './views/notFound.js';

const routes = {
  '/login': renderLogin,
  // '/register': renderRegister,
  '/dashboard': (container) => {
    const user = getCurrentUser();
    if (user?.role === 'admin') {
      return renderDashboardAdmin(container);
    } else {
      return renderDashboardVisitor(container);
    }
  },
  '/dashboard/events/create': renderCreateEvent,
  '/dashboard/enrollments': renderEnrollments,
};

export function router() {
  const path = window.location.pathname;
  const app = document.getElementById('app');
  const publicRoutes = ['/login', '/register', '/not-found'];

  // Redirigir desde / o index.html a /login
  if (path === '/' || path.includes('index.html')) {
    return navigateTo('/login');
  }

  // Si está autenticado y visita login o register, redirigir al dashboard
  if (isAuthenticated() && (path === '/login' || path === '/register')) {
    return navigateTo('/dashboard');
  }

  // Si no está autenticado y accede a ruta privada
  if (!isAuthenticated() && !publicRoutes.includes(path)) {
    return navigateTo('/not-found');
  }

  app.innerHTML = '';

  if (routes[path]) {
    routes[path](app); // ✅ Pasamos el contenedor correctamente
  } else {
    renderNotFound(app);
  }
}

export function navigateTo(path) {
  window.history.pushState({}, '', window.location.origin + path);
  router();
}

window.addEventListener('popstate', router);