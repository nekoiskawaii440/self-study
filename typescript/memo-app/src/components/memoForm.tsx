import {useState, useEffect, FormEvent } from "react";
import './memoForm.css';

interface MemoFormProps {
    addMemo: (title: string, text: string) => void;
    selectedMemo: {
        memoTitle: string;
        memo: string;
    } | null;
}

const MemoForm = ({ addMemo, selectedMemo }: MemoFormProps) => {
    const [memoTitle, setMemoTitle] = useState("");  
    const [memoText, setMemoText] = useState("");

    useEffect(() => {
        if (selectedMemo){
            setMemoTitle(selectedMemo.memoTitle);
            setMemoText(selectedMemo.memo);
        } else {
            setMemoTitle("");
            setMemoText("");
        }
    }, [selectedMemo]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!memoTitle.trim() || !memoText.trim()) return;
        addMemo(memoTitle, memoText);
        setMemoText("");
        setMemoTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className="memoForm">
            <input
                type="text"
                placeholder="タイトル"
                value={memoTitle}
                onChange={(e) => setMemoTitle(e.target.value)}
            />
            <textarea 
                placeholder="内容"
                rows={30}
                value={memoText}
                onChange={(e) => setMemoText(e.target.value)}
            />
            <button type="submit">{selectedMemo === null ? '追加' : '保存'}</button>
        </form>
    );
;}

export default  MemoForm;