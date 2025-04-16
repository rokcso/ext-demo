import { storageTodoItems } from "@/libs/storage";
import { useTodoItemsQuery, useToggleTodoItemMutation, useDeleteTodoItemMutation } from "@/libs/query";
import "./style.css";
import "./App.css";

function App() {

  const todoItemsQuery = useTodoItemsQuery();
  const todoItems = todoItemsQuery.data || [];
  const toggleTodoItemMutation = useToggleTodoItemMutation();
  const deleteTodoItemMutation = useDeleteTodoItemMutation();

  return (
    <div className="todo-container">
      <div className="todo-list">
        {todoItems.map(todoItem => (
          <div key={todoItem.id} className="todo-item">
            <input type="checkbox" checked={todoItem.isCompleted} onChange={async () => {
              await toggleTodoItemMutation.mutateAsync(todoItem.id);
            }} />
            <span>{todoItem.content}</span>
            <button onClick={async () => {
              await deleteTodoItemMutation.mutateAsync(todoItem.id);
            }}>Delete</button>
        </div>
        ))}
      </div>
      <form className="add-todo-form" onSubmit={async e => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const content = formData.get('content') as string;
        const todoItems = await storageTodoItems.getValue() || [];
        await storageTodoItems.setValue([...todoItems, {
          id: `${Date.now()}`,
          content,
          isCompleted: false
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