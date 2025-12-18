import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { Navigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setHasProfile(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        const snap = await getDoc(doc(db, "users", currentUser.uid));
        setHasProfile(snap.exists());
      } catch {
        setHasProfile(false);
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  // 🔥 THIS IS THE IMPORTANT ADDITION
  useEffect(() => {
    if (!user) return;

    const recheckProfile = async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        setHasProfile(snap.exists());
      } catch {
        setHasProfile(false);
      }
    };

    recheckProfile();
  }, [location.pathname, user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" />;

  if (!hasProfile && location.pathname !== "/profile-setup") {
    return <Navigate to="/profile-setup" />;
  }

  if (hasProfile && location.pathname === "/profile-setup") {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
