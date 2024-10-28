import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import React, { useEffect } from "react";

// import SignUp from './components/SignUp/SignUp';
// import SignIn from './components/SignIn/SignIn'
import Index from "./pages/Index/Index";
import {
  ProtectedAdminRoute,
} from "./middleware/auth";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import { useAdminStore, useAuthStore } from "./store/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Index />} />
      {/* <Route path="/register" element={<SignUp />} /> */}
      {/* <Route path="/password" element={<SignIn />} /> */}
      {/* <Route path="/profile" element={<AuthorizeUser><Profile /></AuthorizeUser>} /> */}
      {/* <Route path="/reset" element={<Reset />} /> */}
      {/* <Route path="/recovery" element={<Recovery />} /> */}
      {/* <Route path="/pagenotfound" element={<PageNotFound />} /> */}

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            {" "}
            <AdminDashboard />{" "}
          </ProtectedAdminRoute>
        }
      />
    </Route>
  )
);

function App() {

  // const loginAdmin = useAdminStore((state) => state.loginAdmin); // Zustand action to log in

  // useEffect(() => {
  //   // Check if a token is stored in localStorage
  //   const token = localStorage.getItem("admin_token");

  //   if (token) {
  //     // Assuming you might want to store other admin details like email, you can update this part
  //     const email = "stored-email@example.com"; // Replace with logic to fetch actual admin email if needed
  //     loginAdmin(email); // Rehydrate Zustand store with authentication state
  //   }
  // }, [loginAdmin]); // Only run this effect once on initial load

  const setUsername = useAuthStore((state) => state.setUsername);
  const setToken = useAuthStore((state) => state.setToken);

  const loginAdmin = useAdminStore((state) => state.loginAdmin);

  useEffect(() => {
    // Rehydrate user state from localStorage
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
      setToken(token); // Rehydrate token for user
      setUsername(username); // Rehydrate username for user
    }

    // Rehydrate admin state from localStorage
    const adminToken = localStorage.getItem('admin_token');

    if (adminToken) {
      const email = "stored-email@example.com"; // Replace with logic to fetch actual admin email if needed
      loginAdmin(email); // Rehydrate admin auth state
    }

  }, [setToken, setUsername, loginAdmin]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
