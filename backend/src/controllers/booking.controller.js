import { Booking } from "../models/booking.model.js";
import { Slot } from "../models/slot.model.js";
import { Turf } from "../models/turf.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const createSlotBooking = AsyncHandler(async (req, res) => {
  const { slotId, amount } = req.body;

  if (!slotId || !amount) {
    throw new ApiError(400, "Please fill all fields.");
  }

  // Check if slot exists
  const slot = await Slot.findById(slotId);
  if (!slot) {
    throw new ApiError(404, "Slot not found!");
  }

  // Check if slot is already booked
  if (slot.isBooked) {
    throw new ApiError(400, "Slot already booked!");
  }
  
  // Create booking
  const booking = await Booking.create({
    userId: req.user._id,
    turfId: slot.turfId,
    slotId,
    date: slot.date,
    amount,
    paymentId: "xyz",
    status: "confirmed", // or "pending" if waiting for payment verification
  });

  // Mark slot as booked
  slot.isBooked = true;
  slot.bookingId = booking._id;
  await slot.save();

  return res
    .status(201)
    .json(new ApiResponse(201, booking, "Booking created successfully."));
});

const getMyBookings = AsyncHandler(async (req, res) => {
  const bookings = await Booking.find({ userId: req.user._id })
    .populate("turfId", "name address")
    .populate("slotId", "startTime endTime date")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(201, bookings, "My bookings fetched successfully."));
});

const getBookingsForTurf = AsyncHandler(async (req, res) => {
  const turf = await Turf.findById(req.params.turfId);
  if (!turf) {
    throw new ApiError(404, "Turf not found!");
  }

  // Only turf owner can view
  if (turf.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized!");
  }

  const bookings = await Booking.find({ turfId: req.params.turfId })
    .populate("userId", "name email")
    .populate("slotId", "startTime endTime date")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(201, bookings, "Bookings for turf fetched successfully.")
    );
});

const getBookingById = AsyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("userId", "name email")
    .populate("turfId", "name address")
    .populate("slotId", "startTime endTime date");

  if (!booking) {
    throw new ApiError(404, "Booking not found!");
  }

  // Allow if booking belongs to user OR turf owner
  if (
    booking.userId._id.toString() !== req.user._id.toString() &&
    booking.turfId.ownerId?.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "Not authorized!");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, booking, "Booking fetched successfully."));
});

const updateBookingStatus = AsyncHandler(async (req, res) => {
  const { status } = req.body; // confirmed / cancelled / pending
  const booking = await Booking.findById(req.params.id).populate("turfId");

  if (!booking) {
    throw new ApiError(404, "Booking not found!");
  }

  if (booking.turfId.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized!");
  }

  booking.status = status;

  // Free the slot if cancelled
  if (status === "cancelled") {
    const slot = await Slot.findById(booking.slotId);
    slot.isBooked = false;
    slot.bookingId = null;
    await slot.save();
  }

  await booking.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, booking, "Booking status updated successfully.")
    );
});

const deleteBooking = AsyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("turfId");

  if (!booking) {
    throw new ApiError(404, "Booking not found!");
  }

  // Allow if booking belongs to user OR turf owner
  if (
    booking.userId.toString() !== req.user._id.toString() &&
    booking.turfId.ownerId.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "Not authorized!");
  }

  // Free slot if deleting a confirmed booking
  const slot = await Slot.findById(booking.slotId);
  if (slot) {
    slot.isBooked = false;
    slot.bookingId = null;
    await slot.save();
  }

  await booking.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, "Booking deleted successfully."));
});

export {
  createSlotBooking,
  getMyBookings,
  getBookingsForTurf,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
};
