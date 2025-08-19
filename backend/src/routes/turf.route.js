import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { createTurf, deleteTurf, getAllTurfs, getTurfById, updateTurf } from "../controllers/turf.controller.js";

const router = Router();

// Public routes
// get all turfs
router.route("/get-turfs").get(getAllTurfs);

// get turf by Id
router.route("/:id/get-turf").get(getTurfById);

// Protected routes
// create turf
router.route("/create-turf").post(verifyJWT, createTurf);

// update turf
router.route("/:id/update-turf").put(verifyJWT, updateTurf);

// delete turf
router.route("/:id/delete-turf").delete(verifyJWT, deleteTurf);
  
export default router;
            