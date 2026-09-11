/**
 * API Configuration with Codespaces support
 * 
 * VITE_CODESPACE_NAME must be defined in .env.local:
 * VITE_CODESPACE_NAME=${CODESPACE_NAME}
 */

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

/**
 * Fetch wrapper with error handling
 */
export async function fetchAPI(endpoint) {
  try {
    const url = `${baseUrl}${endpoint}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}
