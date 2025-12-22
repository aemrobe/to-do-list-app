import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTodo as editTodoApi } from "../../services/apiTodos";
import toast from "react-hot-toast";

export function useEditTodo(setChecked, initialIsCompleted) {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editTodo } = useMutation({
    mutationFn: ({ newTodo, id }) => editTodoApi(newTodo, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.error(error);
      setChecked(initialIsCompleted);
      toast.error("The todo item couldn't be edited");
    },
  });

  return { isEditing, editTodo };
}
