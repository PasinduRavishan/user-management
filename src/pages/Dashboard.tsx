import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>You are logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
