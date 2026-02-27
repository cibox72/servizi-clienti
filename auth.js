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

function protectPage() {
  if (!isAuthenticated()) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

// Esporta funzioni globalmente (IMPORTANTE!)
window.authenticate = authenticate;
window.isAuthenticated = isAuthenticated;
window.logoutUser = logoutUser;
window.logout = logout;
window.getCurrentUser = getCurrentUser;
window.protectPage = protectPage;

console.log('✅ Auth.js caricato - G&L Studio');
console.log('👤 Username: G&LStudio');
console.log('🔒 Password: 12763Mlg@');
