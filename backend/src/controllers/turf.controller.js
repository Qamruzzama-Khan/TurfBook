import { Turf } from "../models/turf.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const createTurf = AsyncHandler(async (req, res) => {
  const { name, address } = req.body;

  //Check if all required address fields are present
  if (!name || !address?.city || !address?.street || !address?.state) {
    throw new ApiError(400, "Name, street, city, and state are required.");
  }

  //Check if turf already exists
  const existingTurf = await Turf.findOne({
    name: name.trim(),
    ownerId: req.user._id,
  });

  if (existingTurf) {
    throw new ApiError(409, "You already have a turf with this name.");
  }

  const turfData = { ...req.body, ownerId: req.user._id };
  const turf = await Turf.create(turfData);

  return res.status(201).json(new ApiResponse(201, turf, "Turf created."));
});

const getAllTurfs = AsyncHandler(async (req, res) => {
  const {
    city,
    sport,
    minPrice,
    maxPrice,
    search,
    page = 1,
    limit = 10,
  } = req.query;

  let query = {};

  if (city) query["address.city"] = city;
  if (sport) query.sportsTypes = { $in: [sport] };
  if (minPrice || maxPrice) {
    query.pricePerHour = {};
    if (minPrice) query.pricePerHour.$gte = Number(minPrice);
    if (maxPrice) query.pricePerHour.$lte = Number(maxPrice);
  }
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const turfs = await Turf.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Turf.countDocuments(query);

  return res.status(201).json(new ApiResponse(201, turfs, "Turfs."));
});

const getTurfById = AsyncHandler(async (req, res) => {
  const turf = await Turf.findById(req.params.id).populate("ownerId", "name");

  if (!turf) {
    throw new ApiError(404, "Turf not found!");
  }

  return res.status(201).json(new ApiResponse(201, turf, "Turf."));
});

const updateTurf = AsyncHandler(async (req, res) => {
  const turf = await Turf.findById(req.params.id);

  if (!turf) {
    throw new ApiError(404, "Turf not found!");
  }

  // Check ownership
  if (turf.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized!");
  }

  Object.assign(turf, req.body);
  await turf.save();

  return res.status(201).json(new ApiResponse(201, turf, "Turf updated."));
});

const deleteTurf = AsyncHandler(async (req, res) => {
  const turf = await Turf.findById(req.params.id);

  if (!turf) {
    throw new ApiError(404, "Turf not found!");
  }

  // Check ownership
  if (turf.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized!");
  }

  await turf.deleteOne();

  return res.status(201).json(new ApiResponse(201, "Turf deleted."));
});

export { createTurf, getAllTurfs, getTurfById, updateTurf, deleteTurf };
