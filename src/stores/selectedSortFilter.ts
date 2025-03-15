import { atom } from 'jotai';

export const sortOptionAtom = atom<string>('할인순');

export const selectedFiltersAtom = atom<Record<string, string[]>>({});
