import { useState } from 'react';
import { motion } from 'framer-motion';

interface CalcButtonProps {
  label: string;
  bg?: string;
  color?: string;
  onClick: () => void;
  className?: string;
}

const CalcButton = ({ label, bg = '#333333', color = 'white', onClick, className = '' }: CalcButtonProps) => (
  <motion.button
    whileTap={{ scale: 0.95, filter: 'brightness(1.2)' }}
    onClick={onClick}
    className={`w-full aspect-square rounded-full flex items-center justify-center text-[28px] font-normal ${className}`}
    style={{ background: bg, color }}
  >
    {label}
  </motion.button>
);

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    if (prevValue !== null && operation && !newNumber) {
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(result);
    } else {
      setPrevValue(current);
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEqual = () => {
    if (prevValue !== null && operation) {
      const result = calculate(prevValue, parseFloat(display), operation);
      setDisplay(String(Math.round(result * 1000000) / 1000000));
      setPrevValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const handleToggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setNewNumber(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-black flex flex-col p-4">
      {/* Display */}
      <div className="flex-1 flex items-end justify-end pb-4 px-2">
        <span className="text-white text-[64px] font-light tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {display}
        </span>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-3">
        <CalcButton label={display === '0' && !prevValue ? 'AC' : 'C'} bg="#a5a5a5" color="black" onClick={handleClear} />
        <CalcButton label="+/-" bg="#a5a5a5" color="black" onClick={handleToggleSign} />
        <CalcButton label="%" bg="#a5a5a5" color="black" onClick={handlePercent} />
        <CalcButton label="/" bg="#ff9f0a" onClick={() => handleOperation('/')} />

        <CalcButton label="7" onClick={() => handleNumber('7')} />
        <CalcButton label="8" onClick={() => handleNumber('8')} />
        <CalcButton label="9" onClick={() => handleNumber('9')} />
        <CalcButton label="x" bg="#ff9f0a" onClick={() => handleOperation('*')} />

        <CalcButton label="4" onClick={() => handleNumber('4')} />
        <CalcButton label="5" onClick={() => handleNumber('5')} />
        <CalcButton label="6" onClick={() => handleNumber('6')} />
        <CalcButton label="-" bg="#ff9f0a" onClick={() => handleOperation('-')} />

        <CalcButton label="1" onClick={() => handleNumber('1')} />
        <CalcButton label="2" onClick={() => handleNumber('2')} />
        <CalcButton label="3" onClick={() => handleNumber('3')} />
        <CalcButton label="+" bg="#ff9f0a" onClick={() => handleOperation('+')} />

        <CalcButton label="0" className="col-span-2 !aspect-auto !rounded-full !justify-start !pl-7" onClick={() => handleNumber('0')} />
        <CalcButton label="." onClick={handleDecimal} />
        <CalcButton label="=" bg="#ff9f0a" onClick={handleEqual} />
      </div>
    </div>
  );
}
