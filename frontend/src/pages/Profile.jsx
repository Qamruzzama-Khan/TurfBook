import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/user/userSlice";

const Profile = () => {
  const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logout())
    }

  return (
     <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 text-center border border-gray-300 mx-auto mt-20">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">
      Your <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">Profile</span>
    </h1>

    {currentUser && (
      <div className="space-y-4">
        {/* Profile Avatar */}
        <div className="flex justify-center">
          <div className="w-15 h-15 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white text-3xl font-bold shadow-md capitalize">
            {currentUser?.user?.name?.charAt(0)}
          </div>
        </div>

        {/* User Info */}
        <div className="text-gray-700">
          <p className="text-lg font-semibold">{currentUser?.user?.name}</p>
          <p className="text-sm text-gray-500">{currentUser?.user?.email}</p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium shadow-md hover:from-green-600 hover:to-teal-700 transition duration-300 cursor-pointer"
        >
          Logout
        </button>
      </div>
    )}
  </div>
  )
}

export default Profile
