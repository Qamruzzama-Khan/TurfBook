import { Booking } from "../models/booking.model.js";
import { Slot } from "../models/slot.model.js";
import { Turf } from "../models/turf.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import generateSlots from "../utils/generateSlots.js";

const createSlots = AsyncHandler(async (req, res) => {
  const { turfId } = req.body;

  // Normalize the date (ignore time part)
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0];

  // Check if slots for this turf + date already exist
  const existingSlots = await Slot.findOne({
    turfId,
    date: formattedDate,
  });

  if (existingSlots) {
    throw new ApiError(400, "Today's slots are already created!");
  }

  // Check if turf exists & belongs to current owner
  const turf = await Turf.findById(turfId);
  if (!turf) {
    throw new ApiError(404, "Turf not found!");
  }
  if (turf.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to create slot for this turf!");
  }

  // Convert turf timings to today's date
  const opening = new Date();
  const [openingHour, openingMinute] = turf.openingTime.split(":");
  opening.setHours(openingHour, openingMinute, 0, 0);

  const closing = new Date();
  const [closingHour, closingMinute] = turf.closingTime.split(":");
  closing.setHours(closingHour, closingMinute, 0, 0);

  // Generate slots
  let slots = generateSlots(opening, closing);

  // console.log(slots);

  // Prepare docs for DB
  const slotDocs = slots.map((s) => ({
    turfId,
    date: formattedDate,
    startTime: s.startTime,
    endTime: s.endTime,
  }));

  // Insert all slots at once
  const savedSlots = await Slot.insertMany(slotDocs);

  return res
    .status(201)
    .json(new ApiResponse(201, savedSlots, "Slots created successfully."));
});

const getSlotsForTurf = AsyncHandler(async (req, res) => {
  const { date } = req.query;
  const query = { turfId: req.params.turfId };

  if (date) query.date = new Date(date);

  const slots = await Slot.find(query);
  return res
    .status(201)
    .json(new ApiResponse(201, slots, "Slots fetched successfully."));
});

const updateSlot = AsyncHandler(async (req, res) => {
  const slot = await Slot.findById(req.params.id).populate("turfId");
  if (!slot) {
    throw new ApiError(404, "Slot not found");
  }
  if (slot.turfId.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to update this slot!");
  }

  Object.assign(slot, req.body);
  await slot.save();

  return res
    .status(201)
    .json(new ApiResponse(201, slot, "Slot updated successfully."));
});

const deleteSlot = AsyncHandler(async (req, res) => {
  const slot = await Slot.findById(req.params.id).populate("turfId");
  if (!slot) {
    throw new ApiError(404, "Slot not found");
  }
  if (slot.turfId.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to delete this slot!");
  }

  await slot.deleteOne();

  return res
    .status(201)
    .json(new ApiResponse(201, "Slot deleted successfully."));
});

const getSlotById = AsyncHandler(async (req, res) => {
  const slot = await Slot.findById(req.params.id).populate("turfId", "name pricePerHour")

  if (!slot) {
    throw new ApiError(404, "Slot not found!")
  }

   return res.status(200).json(new ApiResponse(201, slot, "Slot fetched successfully."));
});

export { createSlots, getSlotsForTurf, updateSlot, deleteSlot, getSlotById };
