import { useEffect, useState } from "react";
import { getMyBookings } from "../services/api/bookingService";
import { useSelector } from "react-redux";
import BookingCard from "../components/BookingCard";

const MyBookings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBookings = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getMyBookings(currentUser?.accessToken);
        console.log(response.data.data);
        setBookings(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getBookings();
  }, [currentUser?.accessToken]);

  return (
  <div className="w-full max-w-6xl mx-auto px-4 py-6">
  {/* Page Heading */}
  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
    My Bookings
  </h1>

  {/* Loading & Error States */}
  {loading && <p className="text-gray-600">Loading...</p>}
  {error && <p className="text-red-500">Failed to fetch bookings</p>}

  {/* Bookings Grid */}
  {bookings && bookings.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  ) : (
    !loading && (
      <p className="text-gray-500 text-lg mt-4">No bookings found.</p>
    )
  )}
</div>
  );
};

export default MyBookings;
