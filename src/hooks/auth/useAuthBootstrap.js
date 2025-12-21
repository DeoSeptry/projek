import React from "react";
import { useRefreshTokenMutation } from "../../services/api/auth.api";

export function useAuthBootstrap() {
  const [refreshToken] = useRefreshTokenMutation();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let alive = true;

    (async () => {
      try {
        await refreshToken().unwrap();
      } catch {
        // user belum login / refresh expired
      } finally {
        if (alive) setReady(true);
      }
    })();

    return () => {
      alive = false;
    };
  }, [refreshToken]);

  return { ready };
}
