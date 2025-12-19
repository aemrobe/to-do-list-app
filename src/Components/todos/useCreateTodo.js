import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { createTodo as createTodoApi } from "../../services/apiTodos";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createTodo } = useMutation({
    mutationFn: createTodoApi,
    onSuccess: function () {
      toast.success("New Todo item successfully created!");
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: function (err) {
      console.error(err);
      toast.error("New todo can't be created");
    },
  });

  return { isCreating, createTodo };
}
