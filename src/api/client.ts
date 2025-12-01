// src/api/client.ts
// Lille wrapper rundt om fetch, så vi har ét sted at styre baseUrl, headers osv.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

if (!API_BASE_URL) {
  // hjælper fejlfinding hvis man glemmer .env
  // (crasher ikke appen, men giver en tydelig log)
  console.warn("VITE_API_BASE_URL er ikke sat. Brug .env i projektroden.");
}

export async function apiGet<T>(path: string, token?: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `GET ${path} failed: ${res.status} ${res.statusText} - ${text}`
    );
  }

  return res.json() as Promise<T>;
}
