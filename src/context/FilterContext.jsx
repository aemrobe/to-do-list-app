import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

function FilterProvider({ children }) {
  const [filter, setFilter] = useState("all");

  const values = {
    filter,
    setFilter,
  };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
}

function useFilter() {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error("You are using a filter context outisde of the provider");
  }

  return context;
}

export { FilterProvider, useFilter };
