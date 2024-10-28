import { Navigate } from "react-router-dom";
import { useAuthStore, useAdminStore } from "../store/store";
import { useEffect, useState } from "react";

export const AuthorizeUser = ({children}) => {
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}


export const ProtectRoute = ({ children}) => {
    const username = useAuthStore.getState().auth.username;
    if(!username){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children
}

export const ProtectedAdminRoute = ({ children }) => {
    const isAuthenticated = useAdminStore((state) => state.admin.isAuthenticated);
    const token = localStorage.getItem('admin_token');
  
    if (!isAuthenticated && !token) {
      return <Navigate to="/admin/login" replace />;
    }
  
    return children;
  };

// const validateToken = async (token) => {
//     // This function will send a request to validate the token
//     try {
//       const response = await fetch("admin/verify/admin", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       return data.isValid; // Return true if the token is valid
//     } catch (error) {
//       console.error("Token validation error", error);
//       return false;
//     }
//   };