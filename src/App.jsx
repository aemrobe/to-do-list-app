import { useEffect } from "react";
import MoonIcon from "./Components/icons/MoonIcon";
import Box from "./Components/ui/box";
import { useSettings } from "./Context/SettingContext";
import SunIcon from "./Components/icons/SunIcon";
import TodoItem from "./Components/todos/TodoItem";
import { useTodos } from "./Components/todos/useTodos";
import { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

import { useCreateTodo } from "./Components/todos/useCreateTodo";
import ErrorFallback from "./Components/ui/ErrorFallback";
import Loader from "./Components/ui/Loader";
import { useDeleteCompletedTodos } from "./Components/todos/useDeleteCompletedTodos";
import { useFilter } from "./Context/FilterContext";
import FilterBtn from "./Components/ui/FilterBtn";

function App() {
  const { colorTheme, setColorTheme } = useSettings();

  const { isCreating, createTodo } = useCreateTodo();

  const { handleSubmit, register, reset } = useForm();

  const { todos, isLoading, error } = useTodos();

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

  if (error) return <ErrorFallback error={error} />;

  if (isLoading) return <Loader />;

  let filteredTodos;

  //### filtered todo items ###
  if (filter === "all") filteredTodos = todos;
  if (filter === "active")
    filteredTodos = todos?.filter((task) => !task.isCompleted);
  if (filter === "completed")
    filteredTodos = todos?.filter((task) => task.isCompleted);

  //### not completed todo items ###
  const activeTodosCount = todos?.filter((todo) => !todo.isCompleted).length;

  return (
    <>
      <div className="background-image h-50 md:h-75 pt-12 px-6">
        <div className="max-w-md md:max-w-[33.75rem] md:w-[75.4%] mx-auto flex justify-between items-center h-5 md:h-[1.875rem] mb-10 md:mb-12 ">
          <h1 className="font-bold font-josefin-sans tracking-[0.5em]  uppercase text-white text-2xl md:text-4xl ">
            todo
          </h1>

          <button
            onClick={() =>
              setColorTheme(colorTheme === "light" ? "dark" : "light")
            }
          >
            {colorTheme === "light" ? (
              <MoonIcon width={"w-5 md:w-[1.625rem]"} />
            ) : (
              <SunIcon width={"w-5"} />
            )}
          </button>
        </div>

        <div className="max-w-md md:max-w-[33.75rem]  md:w-[75.4%]  mx-auto">
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
                <span className="sr-only">create to do</span>
              </label>

              <input
                type="text"
                name="content"
                disabled={isCreating}
                id="create-todo"
                className="md:text-lg self-stretch min-w-0 placeholder:text-xs md:placeholder:text-lg -tracking-100 placeholder:text-gray-600 text-create-todo-text caret-blue-500 focus:outline-none flex-auto"
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
              <p>{activeTodosCount} items left</p>

              <Box className="hidden  font-bold  md:flex space-x-4 justify-center  ">
                <FilterBtn filterType={"all"}> All</FilterBtn>

                <FilterBtn filterType={"active"}> Active</FilterBtn>

                <FilterBtn filterType={"completed"}> Completed</FilterBtn>
              </Box>

              <button
                disabled={isDeletingCompletedTodos}
                onClick={() => deleteCompletedTodos()}
                className="cursor-pointer btn-hover"
              >
                Clear Completed
              </button>
            </Box>
          </div>

          <Box className="shadow-3xl text-todo-status text-sm -tracking-100 rounded-100 font-bold flex md:hidden space-x-4 justify-center py-[1.0625rem] mt-4">
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
