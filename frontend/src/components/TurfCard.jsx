import { useNavigate } from "react-router-dom";
import { formatTime } from "../utils/formatTime";
import { useSelector } from "react-redux";

const TurfCard = ({ turf }) => {
  const navigate = useNavigate();

  return (
    <li
      key={turf._id}
      className="p-6 border border-gray-400 rounded-2xl shadow-sm hover:shadow-lg transition bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      {/* Turf Info */}
      <div className="space-y-2">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 capitalize">
          {turf.name} Turf
        </h2>
        <button>Dashboard</button>
        <p className="text-gray-600 text-sm capitalize">
          📍 {turf.address.street}, {turf.address.city}, {turf.address.state}
        </p>
        <p className="text-gray-700 text-sm capitalize">
          🏀 Sports:
          <span className="font-medium"> {turf.sportsTypes.join(", ")}</span>
        </p>
        <p className="text-gray-700 text-sm capitalize">
          💸 Price:{" "}
          <span className="font-semibold">₹{turf.pricePerHour}/hr</span>
        </p>
        <p className="text-gray-700 text-sm">
          ⏰ {formatTime(turf.openingTime)} - {formatTime(turf.closingTime)}
        </p>
      </div>

      {/* Checkout Button */}
      <div className="flex-shrink-0">
        <button
          onClick={() => navigate(`/turf/${turf._id}/get-turf`)}
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:from-green-600 hover:to-teal-700 transition duration-200 cursor-pointer"
        >
          Checkout
        </button>
      </div>
    </li>
  );
};

export default TurfCard;
