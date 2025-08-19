import { useSelector } from "react-redux";
import { formatTime } from "../utils/formatTime"
import { useNavigate } from "react-router-dom";

const TurfDetailsCard = ({turf}) => {
  const { currentUser } = useSelector((state) => state.user); 
  const navigate = useNavigate();

  return (
  <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 max-w-2xl mx-auto">
    {/* Dashboard-btn */}
     <div className="flex justify-end">
       {currentUser?.user?._id === turf?.ownerId?._id && (
          <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:from-green-600 hover:to-teal-700 transition duration-200 cursor-pointer w-fit mb-3 sm:mb-0 text-sm" onClick={() => navigate(`/turf/${turf._id}/dashboard`)}>
            Dashboard
          </button>
        )}
     </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center capitalize">
          {turf.name} Turf
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p className="capitalize">
            <span className="font-semibold">📍 Address: </span>
            {turf.address.street}, {turf.address.city}, {turf.address.state}
          </p>
          <p className="capitalize">
            <span className="font-semibold">💸 Price:</span> ₹{turf.pricePerHour}/hr
          </p>
          <p className="capitalize">
            <span className="font-semibold">🏀 Sports: </span>
            {turf.sportsTypes.join(", ")}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-left sm:flex-row sm:justify-between mt-3">
             <p className="capitalize">
            <span className="font-semibold">🕒 Opening Time: </span>
            {formatTime(turf.openingTime)}
          </p>
          <p className="capitalize">
            <span className="font-semibold">🕔 Closing Time: </span>
            {formatTime(turf.closingTime)}
          </p>
         </div>
      </div>
  )
}

export default TurfDetailsCard
