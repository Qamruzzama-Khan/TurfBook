import { useEffect, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/user/userSlice";
import { login } from "../services/api/authService";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
        dispatch(clearError())
      }, [])

  const TogglePass = () => {
    setShowPass(!showPass);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const response = await login(form);
      dispatch(loginSuccess(response.data.data));
      setForm({ email: "", password: "" });
      // get the "from" state if available, otherwise fallback to "/"
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      dispatch(loginFailure(error.response.data.message));
    }
  };

  return (
    <div className="space-y-2 p-2 w-full mx-auto sm:w-[50%] mt-7">
      <h1 className="text-center">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2 w-full"
      >
        {/* Email */}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="border border-gray-300 bg-white py-2 px-4 rounded-lg w-full focus:outline-none"
        />
        {/* Password */}
        <div className="border border-gray-300 bg-white py-2 px-4 rounded-lg w-full flex items-center justify-between">
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="focus:outline-none w-full"
          />
          <button
            type="button"
            className="text-xl text-gray-500 hover:text-gray-600 cursor-pointer"
            onClick={TogglePass}
          >
            {" "}
            {showPass ? <MdVisibility /> : <MdVisibilityOff />}
          </button>
        </div>
        {/* Error */}
        {error && (
          <div className="text-red-600">
            {error ? error : "Something went wrong!"}...!
          </div>
        )}
        {/* Submit btn */}
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-3 rounded-lg font-semibold shadow-md hover:from-green-600 hover:to-teal-700 transition duration-200 cursor-pointer w-full"
        >
          {loading ? "Login..." : "Login"}
        </button>
      </form>
      <p>
        If you dont't have an account?{" "}
        <Link to="/register" className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent font-semibold hover:text-green-700">
          register
        </Link>
      </p>
    </div>
  );
};

export default Login;
