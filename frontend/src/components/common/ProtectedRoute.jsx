import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({children, currentUser}) => {
    const location = useLocation();

    if(!currentUser){
        // redirect to login, but remember current location
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}

export default ProtectedRoute
