import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo as deleteTodoApi } from "../../services/apiTodos";
import toast from "react-hot-toast";
import { useAnnouncer } from "../../context/AnnounceContext";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const { announce } = useAnnouncer();

  const { isPending: isDeleting, mutate: deleteTodo } = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: function () {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });

      announce("Task deleted successfully!");
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Task can't be deleted successfully!");
      announce("Task can't be deleted successfully!");
    },
  });

  return { isDeleting, deleteTodo };
}
