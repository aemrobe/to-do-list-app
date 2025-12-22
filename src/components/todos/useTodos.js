import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../services/apiTodos";

export function useTodos() {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return { todos, isLoading, error };
}
