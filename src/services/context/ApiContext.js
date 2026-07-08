import { createContext, useContext } from "react";

// API base URL from environment or fallback to "/api"
const API_BASE = (process.env.REACT_APP_API_BASE || "/api").replace(/\/$/, "");

const ApiConfigContext = createContext({
  baseUrl: API_BASE,
});

export function ApiProvider({ children }) {
  return (
    <ApiConfigContext.Provider value={{ baseUrl: API_BASE }}>
      {children}
    </ApiConfigContext.Provider>
  );
}

export function useApiConfig() {
  return useContext(ApiConfigContext);
}

export async function apiFetch(path, options) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return fetch(`${API_BASE}${normalizedPath}`, options);
}

export default ApiConfigContext;