import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

interface IMFHooksProps {
  path?: string;
}

// TODO: Needs to be fixed later
export function useMFHook<T>({ path }: IMFHooksProps): React.FC<T> {
  const [Component, setComponent] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // setComponent(getDynamicCompoment(path));
      setComponent(
        dynamic(() => import("" + path), {
          ssr: false,
          loading: () => <>Loading...</>,
        })
      );
    }
  }, []);

  return Component || (() => <>Test</>);
}
