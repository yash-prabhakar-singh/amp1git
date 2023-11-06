import { Navigate } from "react-router-dom";
//import { useAuth } from "../hooks/useAuth";
import AuthService from "./AuthService";

export default function AuthenticatedRouteEst({ children }){
  
  if (!AuthService.isLoggedInEst()) {
    // user is not authenticated
    return <Navigate to="/est/login" />;
  }
  return children;
};