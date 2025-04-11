import React, { useState, useEffect } from 'react';
import './App.css';
import MemoList from './components/memoList';
import MemoForm from './components/memoForm';

type Memo = {
  id: number;
  memoTitle: string;
  memo: string;
}

function App() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect (() => {
    const savedMemos = localStorage.getItem("memos");
    if (savedMemos){
      try {
        const parsed = JSON.parse(savedMemos);
        setMemos(parsed);
      } catch(e) {
        console.error("JSON parse error:", e);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect (() => {
    if (isInitialized) {
      localStorage.setItem("memos", JSON.stringify(memos));
    }
  }, [memos]);

  const addMemo = (title: string, text: string) => {
    if(selectedMemo){
      // 編集
      setMemos(prev =>
        prev.map(m => m.id === selectedMemo.id ? { ...m, memoTitle: title, memo: text}:m)
      );
    }else{
      // 新規
      const newMemo: Memo = {
        id: Date.now(),
        memoTitle: title,
        memo: text,
      };
      setMemos([newMemo, ...memos]);
    }
  };

  const deleteMemo = (id: number) => {
    setMemos(prev => prev.filter(memo => memo.id !== id));
    if (selectedMemo?.id === id) {
      setSelectedMemo(null);
    }
  };

  const createNewMemo = () => {
    setSelectedMemo(null);
  };

  return (
    <div className="wrap">
      <h2 className='title'>メモ帳アプリ</h2>
      <div className='contents'>
        <div className='leftside'>
          <MemoList memos={memos} selectedMemo={selectedMemo} onSelectMemo={setSelectedMemo} onDelete={deleteMemo} onCreate={createNewMemo}/>
        </div>
        <div className='rightside'>
          <MemoForm addMemo={addMemo} selectedMemo={selectedMemo} />
        </div>
      </div>
    </div>
  );
}

export default App;
