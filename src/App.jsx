import MoonIcon from "./Components/icons/MoonIcon";

function App() {
  return (
    <div className="background-image h-50 pt-12 px-6">
      <div className="flex justify-between">
        <p>todo</p>
        <MoonIcon width={"w-5"} />
      </div>

      <div>
        <form action="#">
          <div className="">
            <label htmlFor="create-to-do">
              <span className="sr-only">create a new to do</span>
              <button className="border-2"></button>
            </label>

            <input
              type="text"
              id="create-to-do"
              placeholder="Create a new todo..."
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
