import React from "react";
import { useDispatch } from "react-redux";
import { loadAuthUser } from "../utils/authStorage";
import { setSession } from "../store/authSlice";
import { useRefreshTokenMutation } from "../services/api/auth.api";

export default function AuthBootstrap({ children }) {
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        // 1) restore user + role dari localStorage
        const stored = loadAuthUser();
        if (stored?.user && stored?.role) {
          dispatch(setSession({ user: stored.user, role: stored.role }));
        }
        await refreshToken().unwrap();
      } catch {
        // kalau gagal refresh, biarin -> user dianggap belum login
      } finally {
        if (mounted) setReady(true);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch, refreshToken]);

  if (!ready) return <p style={{ padding: 16 }}>Loading session...</p>;
  return children;
}
