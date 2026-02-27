// ============================================
// AUTH.JS - Sistema di Autenticazione G&L Studio
// ============================================
const VALID_USERNAME = 'G&LStudio';
const VALID_PASSWORD = '12763Mlg@';

function authenticate(username, password) {
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    localStorage.setItem('glStudioAuthenticated', 'true');
    localStorage.setItem('glStudioUser', username);
    localStorage.setItem('glStudioLoginTime', new Date().toISOString());
    return true;
  }
  return false;
}

function isAuthenticated() {
  return localStorage.getItem('glStudioAuthenticated') === 'true';
}

function logoutUser() {
  localStorage.removeItem('glStudioAuthenticated');
  localStorage.removeItem('glStudioUser');
  localStorage.removeItem('glStudioLoginTime');
  localStorage.removeItem('editingClientId');
}

function logout() {
  if (confirm('Vuoi uscire dall\'applicazione?')) {
    logoutUser();
    window.location.href = 'logout.html';
  }
}

function getCurrentUser() {
  return localStorage.getItem('glStudioUser') || '';
}

function isSessionExpired() {
  const loginTime = localStorage.getItem('glStudioLoginTime');
  if (!loginTime) return true;
  const loginDate = new Date(loginTime);
  const now = new Date();
  const diffHours = (now - loginDate) / (1000 * 60 * 60);
  return diffHours > 24;
}

function protectPage() {
  if (!isAuthenticated()) {
    window.location.href = 'index.html';
    return false;
  }
  if (isSessionExpired()) {
    if (confirm('Sessione scaduta. Vuoi rinnovarla?')) {
      localStorage.setItem('glStudioLoginTime', new Date().toISOString());
    } else {
      logoutUser();
      window.location.href = 'index.html';
      return false;
    }
  }
  return true;
}

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('index.html') || 
      window.location.pathname.includes('logout.html') ||
      window.location.pathname.includes('import-backup.html')) {
    return;
  }
  protectPage();
});

window.authenticate = authenticate;
window.isAuthenticated = isAuthenticated;
window.logoutUser = logoutUser;
window.logout = logout;
window.getCurrentUser = getCurrentUser;
window.protectPage = protectPage;

console.log('✅ Auth.js caricato - G&L Studio Authentication System');
