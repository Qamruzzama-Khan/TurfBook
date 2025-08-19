import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { getTurfById } from "../services/api/turfService";
import Slots from "../components/Slots";
import { formatTime } from "../utils/formatTime";
import TurfDetailsCard from "../components/TurfDetailsCard";


const Turf = () => {
    const {turfId} = useParams();
      const [turf, setTurf] = useState();
      const [error, setError] = useState(false);
      const [loading, setLoading] = useState(false);
    
      useEffect(() => {
        const getTurf = async () => {
          try {
            setLoading(true);
            setError(false);
            const response = await getTurfById(turfId);
            console.log(response.data.data);
            setTurf(response.data.data);
            setLoading(false);
          } catch (error) {
            setError(true);
            setLoading(false);
          }
        };
        getTurf();
      }, []);

  return (
   <div className="container mx-auto px-4 py-6">
  {turf && (
    <div className="space-y-6">
      {/* Turf Details Card */}
      <TurfDetailsCard turf={turf} />

      {/* Slots Section */}
      <div className="bg-gray-50 rounded-2xl shadow-sm sm:p-6 max-w-6xl mx-auto">
        <Slots turfId={turf?._id} turfOwnerId={turf?.ownerId?._id} />
      </div>
    </div>
  )}
</div>
  )
}

export default Turf
