import {jwtDecode} from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true; // no token means "expired"

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds

    return decoded.exp < currentTime; // true if expired
  } catch (error) {
    return true; // invalid token = treat as expired
  }
};