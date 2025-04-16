import { storageTodoItems } from "@/libs/storage";
import { useTodoItemsQuery, useToggleTodoItemMutation, useDeleteTodoItemMutation } from "@/libs/query";

function App() {

  const todoItemsQuery = useTodoItemsQuery();
  const todoItems = todoItemsQuery.data || [];
  const toggleTodoItemMutation = useToggleTodoItemMutation();
  const deleteTodoItemMutation = useDeleteTodoItemMutation();

  return (
    <div>
      <div>
        {todoItems.map(todoItem => (
          <div key={todoItem.id}>
            <input type="checkbox" checked={todoItem.completed} onChange={async () => {
              await toggleTodoItemMutation.mutateAsync(todoItem.id);
            }} />
            <span>{todoItem.content}</span>
            <button onClick={async () => {
              await deleteTodoItemMutation.mutateAsync(todoItem.id);
            }}>Delete</button>
        </div>
        ))}
      </div>
      <form onSubmit={async e => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const content = formData.get('content') as string;
        const todoItems = await storageTodoItems.getValue() || [];
        await storageTodoItems.setValue([...todoItems, {
          id: `${Date.now()}`,
          content,
          completed: false
        }]);

        todoItemsQuery.refetch();

        (e.target as HTMLFormElement).reset()
      }}>
        <input type="text" name="content" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default App;