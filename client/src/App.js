import React, { useEffect, useState } from "react";
import "./index.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import AddNewStudent from "./pages/AddNewStudent";
import { UserContextProvider } from "./contexts/UserContext";
import EditStudent from "./pages/EditStudent";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("username"))
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const handleLogin = () => {
    setIsLoggedIn(true); // Update the state after logging in
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false); // Update the state after clearing localStorage
  };

  // Watch for changes in `localStorage` and update state accordingly
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("username")));
    };

    // Listen to storage changes (useful if multiple tabs are open)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  console.log("user from app", user);

  return (
    <UserContextProvider value={user}>
      <Router>
        {isLoggedIn && <Navbar handleLogout={handleLogout} />}
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route exact path="/signup" element={<Signup />} />
              <Route
                exact
                path="/"
                element={<SignIn handleLogin={handleLogin} setUser={setUser} />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route exact path="/addNewStudent" element={<AddNewStudent />} />
              <Route exact path="/student/:id" element={<EditStudent />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              {/* Redirect to Dashboard by default */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
