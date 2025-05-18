import { tool } from 'ai';
import { z } from 'zod';
import {
  getUserProfile,
  getAllLocations,
  checkPhoneNumberHasUser,
  sendTextCode,
  verifyTextCode,
  getRecentAppointments,
  cancelAppointment,
  getAppointmentAvailability,
  rescheduleAppointment,
  scheduleAppointment,
} from '@/lib/api/danckuts';

export const danckutsTools = {
  getUserProfile: tool({
    description: 'Retrieve the authenticated user profile',
    parameters: z.object({ token: z.string() }),
    execute: async ({ token }) => getUserProfile(token),
  }),
  getAllLocations: tool({
    description: 'Get list of all salon locations',
    parameters: z.object({ token: z.string() }),
    execute: async ({ token }) => getAllLocations(token),
  }),
  checkPhoneNumberHasUser: tool({
    description: 'Check if a phone number has an account',
    parameters: z.object({ phoneNumber: z.string() }),
    execute: async ({ phoneNumber }) => checkPhoneNumberHasUser(phoneNumber),
  }),
  sendTextCode: tool({
    description: 'Send authentication text code',
    parameters: z.object({ phoneNumber: z.string() }),
    execute: async ({ phoneNumber }) => sendTextCode(phoneNumber),
  }),
  verifyTextCode: tool({
    description: 'Verify authentication text code',
    parameters: z.object({ phoneNumber: z.string(), code: z.string() }),
    execute: async ({ phoneNumber, code }) => verifyTextCode(phoneNumber, code),
  }),
  getRecentAppointments: tool({
    description: 'Retrieve user appointments',
    parameters: z.object({ token: z.string() }),
    execute: async ({ token }) => getRecentAppointments(token),
  }),
  cancelAppointment: tool({
    description: 'Cancel an appointment',
    parameters: z.object({ token: z.string(), appointmentId: z.number() }),
    execute: async ({ token, appointmentId }) =>
      cancelAppointment(token, appointmentId),
  }),
  getAppointmentAvailability: tool({
    description: 'Get appointment availability for location and dates',
    parameters: z.object({
      token: z.string(),
      location: z.string(),
      dates: z.array(z.string()).optional(),
    }),
    execute: async ({ token, location, dates }) =>
      getAppointmentAvailability(token, location, dates),
  }),
  rescheduleAppointment: tool({
    description: 'Reschedule an appointment',
    parameters: z.object({
      token: z.string(),
      appointmentId: z.string(),
      location: z.string(),
      time: z.string(),
    }),
    execute: async ({ token, appointmentId, location, time }) =>
      rescheduleAppointment(token, appointmentId, location, time),
  }),
  scheduleAppointment: tool({
    description: 'Schedule a new appointment',
    parameters: z.object({
      token: z.string(),
      location: z.string(),
      time: z.string(),
      dependentId: z.number().optional(),
      serviceType: z.string().optional(),
    }),
    execute: async ({ token, location, time, dependentId, serviceType }) =>
      scheduleAppointment(token, location, time, dependentId, serviceType),
  }),
  showOptions: tool({
    description: 'Render selectable options to the user',
    parameters: z.object({
      options: z.array(z.string()),
    }),
    execute: async ({ options }) => ({ options }),
  }),
};
