import React from 'react';
import { FRENCH_PHONETIC_ALPHABET } from '../data/ipa';
import { cn } from '../lib/utils';

interface IPAKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  className?: string;
}

export const IPAKeyboard: React.FC<IPAKeyboardProps> = ({ onKeyPress, onBackspace, className }) => {
  return (
    <div className={cn("grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 p-4 bg-gray-100 rounded-2xl border-t-2 border-gray-200", className)}>
      {FRENCH_PHONETIC_ALPHABET.map((char) => (
        <button
          key={char}
          onClick={() => onKeyPress(char)}
          className="ipa-key"
        >
          {char}
        </button>
      ))}
      <button
        onClick={onBackspace}
        className="ipa-key col-span-2 bg-gray-200 text-gray-600"
      >
        ⌫
      </button>
    </div>
  );
};
