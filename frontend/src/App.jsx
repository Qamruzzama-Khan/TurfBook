import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MyBookings from "./pages/MyBookings";
import { useDispatch, useSelector } from "react-redux";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Turf from "./pages/Turf";
import Booking from "./pages/Booking";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { isTokenExpired } from "./utils/checkToken";
import { useEffect } from "react";
import { logout } from "./redux/user/userSlice";
import TurfDashboard from "./pages/TurfDashboard";
import { ToastContainer } from "react-toastify";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

    useEffect(() => {
    if (currentUser?.accessToken && isTokenExpired(currentUser?.accessToken)) {
      dispatch(logout()); // clear redux + localStorage
    }
  }, [currentUser?.accessToken, dispatch]);

  return (
    <>
       <Router>
      <Navbar />
      {/* toast-container */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="text-sm md:text-md"
        />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/turf/:turfId/get-turf" element={<Turf />} />

        <Route
          path="/register"
          element={
            !currentUser ? <Register /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/login"
          element={
            !currentUser ? <Login /> : <Navigate to="/" replace />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/my/bookings"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
           currentUser ? <Profile /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/slot/:slotId/booking"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Booking />
            </ProtectedRoute>
          }
        />
        {/* Turf's Owner Routes */}
        <Route
          path="/turf/:turfId/dashboard"
          element={
            currentUser && currentUser?.user?._id === "689f46051529035f06ba6dc5" ? <TurfDashboard /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
    </>
  );
}

export default App;
