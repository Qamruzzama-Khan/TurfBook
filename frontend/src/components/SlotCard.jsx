import { useNavigate } from "react-router-dom";
import { formatTime } from "../utils/formatTime";
import { useEffect, useState } from "react";
import { parse } from "date-fns";

const SlotCard = ({ slot }) => {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const now = new Date();
    // Parse "10:30 PM" into a Date for today
    const end = parse(slot.endTime, "HH:mm", now);

    if (end > now) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  }, []);

  return (
    <div className="border border-gray-400 rounded-2xl shadow-md p-4 flex flex-col justify-between bg-white hover:shadow-lg transition duration-200">
      <div className="flex flex-col gap-2 text-gray-700">
        <p className="text-lg font-medium">
          ⏰ {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
        </p>
        <p
          className={`font-semibold ${!isAvailable ? "text-red-500" :
            slot.isBooked ? "text-gray-600" : "text-green-600"
          }`}
        >
          {!isAvailable ? "Expired!" : slot.isBooked ? "Booked" : "Available"}
        </p>
      </div>

      {/* Book button */}
       <button
          onClick={() => navigate(`/slot/${slot._id}/booking`)}
          disabled={slot.isBooked || !isAvailable}
          className={`mt-4 py-2 px-4 rounded-xl text-white font-semibold transition duration-200 ${!isAvailable ? "bg-red-500 cursor-not-allowed" : 
            slot.isBooked
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 cursor-pointer"
          }`}
        >
           {!isAvailable ? "Expired!" : slot.isBooked ? "Booked" : "Book Now"}
        </button>
    </div>
  );
};

export default SlotCard;
