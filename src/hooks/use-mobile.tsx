import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Default to false (desktop) for SSR and initial client render
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true); // Signal that client has mounted

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(mql.matches); // Use mql.matches directly
    };

    // Set initial value on client mount based on actual window conditions
    setIsMobile(mql.matches); 
    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, []); // Empty dependency array ensures this runs once on mount

  // Return the default (false) if not mounted, otherwise the client-determined value.
  // This ensures server and initial client render are consistent.
  return hasMounted ? isMobile : false;
}
