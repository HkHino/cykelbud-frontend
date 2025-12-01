// src/api/auth.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userName: string;
  employeeId: number;
}

/**
 * Kalder backend-login endpointet.
 * Antagelse: POST { userName, password } til /api/auth/login
 * og får { token, userName, employeeId } tilbage.
 */
export async function loginRequest(
  data: LoginRequest
): Promise<LoginResponse> {
  if (!API_BASE_URL) {
    throw new Error(
      "VITE_API_BASE_URL er ikke sat. Tilføj den i en .env-fil i projektroden."
    );
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Login failed (${response.status} ${response.statusText}): ${text}`
    );
  }

  return (await response.json()) as LoginResponse;
}
