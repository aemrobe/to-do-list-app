import supabase from "./supabase";

export async function getTodos() {
  let { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false }); //descending order: Newest to oldest,z to a , 10 to 1 // always newest comes first then the
  // ascending order: oldest to newest, a to z, 1 to 10

  if (error) {
    console.error(error.message);
    throw new Error("To do items couldn't be loaded");
  }

  return data;
}

export async function deleteTodo(id) {
  const { data, error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("To do item couldn't be deleted");
  }

  return data;
}

export async function deleteCompletedTodos() {
  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("isCompleted", true);

  if (error) {
    console.error(error.message);
    throw new Error("Completed Todo items couldn't be deleted");
  }

  return data;
}

export async function createTodo(newTodo) {
  const { data, error } = await supabase
    .from("todos")
    .insert([{ ...newTodo }])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("New todo couldn't be created.");
  }

  return data;
}

export async function editTodo(newTodo, id) {
  const { data, error } = await supabase
    .from("todos")
    .update({ ...newTodo })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("The todo item couldn't be updated");
  }

  return data;
}
