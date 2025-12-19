import { createContext, useContext, useState } from "react";

const SettingContext = createContext();

function SettingProvider({ children }) {
  const [colorTheme, setColorTheme] = useState("light");

  const values = {
    colorTheme,
    setColorTheme,
  };

  return (
    <SettingContext.Provider value={values}>{children}</SettingContext.Provider>
  );
}

function useSettings() {
  const context = useContext(SettingContext);

  if (context === undefined)
    throw new Error("You are using a setting context outside of the provider");

  return context;
}

export { SettingProvider, useSettings };
