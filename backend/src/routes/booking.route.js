import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { createSlotBooking, deleteBooking, getBookingById, getBookingsForTurf, getMyBookings, updateBookingStatus } from "../controllers/booking.controller.js";

const router = Router();

//User Routes
// create slot booking
router.route("/slot/create-booking").post(verifyJWT, createSlotBooking);
// get my bookings
router.route("/my/get-bookings").get(verifyJWT, getMyBookings);

// Turf owner routes
// get bookings for turf
router.route("/turf/:turfId/get-bookings").get(verifyJWT, getBookingsForTurf);
// update booking status
router.route("/:id/update-status").put(verifyJWT, updateBookingStatus);

// common routes
// get booking by Id
router.route("/:id/get-booking").get(verifyJWT, getBookingById);
// delete turf
router.route("/:id/delete-booking").delete(verifyJWT, deleteBooking);
  
export default router;
            