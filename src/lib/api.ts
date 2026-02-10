
const API_URL = import.meta.env.VITE_API_URL;

export const contract = {
// Fetch all contracts or filtered by title and/or status
  getAll: async (filters?: { title?: string; status?: string; }) => {
    const params = new URLSearchParams();
    
    if (filters?.title) params.set("title", filters.title);
    if (filters?.status) params.set("status", filters.status);
    
    const query = params.toString();
    const url = query 
      ? `${API_URL}/contracts/?${query}` 
      : `${API_URL}/contracts/`;

    const response = await fetch(url, {
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
