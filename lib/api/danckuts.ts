const BASE_URL = process.env.DANCKUTS_API_BASE_URL || 'http://atlas.danckuts.com';

async function request(path: string, options: RequestInit = {}, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    throw new Error(`Danckuts API error: ${res.status}`);
  }
  return res.json();
}

export async function getUserProfile(token: string) {
  return request('/api/auth/me', { method: 'GET' }, token);
}

export async function getAllLocations(token: string) {
  return request('/api/locations/hidden', { method: 'GET' }, token);
}

export async function checkPhoneNumberHasUser(phoneNumber: string) {
  return request('/api/auth/phone-number-has-user', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber }),
  });
}

export async function sendTextCode(phoneNumber: string) {
  return request('/api/auth/send-text-code', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber }),
  });
}

export async function verifyTextCode(phoneNumber: string, code: string) {
  return request('/api/auth/check-text-code', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber, code }),
  });
}

export async function getRecentAppointments(token: string) {
  return request('/api/appointments/recent', { method: 'GET' }, token);
}

export async function cancelAppointment(token: string, appointmentId: number) {
  return request(
    '/api/appointments/cancel',
    {
      method: 'POST',
      body: JSON.stringify({ appointmentId }),
    },
    token,
  );
}

export async function getAppointmentAvailability(
  token: string,
  location: string,
  dates?: string[],
) {
  const params = new URLSearchParams();
  params.set('location', location);
  if (dates) {
    for (const d of dates) params.append('dates', d);
  }
  return request(`/api/time/availability?${params.toString()}`, { method: 'GET' }, token);
}

export async function rescheduleAppointment(
  token: string,
  appointmentId: string,
  location: string,
  time: string,
) {
  return request(
    '/api/appointments/reschedule',
    {
      method: 'POST',
      body: JSON.stringify({ appointmentId, location, time }),
    },
    token,
  );
}

export async function scheduleAppointment(
  token: string,
  location: string,
  time: string,
  dependentId?: number,
  serviceType?: string,
) {
  return request(
    '/api/appointments/schedule',
    {
      method: 'POST',
      body: JSON.stringify({ location, time, dependentId, serviceType }),
    },
    token,
  );
}
