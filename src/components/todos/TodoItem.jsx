import Box from "../ui/Box";
import CloseBtn from "../ui/CloseBtn";
import { useDeleteTodo } from "./useDeleteTodo";

import { useState } from "react";
import { useEditTodo } from "./useEditTodo";

function TodoItem({ task, index }) {
  const { isDeleting, deleteTodo } = useDeleteTodo();
  const [checked, setChecked] = useState(task.isCompleted);

  const initialIsCompleted = task.isCompleted;

  function handleToggle(e) {
    const newStatus = e.target.checked;
    setChecked(newStatus);
    editTodo({
      newTodo: {
        isCompleted: newStatus,
      },
      id: task.id,
    });
  }

  const { editTodo } = useEditTodo(setChecked, initialIsCompleted);

  return (
    <li>
      <Box
        className={`to-do-list-item border-b border-b-todoitem-bordercolor ${
          index === 0 ? "rounded-t-100" : ""
        } flex gap-4`}
        padding={"px-5 py-4 md:p-6"}
      >
        <input
          type="checkbox"
          name="to-do-list"
          id={task.id}
          checked={checked}
          onChange={handleToggle}
          disabled={isDeleting}
          className="peer absolute top-0 bottom-0 right-0 left-0 h-0 w-0 opacity-0 hidden-checkbox "
        />

        <label
          className={`peer-focus-visible:ring-2 peer-focus-visible:ring-todo-hover 
            peer-focus-visible:ring-offset-4 peer-focus-visible:ring-offset-box-background cursor-pointer custom-checkbox-container flex items-center gap-4 w-full min-w-0`}
          htmlFor={task.id}
        >
          <span className="checkmark-circle shrink-0 w-5 h-5 md:w-6 md:h-6 border border-checkbox-border rounded-full flex items-center justify-center"></span>

          <span
            className={`todo-text-span min-w-0 wrap-break-word flex-auto text-xs md:text-lg   ${
              checked ? "text-todo-checked line-through" : "text-todoitem-text"
            }`}
          >
            {task.content}
          </span>
        </label>

        <CloseBtn
          index={index}
          ariaText={task.content}
          className={"ml-1.5 shrink-0"}
          onClick={() => {
            deleteTodo(task.id);
          }}
        />
      </Box>
    </li>
  );
}

export default TodoItem;
