import { useFilter } from "../../Context/FilterContext";

function FilterBtn({ children, filterType }) {
  const { filter, setFilter } = useFilter();

  return (
    <button
      className={`cursor-pointer btn-hover ${
        filter === filterType ? "text-page-active" : ""
      }`}
      onClick={() => setFilter(filterType)}
    >
      {children}
    </button>
  );
}

export default FilterBtn;
