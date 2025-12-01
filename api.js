const API_BASE_URL = 'http://localhost:3001/api';

export const apiService = {
  // Jobs
  async getJobs() {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    return await response.json();
  },

  async createJob(jobData) {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });
    return await response.json();
  },

  // Users
  async updateUserProfile(userId, profileData) {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ...profileData })
    });
    return await response.json();
  }
};