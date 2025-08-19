import axios from "axios"
import { common_Url } from "../../utils/constants"

const api = axios.create({
    baseURL: `${common_Url}/auth`
});

// Register
export const register = (data) => api.post("/register", data);

// Login
export const login = (data) => api.post("/login", data);