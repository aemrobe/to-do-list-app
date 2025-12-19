import CrossIcon from "../icons/CrossIcon";

function CloseBtn({ className, onClick }) {
  return (
    <button
      className={`${className}`}
      aria-label="delete a task"
      onClick={onClick}
    >
      <CrossIcon width={"w-3 md:w-[1.125rem]"} />
    </button>
  );
}

export default CloseBtn;
