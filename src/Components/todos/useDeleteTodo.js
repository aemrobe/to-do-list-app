import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo as deleteTodoApi } from "../../services/apiTodos";
import toast from "react-hot-toast";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteTodo } = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: function () {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Task couldn't be deleted successfully!");
    },
  });

  return { isDeleting, deleteTodo };
}
