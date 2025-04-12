import React, { useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(12);
  const [selectedLengthPreset, setSelectedLengthPreset] = useState<8 | 12 | null>(null);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const [copyMessageVisible, setCopyMessageVisible] = useState(false);

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let charPool = "";
    if (includeUppercase) charPool += uppercaseChars;
    if (includeLowercase) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (charPool.length === 0) {
      alert("文字種を1つ以上選択してください！");
      return;
    }

    let passwordLength = length;
    if(selectedLengthPreset){
      setLength(selectedLengthPreset);
    }

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool[randomIndex];
    }

    setGeneratedPassword(password);
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div className='length'>
        <p>長さ：</p>
        <label>
          <input
            type="number"
            min="4"
            max="50"
            value={length}
            onChange={(e) => {
              setLength(Number(e.target.value));
              setSelectedLengthPreset(null);
            }}
          />
        </label>
        <label>
          <input
            className=""
            type="radio"
            name="length"
            checked={selectedLengthPreset === 8}
            onChange={(e) => {
              setSelectedLengthPreset(8);
              setLength(8);
            }}
          />
          8文字
        </label>
        <label>
          <input
            className=""
            type="radio"
            name="length"
            checked={selectedLengthPreset === 12}
            onChange={(e) => {
              setSelectedLengthPreset(12);
              setLength(12);
            }}
          />
          12文字
        </label>
      </div>
      <div className='choice'>
        <label>
          <input
            type='checkbox'
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          大文字
        </label>
        <label>
          <input
            type='checkbox'
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          小文字
        </label>
        <label>
          <input
            type='checkbox'
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          数字
        </label>
        <label>
          <input
            type='checkbox'
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          記号
        </label>
      </div>
      <div className='result'>
        <textarea readOnly value={generatedPassword}></textarea>
        <button onClick={() => {
          navigator.clipboard.writeText(generatedPassword);
          setCopyMessageVisible(true);
          setTimeout(() => setCopyMessageVisible(false), 1500);
        }}>コピー</button>
        {copyMessageVisible && <p className="copy-message">コピーしました！</p>}
      </div>
      <button 
        type="button"
        onClick={generatePassword}
        >生成</button>
    </div>
  );
}

export default App;
