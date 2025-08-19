import { useNavigate } from "react-router-dom";
import { formatTime } from "../utils/formatTime";

const SlotCard = ({slot}) => {
     const navigate = useNavigate();

  return (
    <div
      className="border border-gray-400 rounded-2xl shadow-md p-4 flex flex-col justify-between bg-white hover:shadow-lg transition duration-200"
    >
      <div className="flex flex-col gap-2 text-gray-700">
        <p className="text-lg font-medium">
          ⏰ {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
        </p>
        <p
          className={`text-sm font-semibold ${
            slot.isBooked ? "text-red-500" : "text-green-600"
          }`}
        >
          {slot.isBooked ? "Booked" : "Available"}
        </p>
      </div>

      {/* Book button */}
      <button
        onClick={() => navigate(`/slot/${slot._id}/booking`)}
        disabled={slot.isBooked}
        className={`mt-4 py-2 px-4 rounded-xl text-white font-semibold transition duration-200 ${
          slot.isBooked
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 cursor-pointer"
        }`}
      >
        {slot.isBooked ? "Booked!" : "Book Now"}
      </button>
    </div>
  );
};

export default SlotCard;
