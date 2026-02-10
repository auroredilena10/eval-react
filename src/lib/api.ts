
const API_URL = import.meta.env.VITE_API_URL;

export const contract = {
// Fetch all contracts 
  getAll: async () => {
    const response = await fetch(`${API_URL}/contracts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch contracts");
    }

    return response.json();
  },


};
