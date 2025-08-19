import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { createSlots, deleteSlot, getSlotById, getSlotsForTurf, updateSlot } from "../controllers/slot.controller.js";

const router = Router();

// Public routes
// get slots for turf
router.route("/turf/:turfId/get-slots").get(getSlotsForTurf);

// User Routes
// get slot by Id
router.route("/:id/get-slot").get(verifyJWT, getSlotById);

// Protected routes    
// create slot
router.route("/create-slots").post(verifyJWT, createSlots);

// update slot
router.route("/:id/update-slot").put(verifyJWT, updateSlot);

// delete slot
router.route("/:id/delete-slot").delete(verifyJWT, deleteSlot);
  
export default router;
            