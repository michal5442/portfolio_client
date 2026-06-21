import { apiFetch } from "../context/ApiContext";

const RESOURCE = "project";

export async function insertProject(project) {
  const response = await apiFetch(`/${RESOURCE}/insertProject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create project.");
  }

  return response.json();
}

export async function updateProject(project) {
  const response = await apiFetch(`/${RESOURCE}/updateProject`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to update project.");
  }

  return response.json();
}

export async function getProjectById(id) {
  if (!id || !id.trim()) {
    throw new Error("Project ID must not be empty.");
  }

  const response = await apiFetch(`/${RESOURCE}/getProjectById/${encodeURIComponent(id)}`);

  if (response.status === 404) {
    throw new Error(`Project with ID '${id}' was not found.`);
  }

  if (!response.ok) {
    throw new Error("An unexpected error occurred.");
  }

  return response.json();
}

export async function getAllProjects() {
  const response = await apiFetch(`/${RESOURCE}/getAllProjects`);

  if (!response.ok) {
    throw new Error("An unexpected error occurred.");
  }

  return response.json();
}

export async function getProjectByYear(year) {
  const response = await apiFetch(`/${RESOURCE}/getProjectsByYear/${encodeURIComponent(year)}`);

  if (response.status === 404) {
    throw new Error(`Project for year '${year}' was not found.`);
  }

  if (!response.ok) {
    throw new Error("An unexpected error occurred.");
  }

  return response.json();
}