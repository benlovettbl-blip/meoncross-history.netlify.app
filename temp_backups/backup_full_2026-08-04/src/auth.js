/**
 * Microsoft SSO Authentication Module
 * Prepares the application for Microsoft Single Sign-On (SSO) using Azure AD / MSAL.
 */

// MSAL configuration parameters placeholder
const msalConfig = {
  auth: {
    clientId: "00000000-0000-0000-0000-000000000000", // Replace with client application ID from Azure Portal
    authority: "https://login.microsoftonline.com/your-school-tenant-id", // Replace with tenant ID or 'common'
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};

let msalInstance = null;

// Stub MSAL instantiation (can be loaded from NPM/CDN)
export function initAuth() {
  console.log("Initializing Microsoft SSO configuration with tenant...", msalConfig.auth.authority);
  // Prepare localStorage default session for developer mode / classroom testing
  const existingProfile = localStorage.getItem('user_profile');
  if (!existingProfile || existingProfile.includes('Meoncross')) {
    // Default mock user
    setMockUser("Admin");
  }
}

export function setMockUser(yearGroup) {
  const mockUser = {
    username: "student@history-app.local",
    name: "Mr Lovett's History Hub Student",
    yearGroup: yearGroup, // 'Year 7', 'Year 8', 'Year 9', 'GCSE'
    tenant: "history-app.local"
  };
  localStorage.setItem('user_profile', JSON.stringify(mockUser));
  return mockUser;
}

export function getProfile() {
  const profileStr = localStorage.getItem('user_profile');
  return profileStr ? JSON.parse(profileStr) : null;
}

export function logout() {
  localStorage.removeItem('user_profile');
  window.location.reload();
}
