import Box from "./Box";

function ErrorFallback({ error }) {
  return (
    <div className="bg-background-primary min-h-screen flex justify-center items-center">
      <Box
        className={
          "p-8 shadow-3xl rounded-100 w-full max-w-md flex flex-col items-center"
        }
      >
        <h2 className="text-xl font-bold text-create-todo-text uppercase tracking-widest text-center mb-4">
          Oops! Something went wrong
        </h2>

        <p className="text-todoitem-text  text-center mb-8 leading-relaxed">
          {error.message.includes("fetch")
            ? "Your connection seems unstable. Please check your network and try again."
            : error.message}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="text-page-active font-bold text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
        >
          Try Again
        </button>
      </Box>
    </div>
  );
}

export default ErrorFallback;
