import { useState, FormEvent } from "react";
import './TodoForm.css';

interface TodoFormProps {
    addTodo: (text: string) => void;
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
    const [text, setText] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // ページのリロードを防いでいる
        if (!text.trim()) return; // 空白は無視
        addTodo(text.trim());
        setText(""); // 入力欄リセット
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input 
                className="inputArea"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="タスクを入力"
            />
            <button className="addButton" type="submit">
                追加
            </button>
        </form>
    );
};

export default TodoForm;