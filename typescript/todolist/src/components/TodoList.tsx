import "./TodoList.css";

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

type TodoListProps = {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    editTodo: (id: number, newText: string) => void;
};

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo }: TodoListProps) => {
    return (
        <ul className="list">
            {todos.map((todo) => (
                <li className="listItem" key={todo.id}>
                    <label className="listLabel">
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span
                            className={`todoText ${todo.completed ? "completed" : ""}`}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => editTodo(todo.id, prompt("新しいタスク名は？", todo.text) || todo.text)}>
                            編集
                        </button>
                        <button className="deleteButton" onClick={() => deleteTodo(todo.id)}>
                            削除
                        </button>
                    </label>
                </li>
            ))}
        </ul>
    )
};

export default TodoList;