'use client'
import React, { useState } from 'react'

const Calculator = () => {
  const [result, setResult] = useState('')
  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C', '%', '⌫', 'sqrt']
  ]
  const symbols = ['+', '-', '*', '/', '.']

  const handleClick = (value) => {
    const lastItem = result.toString().slice(-1);

    if ((symbols.includes(lastItem) && symbols.includes(value))) {
        const excludedLast = result.slice(0, -1);
        setResult(excludedLast + value);
        return;
    }
    if (symbols.includes(value) && value === lastItem) {
        return;
    }
    switch (value) {
        case 'C':
            setResult('');
            break;
        case '⌫':
            const output = result.toString().slice(0, -1);
            setResult(output);
            break;
        case '=':
            if (symbols.includes(lastItem)) return;
            try {
                setResult(eval(result).toString());
            } catch (error) {
                setResult('Error');
            }
            break;
        case 'sqrt':
            try {
                setResult(Math.sqrt(eval(result)).toString());
            } catch (error) {
                setResult('Error');
            }
            break;
        case '%':
            try {
                setResult((eval(result) / 100).toString());
            } catch (error) {
                setResult('Error');
            }
            break;
        default:
            setResult(result + value);
            break;
    }
};

return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="bg-gray-800 text-white text-right p-4 mb-4 rounded-md text-2xl font-semibold min-h-[48px] flex items-center justify-end">
                {result}
            </div>
            {buttons.map((row, rowIndex) => (
                <div className="flex gap-2 mb-2" key={rowIndex}>
                    {row.map((val, colIndex) => {
                        let buttonClass = 'flex-1 rounded-md text-xl font-semibold p-3 cursor-pointer transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50';

                        if (['+', '-', '*', '/'].includes(val)) {
                            buttonClass += ' bg-orange-500 text-white';
                        } else if (val === '=') {
                            buttonClass += ' bg-orange-600 text-white';
                        } else if (val === 'C') {
                            buttonClass += ' bg-red-500 text-white';
                        } else if (val === '%' || val === '⌫' || val === 'sqrt') {
                            buttonClass += ' bg-amber-400 text-gray-800';
                        } else {
                            buttonClass += ' bg-gray-200 text-gray-800';
                        }

                        return (
                            <button
                                onClick={() => handleClick(val)}
                                key={colIndex}
                                className={buttonClass}
                            >
                                {val}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    </div>
);
}

export default Calculator
