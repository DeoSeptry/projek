import React from "react";

export function useAuthBootstrap() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(true);
  }, []);

  return { ready };
}
