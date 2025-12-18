import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { uploadProfileImage } from "../services/storage";
import { getFunctions, httpsCallable } from "firebase/functions";

export default function ProfileSetup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const functions = getFunctions();
  const updateProfile = httpsCallable(functions, "updateUserProfile");

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);

    try {
      let photoURL: string | null = null;

      
      if (file) {
        photoURL = await uploadProfileImage(file);
      }

      
      await updateProfile({
        firstName,
        lastName,
        photoURL,
      });

      
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      console.error("Profile update failed:", error);
      alert(
        error?.message ||
        error?.details ||
        JSON.stringify(error)
      );
}
   finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>

      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
