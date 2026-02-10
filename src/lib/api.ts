
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
  // Fetch contract details by ID
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/contracts/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }); 

    if (!response.ok) {
      throw new Error("Failed to fetch contract details");
    }

    return response.json();
  },
  //Create contract
    create: async (payload: { title: string; description: string; reward: string }) => {
    const response = await fetch(`${API_URL}/contracts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Failed to create contract");
    }
    return response.json();
  },

};

export const witcher = {
// Fetch witcher details by ID
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/witchers/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch witcher details");
    }

    return response.json();
  }
};