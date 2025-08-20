import { useEffect, useState } from "react";
import { parse, isBefore, format, isToday } from "date-fns";
import { formatTime } from "../utils/formatTime";
import { getSlotTimeLeft } from "../utils/slotTimer";

const BookingCard = ({ booking }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (booking?.slotId?.startTime && booking?.slotId?.endTime) {
        setTimeLeft(
          getSlotTimeLeft(booking.slotId.startTime, booking.slotId.endTime)
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [booking.slotId]);

  return (
    <div className="w-full sm:w-[350px] bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-3 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-bold text-green-600">Booking Details</h2>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            booking.status === "confirmed"
              ? "bg-green-100 text-green-600"
              : booking.status === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {booking.status}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 text-gray-700 text-sm sm:text-base">
        <p>
          <span className="font-semibold text-gray-900">Booking Id:</span>{" "}
          {booking._id}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Amount Paid:</span> ₹
          {booking.amount}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Start Time:</span>{" "}
          {formatTime(booking.slotId?.startTime)}
        </p>
        <p>
          <span className="font-semibold text-gray-900">End Time:</span>{" "}
          {formatTime(booking.slotId?.endTime)}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t flex justify-between items-center">
        <span className="text-black font-semibold text-sm">{timeLeft}</span>
        <p>
          {booking.slotId?.date &&
            (isToday(new Date(booking.slotId.date))
              ? "Today"
              : format(new Date(booking.slotId.date), "dd MMM yyyy"))}
        </p>
      </div>
    </div>
  );
};

export default BookingCard;

// Helper function to format seconds into hh:mm:ss
function formatNewTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h > 0 ? h + "h " : ""}${m}m ${s}s`;
}
