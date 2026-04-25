import { Exercise } from '../types';

export const IPA_SYMBOLS = {
  vowels: ['a', 'ɑ', 'e', 'ɛ', 'i', 'o', 'ɔ', 'u', 'y', 'ø', 'œ', 'ə'],
  nasals: ['ɑ̃', 'ɛ̃', 'ɔ̃', 'œ̃'],
  semiVowels: ['j', 'w', 'ɥ'],
  consonants: ['p', 'b', 't', 'd', 'k', 'ɡ', 'f', 'v', 's', 'z', 'ʃ', 'ʒ', 'm', 'n', 'ɲ', 'ŋ', 'l', 'r'],
  others: ['/', '[', ']', '.', '‿']
};

export const FRENCH_PHONETIC_ALPHABET = [
  ...IPA_SYMBOLS.vowels,
  ...IPA_SYMBOLS.nasals,
  ...IPA_SYMBOLS.semiVowels,
  ...IPA_SYMBOLS.consonants,
  ...IPA_SYMBOLS.others
];
