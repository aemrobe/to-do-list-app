import CrossIcon from "../icons/CrossIcon";

function CloseBtn({ className, index, onClick, ariaText }) {
  const shortText =
    ariaText.length > 30 ? ariaText.substring(0, 30) + "..." : ariaText;

  return (
    <button
      className={`${className} 
      outline-none focus-visible:ring-2 focus-visible:ring-todo-hover 
            focus-visible:ring-offset-4 focus-visible:ring-offset-box-background`}
      aria-label={`delete task ${index + 1} ${shortText} `}
      onClick={onClick}
    >
      <CrossIcon width={"w-3 md:w-[1.125rem]"} />
    </button>
  );
}

export default CloseBtn;
