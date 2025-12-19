import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompletedTodos as deleteCompletedTodosApi } from "../../services/apiTodos";
import toast from "react-hot-toast";

export function useDeleteCompletedTodos() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingCompletedTodos, mutate: deleteCompletedTodos } =
    useMutation({
      mutationFn: deleteCompletedTodosApi,
      onSuccess: () => {
        toast.success("All completed todo items are successfully deleted!");
        queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
      },
      onError: (error) => {
        toast.error("All Completed todo items couldn't be deleted.");
        console.error(error.message);
      },
    });

  return { isDeletingCompletedTodos, deleteCompletedTodos };
}
