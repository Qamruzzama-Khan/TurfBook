import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

// register
router.route("/register").post(register);

// login
router.route("/login").post(login);
  
export default router;
            