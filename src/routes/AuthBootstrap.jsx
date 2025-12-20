import React from "react";
import { useSelector } from "react-redux";
import { useRefreshTokenMutation } from "../services/authApi";
import { loadAuthUser } from "../utils/authStorage";
import { setSession } from "../store/authSlice";
import { useDispatch } from "react-redux";

export default function AuthBootstrap({ children }) {
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();
  const [ready, setReady] = React.useState(false);

  const accessToken = useSelector((s) => s.auth.accessToken);

  React.useEffect(() => {
    let mounted = true;

    async function run() {
      const stored = loadAuthUser();
      if (stored?.user && stored?.role) {
        dispatch(setSession({ user: stored.user, role: stored.role }));
      }

      if (!accessToken) {
        try {
          await refreshToken().unwrap();
        } catch {
        }
      }

      if (mounted) setReady(true);
    }

    run();
    return () => {
      mounted = false;
    };
  }, []); // jalan sekali

  if (!ready) return <p style={{ padding: 16 }}>Loading session...</p>;
  return children;
}
