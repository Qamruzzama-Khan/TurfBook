import { useState } from "react";
import { getAllTurfs } from "../services/api/turfService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TurfCard from "./TurfCard";

const Turfs = () => {
    const [turfs, setTurfs] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    const getTurfs = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getAllTurfs();
        console.log(response.data.data);
        setTurfs(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getTurfs();
  }, []);

  return (
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {/* Heading */}
  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
    🏟️ Available Turfs
  </h1>

  {loading ? (
    <div className="flex justify-center items-center py-10">
      <p className="text-gray-600 animate-pulse">Loading...</p>
    </div>
  ) : (
    <div>
      {turfs.length === 0 ? (
        <p className="text-center text-gray-500">No turfs available.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {turfs.map((turf) => (
            <TurfCard key={turf._id} turf={turf} />
          ))}
        </ul>
      )}
    </div>
  )}
</div>
  )
}

export default Turfs
