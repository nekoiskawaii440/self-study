import './memoList.css';

type memo = {
    id: number;
    memoTitle: string;
    memo: string;
}

type MemoListProps = {
    memos: memo[];
    onSelectMemo: (memo: memo) => void;
    onDelete: (id: number) => void;
    onCreate: () => void;
    selectedMemo: memo | null;
}

const MemoList = ({ memos, onSelectMemo, onDelete, onCreate, selectedMemo }: MemoListProps) => {
    return (
        <ul className="list">
            <li className='memo-item newMeme' onClick={() => onCreate()}>
                <span >+新規作成</span>
            </li>
            {memos.map((memo) => (
                <li
                    key={memo.id}
                    className={`memo-item ${selectedMemo?.id === memo.id ? 'active' : ''}`}
                    onClick={() => onSelectMemo(memo)}
                >
                    <span className="memo-title">{memo.memoTitle}</span>
                    <button
                        className="delete-btn"
                        onClick={(e) => {
                            e.stopPropagation(); // クリックがliに伝わるのを防ぐ
                            onDelete(memo.id);
                        }}
                        title="削除"
                    >
                        ✕
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default MemoList;