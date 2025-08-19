import axios from "axios"
import { common_Url } from "../../utils/constants"

const api = axios.create({
    baseURL: `${common_Url}/booking`
});

// User Routes
// Create Slot Booking 
export const createSlotBooking = (token, data) => api.post("/slot/create-booking", data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

// Get My Bookings 
export const getMyBookings = (token) => api.get("/my/get-bookings", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

// Turf's Owner Route
// Get Bookings For Turf
export const getBookingsForTurf = (token, turfId) => api.get(`/turf/${turfId}/get-bookings`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
      