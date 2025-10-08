const API_BASE = 'http://localhost:3000/api';

export default {
  getAllLocations: async () => {
    const res = await fetch(`${API_BASE}/locations`);
    if (!res.ok) throw new Error('Failed to fetch locations');
    return res.json();
  }
};
