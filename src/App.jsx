import { useEffect } from "react";
import MoonIcon from "./components/icons/MoonIcon";
import Box from "./components/ui/Box";
import { useSettings } from "./context/SettingContext";
import SunIcon from "./components/icons/SunIcon";
import TodoItem from "./components/todos/TodoItem";
import { useTodos } from "./components/todos/useTodos";
import { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

import { useCreateTodo } from "./components/todos/useCreateTodo";
import ErrorFallback from "./components/ui/ErrorFallback";
import Loader from "./components/ui/Loader";
import { useDeleteCompletedTodos } from "./components/todos/useDeleteCompletedTodos";
import { useFilter } from "./context/FilterContext";
import FilterBtn from "./components/ui/FilterBtn";
import { useAnnouncer } from "./context/AnnounceProvider";

function App() {
  const { colorTheme, setColorTheme } = useSettings();

  const { isCreating, createTodo } = useCreateTodo();

  const { handleSubmit, register, reset } = useForm();

  const { todos, isLoading, error } = useTodos();

  const { announce } = useAnnouncer();

  const { filter } = useFilter();

  const { isDeletingCompletedTodos, deleteCompletedTodos } =
    useDeleteCompletedTodos();

  const onSubmit = function (data) {
    createTodo(
      {
        ...data,
        isCompleted: false,
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  const onError = function (err) {
    console.error("form submission error", err);
  };

  useEffect(
    function () {
      document.documentElement.className = `${colorTheme} `;
    },
    [colorTheme]
  );

  let filteredTodos;

  //### filtered todo items ###
  if (filter === "all") filteredTodos = todos;
  if (filter === "active")
    filteredTodos = todos?.filter((task) => !task.isCompleted);
  if (filter === "completed")
    filteredTodos = todos?.filter((task) => task.isCompleted);

  useEffect(
    function () {
      if (!isLoading && todos?.length > 0 && filteredTodos?.length === 0) {
        announce(`No tasks found for ${filter} filter.`);
      }

      if (!isLoading && todos?.length === 0) {
        announce("Your todo list is completly empty.");
      }
    },
    [announce, isLoading, filteredTodos?.length, todos?.length, filter]
  );

  if (error) return <ErrorFallback error={error} />;

  if (isLoading) return <Loader />;

  //### not completed todo items ###
  const activeTodosCount = todos?.filter((todo) => !todo.isCompleted).length;

  const completedTodos = todos?.filter((todo) => todo.isCompleted).length;

  return (
    <>
      <div className="background-image h-50 md:h-75 pt-12 px-6">
        <div className="max-w-md md:max-w-135 md:w-[75.4%] mx-auto flex justify-between items-center h-5 md:h-7.5 mb-10 md:mb-12 ">
          <h1
            id="todo-heading"
            tabIndex="-1"
            className="focus:outline-none font-bold font-josefin-sans tracking-[0.5em]  uppercase text-white text-2xl md:text-4xl "
          >
            todo
          </h1>

          <button
            aria-label={`Switch to ${
              colorTheme === "light" ? "dark mode" : "light mode"
            }`}
            onClick={() =>
              setColorTheme(colorTheme === "light" ? "dark" : "light")
            }
            className="border-none focus-visible:outline-2      focus-visible:outline-todo-hover
            focus-visible:outline-offset-4 "
          >
            {colorTheme === "light" ? (
              <MoonIcon width={"w-5 md:w-[1.625rem]"} />
            ) : (
              <SunIcon width={"w-5"} />
            )}
          </button>
        </div>

        <div className="max-w-md md:max-w-135  md:w-[75.4%]  mx-auto">
          <form action="#" onSubmit={handleSubmit(onSubmit, onError)}>
            <Box
              className={
                "flex items-center space-x-4 md:space-x-6 rounded-100 "
              }
              padding={"py-3.5 px-6 md:py-5 md:px-6"}
            >
              <label
                className="border border-checkbox-border 
                 shrink-0 rounded-full w-5 h-5 md:w-6 md:h-6"
                htmlFor={"create-todo"}
              >
                <span className="sr-only">create to do item</span>
              </label>

              <input
                type="text"
                name="content"
                disabled={isCreating}
                id="create-todo"
                className="focus:outline-none md:text-lg self-stretch min-w-0 placeholder:text-xs md:placeholder:text-lg -tracking-100 placeholder:text-gray-600 text-create-todo-text caret-blue-500  flex-auto"
                placeholder="Create a new todo..."
                {...register("content", {
                  required: "This field is required",
                })}
              />
            </Box>
          </form>

          <div className="mt-4 md:mt-6 shadow-3xl rounded-b-100">
            <ul>
              {filteredTodos.map((task, index) => (
                <TodoItem key={task.id} task={task} index={index} />
              ))}
            </ul>

            <Box
              className={
                " md:none text-xs md:text-sm text-todo-status flex justify-between -tracking-100 rounded-b-100"
              }
              padding={"px-5 py-4 md:p-6"}
            >
              <p aria-live={"polite"} aria-atomic="true">
                <span aria-hidden="true">
                  {activeTodosCount} {activeTodosCount === 1 ? "item" : "items"}{" "}
                  left
                </span>

                <span className="sr-only">
                  {activeTodosCount} uncompleted{" "}
                  {activeTodosCount === 1 ? "task" : "tasks"} left`
                </span>
              </p>

              <Box className="hidden  font-bold  md:flex space-x-4 justify-center  ">
                <FilterBtn filterType={"all"}> All</FilterBtn>

                <FilterBtn filterType={"active"}> Active</FilterBtn>

                <FilterBtn filterType={"completed"}> Completed</FilterBtn>
              </Box>

              <button
                disabled={isDeletingCompletedTodos}
                onClick={() => {
                  if (!completedTodos) return;
                  deleteCompletedTodos();
                }}
                className="focus-visible:outline-2 focus-visible:outline-todo-hover
            focus-visible:outline-offset-4 cursor-pointer btn-hover"
                aria-label="Clear all completed tasks"
              >
                Clear Completed
              </button>
            </Box>
          </div>

          <Box className="shadow-3xl text-todo-status text-sm -tracking-100 rounded-100 font-bold flex md:hidden space-x-4 justify-center py-4.25 mt-4">
            <FilterBtn filterType={"all"}> All</FilterBtn>

            <FilterBtn filterType={"active"}> Active</FilterBtn>

            <FilterBtn filterType={"completed"}> Completed</FilterBtn>
          </Box>

          <p className="text-sm -tracking-100 text-todo-status text-center mt-10 md:mt-6">
            Drag and drop to reorder list
          </p>
        </div>
      </div>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          duration: 3000,

          ariaProps: {
            role: "status",
            "aria-live": "polite",
            "aria-relevant": "all",
          },

          style: {
            fontSize: "1rem",
            maxWidth: "21.25rem",
            width: "90%",
            padding: "1rem 1.5rem",
            backgroundColor: "var(--color-background-primary)",
            color: "var(--color-todoitem-text)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
        }}
      />
    </>
  );
}

export default App;
