import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { createTodo as createTodoApi } from "../../services/apiTodos";
import { useAnnouncer } from "../../context/AnnounceProvider";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const { announce } = useAnnouncer();

  const { isPending: isCreating, mutate: createTodo } = useMutation({
    mutationFn: createTodoApi,
    onSuccess: function () {
      toast.success("Task created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      announce("Task created successfully!");
    },
    onError: function (err) {
      console.error(err);
      toast.error("New task can't be created");
      announce("New task can't be created");
    },
  });

  return { isCreating, createTodo };
}
