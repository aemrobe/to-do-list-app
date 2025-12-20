import { createContext, useCallback, useContext, useState } from "react";

const AnnounceContext = createContext();

function AnnounceProvider({ children }) {
  const [announcement, setAnnouncement] = useState("");

  const announce = useCallback((message) => {
    setTimeout(function () {
      setAnnouncement(message);

      setTimeout(function () {
        setAnnouncement("");
      }, 500);
    }, 100);
  }, []);

  return (
    <AnnounceContext.Provider
      value={{
        announce,
      }}
    >
      {children}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
    </AnnounceContext.Provider>
  );
}

function useAnnouncer() {
  const context = useContext(AnnounceContext);

  if (context === undefined)
    throw new Error(
      "You're using an announcer context outside of the provider"
    );

  return context;
}

export { AnnounceProvider, useAnnouncer };
