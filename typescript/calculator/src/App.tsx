import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [numbers, setNumbers] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isResultDisplayed, setIsResultDisplayed] = useState<boolean>(false);

  const handleClickNum = (value: string) => {
    if(isResultDisplayed){
      setNumbers(value);
      setResult('');
      setIsResultDisplayed(false);
    }else{
      if(value === '.'){
        const parts = numbers.split(/[\+\-\*\/]/); // 演算子で分割
        const currentNumber = parts[parts.length - 1]; // 一番右の数字
        if (currentNumber.includes('.')) {
          return; // すでにドットがあるので無視
        }
        // 先頭にドットを押したら「0.」から始めるように
        if (currentNumber === '') {
          value = '0.';
        }
        const newNum = numbers + value;
        setNumbers(newNum);
      }else{
        const newNum = numbers + value;
        setNumbers(newNum);  
      }
    }
  }

  const handleOperatorClick = (operator: string) => {
    if (numbers === '') return; // 入力がないなら無視
  
    const lastChar = numbers[numbers.length - 1];
    if ("+-*/".includes(lastChar)) {
      // 最後が演算子なら置き換え
      setNumbers(numbers.slice(0, -1) + operator);
    } else {
      setNumbers(numbers + operator);
    }
  }

  const handleClickC = () => {
    setNumbers('');
    setResult('');
    setIsResultDisplayed(false);
  }

  const handleClickEquals = () => {
    try {
      const result = calculate(numbers);
      setResult(result);
      setIsResultDisplayed(true);
    } catch (e){
      setResult("Error");
      setIsResultDisplayed(true);
    }
  }

  const calculate = (expression: string): string =>{
    let updatedExpression = expression.replace(/x/g, '*').replace(/÷/g, '/'); // 演算子の置き換え
    let operators = ['+', '-', '*', '/'];
    let temp = updatedExpression.split(/([+\-*/])/).map(s => s.trim());

    for (let i = 0; i < temp.length; i++){
      if (temp[i] === '*' || temp[i] === '/'){
        const num1 = parseFloat(temp[i - 1]);
        const num2 = parseFloat(temp[i + 1]);
        let result;

        if (temp[i] === '*') {
          result = num1 * num2;
        } else {
          if(num2 !== 0){
            result = num1 / num2;
          }else{
            return "Error";
          }
        }

        temp[i - 1] = result.toString();
        temp.splice(i, 2);
        i--;
      }
    }

    let finalResult = parseFloat(temp[0]);
    for (let i = 1; i < temp.length; i += 2) {
      const operator = temp[i];
      const num = parseFloat(temp[i + 1]);
    
      if (operator === '+') {
        finalResult += num;
      } else if (operator === '-') {
        finalResult -= num;
      }
    } 

    return finalResult.toString();
  };

  return (
    <div className="wrap">
      <h2>Calculator</h2>
      <div className='contents'>
        <div className='formulaDisplay'>{numbers}</div>
        <div className='resultDisplay'>{result}</div>
        <div className="buttons">
          <div className="row">
            <button onClick={handleClickC}>C</button>
            <button disabled />
            <button disabled />
            <button onClick={() => handleOperatorClick('/')}>÷</button>
          </div>
          <div className="row">
            <button onClick={() => handleClickNum('7')}>7</button>
            <button onClick={() => handleClickNum('8')}>8</button>
            <button onClick={() => handleClickNum('9')}>9</button>
            <button onClick={() => handleOperatorClick('*')}>×</button>
          </div>
          <div className="row">
            <button onClick={() => handleClickNum('4')}>4</button>
            <button onClick={() => handleClickNum('5')}>5</button>
            <button onClick={() => handleClickNum('6')}>6</button>
            <button onClick={() => handleOperatorClick('-')}>-</button>
          </div>
          <div className="row">
            <button onClick={() => handleClickNum('1')}>1</button>
            <button onClick={() => handleClickNum('2')}>2</button>
            <button onClick={() => handleClickNum('3')}>3</button>
            <button onClick={() => handleOperatorClick('+')}>+</button>
          </div>
          <div className="row">
            <button onClick={() => handleClickNum('0')} className="wide">0</button>
            <button onClick={() => handleClickNum('.')}>.</button>
            <button disabled />
            <button onClick={handleClickEquals}>=</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
