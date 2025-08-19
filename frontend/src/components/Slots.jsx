import { useEffect } from "react";
import { createSlots, getSlotsForTurf } from "../services/api/slotService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatTime } from "../utils/formatTime";
import SlotCard from "./SlotCard";

const Slots = ({ turfId, turfOwnerId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [slots, setSlots] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    const getTurf = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getSlotsForTurf(turfId);
        console.log(response.data.data);
        setSlots(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getTurf();
  }, []);

  const onGenerateSlots = async () => {
    try {
      setError("");
      setIsGenerating(true);
      const response = await createSlots(currentUser?.accessToken, turfId);
      console.log(response.data.data);
      setSlots(response.data.data);
      setIsGenerating(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full px-4 py-6 md:px-8 lg:px-16">
      {/* Title */}
      {slots && slots.length > 0 && (
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          Today's Slots
        </h1>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-600">
          {error ? error : "Something went wrong!"}...!
        </div>
      )}

      {/* Slots container */}
      {slots && (
        <div className="flex flex-col gap-4">
          {slots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot) => (
                <SlotCard key={slot._id} slot={slot} />
              ))}
            </div>
          ) : (
             currentUser?.user?._id === turfOwnerId && (
               <button
                onClick={onGenerateSlots}
                disabled={isGenerating}
                className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:from-green-600 hover:to-teal-700 transition duration-200 cursor-pointer w-fit mx-auto"
              >
                {isGenerating ? "Generating..." : "Generate Slots"}
              </button>
             )
          )}
        </div>
      )}
    </div>
  );
};

export default Slots;
