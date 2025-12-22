import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompletedTodos as deleteCompletedTodosApi } from "../../services/apiTodos";
import toast from "react-hot-toast";
import { useAnnouncer } from "../../context/AnnounceContext";

export function useDeleteCompletedTodos() {
  const queryClient = useQueryClient();

  const { announce } = useAnnouncer();

  const { isPending: isDeletingCompletedTodos, mutate: deleteCompletedTodos } =
    useMutation({
      mutationFn: deleteCompletedTodosApi,
      onSuccess: () => {
        toast.success("All completed tasks are successfully deleted!");
        queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
        announce("All completed tasks are successfully deleted!");
        setTimeout(() => {
          document.getElementById("todo-heading")?.focus();
        }, 500);
      },
      onError: (error) => {
        toast.error("All Completed tasks can't be deleted.");
        announce("All Completed tasks can't be deleted.");
        console.error(error.message);
      },
    });

  return { isDeletingCompletedTodos, deleteCompletedTodos };
}
