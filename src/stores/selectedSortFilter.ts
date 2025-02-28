import { atom } from 'jotai';

export const sortOptionAtom = atom<string>('혜택순');

export const selectedFiltersAtom = atom<string[]>([]);
