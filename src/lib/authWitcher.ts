const KEY = "current_witcher";

// Represents the currently selected witcher (or none)
export type CurrentWitcher = { id: string; name: string } | null;

// Get the current witcher from sessionStorage
export function getCurrentWitcher(): CurrentWitcher {
  const raw = sessionStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

// Save the current witcher
export function setCurrentWitcher(witcher: { id: string; name: string }) {
  sessionStorage.setItem(KEY, JSON.stringify(witcher));
}

// Clear the stored witcher
export function clearCurrentWitcher() {
  sessionStorage.removeItem(KEY);
}