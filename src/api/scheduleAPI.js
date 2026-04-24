const API_BASE_URL = 'https://ontimeclock.onrender.com/api';
const SYSTEM_CONFIG_URL = `${API_BASE_URL}/systemconfig`;

export const scheduleAPI = {
  getSchedules: async () => {
    const response = await fetch(`${API_BASE_URL}/schedules`);
    if (!response.ok) throw new Error('Failed to fetch schedules');
    return response.json();
  },

  getTeachers: async () => {
    const response = await fetch(`${API_BASE_URL}/schedules/data/teachers`);
    if (!response.ok) throw new Error('Failed to fetch teachers');
    return response.json();
  },

  createSchedule: async (scheduleData) => {
    const response = await fetch(`${API_BASE_URL}/schedules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scheduleData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create schedule');
    }
    return response.json();
  },

  getScheduleById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/schedules/${id}`);
    if (!response.ok) throw new Error('Failed to fetch schedule');
    return response.json();
  },

  updateSchedule: async (id, scheduleData) => {
    const response = await fetch(`${API_BASE_URL}/schedules/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scheduleData),
    });
    if (!response.ok) throw new Error('Failed to update schedule');
    return response.json();
  },

  deleteSchedule: async (id) => {
    const response = await fetch(`${API_BASE_URL}/schedules/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete schedule');
  },

  getSchedulesByTeacher: async (teacherId) => {
    const response = await fetch(`${API_BASE_URL}/schedules/teacher/${teacherId}`);
    if (!response.ok) throw new Error('Failed to fetch schedules by teacher');
    return response.json();
  },

  getClosedDays: async () => {
    const response = await fetch(`${SYSTEM_CONFIG_URL}/closed-days`);
    if (!response.ok) throw new Error('Failed to fetch closed days');
    return response.json();
  },

  createClosedDay: async (closedDayData) => {
    const response = await fetch(`${SYSTEM_CONFIG_URL}/closed-days`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(closedDayData),
    });
    if (!response.ok) throw new Error('Failed to create closed day');
    return response.json();
  },

  deleteClosedDay: async (id) => {
    const response = await fetch(`${SYSTEM_CONFIG_URL}/closed-days/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete closed day');
  },
};

