import { useUserAuth } from "../context/UserAuthContext";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({children}) => {
    const { user }  = useUserAuth();
    const location = useLocation();
    
    if(!user){
        return <Navigate to="/sign-in" state={{path: location.pathname}} />
    }
    return children
}
