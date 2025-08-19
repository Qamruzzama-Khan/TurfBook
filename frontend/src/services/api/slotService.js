import axios from "axios";
import { common_Url } from "../../utils/constants";

const api = axios.create({
  baseURL: `${common_Url}/slot`,
});

// Public Routes
// Get Slots For Turf
export const getSlotsForTurf = (turfId) => api.get(`/turf/${turfId}/get-slots`);

// Turf's Owner Routes
// Create Slots For Turf
export const createSlots = (token, turfId) =>
  api.post(
    "/create-slots",
    { turfId: turfId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// User's Routes
// Get Slot By Id
export const getSlotById = (token, slotId) =>
  api.get(`/${slotId}/get-slot`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
