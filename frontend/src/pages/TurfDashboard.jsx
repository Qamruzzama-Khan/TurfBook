import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookingsForTurf } from "../services/api/bookingService";
import { useParams } from "react-router-dom";

const TurfDashboard = () => {
  const {turfId} = useParams();
    const { currentUser } = useSelector((state) => state.user);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const getBookings = async () => {
        try {
          setLoading(true);
          setError(false);
          const response = await getBookingsForTurf(currentUser?.accessToken, turfId);
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
   <div className="p-5">
    <h1 className="py-4 text-lg ">Bookings</h1>
     <div className="overflow-x-auto">
      {bookings && bookings.length > 0 ? (
        <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {/* <th className="px-4 py-2 border">Booking ID</th> */}
            <th className="px-4 py-2 border">Sr.No</th>
            <th className="px-4 py-2 border">User</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Payment ID</th>
            <th className="px-4 py-2 border">Slot</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
         {bookings.map((booking, index) => (
           <tr key={booking._id} className="text-center">
            {/* <td className="px-4 py-2 border">{booking._id}</td> */}
            <td className="px-4 py-2 border">{index + 1}</td>
            <td className="px-4 py-2 border">{booking.userId?.name}</td>
            <td className="px-4 py-2 border">{booking.userId?.email}</td>
            <td className="px-4 py-2 border">₹{booking.amount}</td>
            <td className="px-4 py-2 border">{booking.paymentId}</td>
            <td className="px-4 py-2 border">
              {booking.slotId?.date?.slice(0, 10)} <br />
              {booking.slotId?.startTime} - {booking.slotId?.endTime}
            </td>
            <td
              className={`px-4 py-2 border font-semibold ${
                booking.status === "confirmed"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {booking.status}
            </td>
             <td className="px-4 py-2 border">
              <button>Delete</button>
             </td>
          </tr>
         ))}
        </tbody>
      </table>
      ) : (
        <p>No bookings found...</p>
      )}
    </div>
   </div>
  )
}

export default TurfDashboard
