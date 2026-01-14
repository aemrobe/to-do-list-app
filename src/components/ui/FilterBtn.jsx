import { useFilter } from "../../context/FilterContext";

function FilterBtn({ children, filterType }) {
  const { filter, setFilter } = useFilter();

  const isActive = filter === filterType;

  return (
    <button
      aria-pressed={isActive}
      className={`focus-visible:outline-2      focus-visible:outline-todo-hover
            focus-visible:outline-offset-4 cursor-pointer btn-hover ${
              filter === filterType ? "text-page-active" : ""
            }`}
      onClick={() => setFilter(filterType)}
    >
      {children}
    </button>
  );
}

export default FilterBtn;
