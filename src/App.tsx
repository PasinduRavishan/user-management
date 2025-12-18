import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/Dashboard";
import AuthGuard from "./components/AuthGuard";
import { auth } from "./firebase";
import "./App.css";
import ProfileSetup from "./pages/ProfileSetup";

function App() {
  console.log("Firebase Auth:", auth);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile-setup"
        element={
          <AuthGuard>
            <ProfileSetup />
          </AuthGuard>
        }
      />

      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        }
      />
    </Routes>
  );
}

export default App;
