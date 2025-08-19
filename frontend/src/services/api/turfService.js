import axios from "axios"
import { common_Url } from "../../utils/constants"

const api = axios.create({
    baseURL: `${common_Url}/turf`
});

// Public Routes
// Get All Turfs
export const getAllTurfs = () => api.get("/get-turfs");
// Get Turf By Id
export const getTurfById = (turfId) => api.get(`/${turfId}/get-turf`);