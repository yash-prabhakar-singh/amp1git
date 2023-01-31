import { Navigate } from "react-router-dom";
//import { useAuth } from "../hooks/useAuth";
import AuthService from "./AuthService";

export default function AuthenticatedRoute({ children }){
  
  if (!AuthService.isLoggedIn()) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};