import React, { lazy, useEffect, useState } from "react";

export const Landing = () => {
  //   const MFLanding = useMFHook<any>({ path: "streamLanding/StreamLanding" });
  //   return <MFLanding />;
  const [Component, setComponent] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // setComponent(getDynamicCompoment(path));
      // @ts-ignore
      setComponent(lazy(() => import("streamLanding/StreamLanding")));
    }
  }, []);

  return Component && <Component />;
};
