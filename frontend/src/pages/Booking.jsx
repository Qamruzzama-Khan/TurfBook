import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSlotBooking } from "../services/api/bookingService";
import { useSelector } from "react-redux";
import { getSlotById } from "../services/api/slotService";
import { formatTime } from "../utils/formatTime";
import { toast } from "react-toastify";

const Booking = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { slotId } = useParams();
  const [slot, setSlot] = useState();
  const [form, setForm] = useState({
    slotId,
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getSlot = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getSlotById(currentUser?.accessToken, slotId);
        console.log(response.data.data);
        setSlot(response.data.data);
        setForm({ ...form, amount: response.data.data.turfId.pricePerHour });
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getSlot();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setIsSubmitting(true);
      const response = await createSlotBooking(currentUser?.accessToken, form);
      console.log(response.data.data);
       toast(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      setIsSubmitting(false);
      navigate("/my/bookings");
    } catch (error) {
      setError(error.response.data.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-gray-400 max-w-md mx-auto bg-white shadow-lg rounded-2xl mt-15 p-6">
      {slot && (
        <div className="flex flex-col items-center gap-2 border border-gray-300 rounded-2xl p-2">
          {/* Turf Name */}
          <h2 className="text-xl font-semibold text-gray-800 text-center capitalize">
            {slot?.turfId?.name} Turf
          </h2>
          {/* Price */}
          <p className="text-gray-700 text-sm capitalize">
            💸 Price:{" "}
            <span className="font-semibold">
              ₹{slot?.turfId?.pricePerHour}/hr
            </span>
          </p>
          {/* Slot Time */}
          <p>
            ⏰ {formatTime(slot?.startTime)} - {formatTime(slot?.endTime)}
          </p>
        </div>
      )}
      {/* Total Amount */}
      <p className="py-3"><strong>Total Amount:</strong> {form.amount}₹</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount */}
        {/* <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Total Amount
          </label>
          <input
            id="amount"
            type="string"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            placeholder="Enter amount"
            required
          />
        </div> */}
        

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error ? error : "Something went wrong!"}...!
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-2 rounded-lg shadow-md transition cursor-pointer"
        >
          {isSubmitting ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default Booking;
