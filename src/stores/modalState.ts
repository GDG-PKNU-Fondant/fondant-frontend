import { atom } from 'jotai';

export const modalsAtom = atom<Record<string, boolean>>({});

export const isModalOpenAtom = atom(
  (get) => (key: string) => !!get(modalsAtom)[key],
);

export const openModalAtom = atom(null, (_, set, key: string) => {
  set(modalsAtom, (prev) => ({
    ...prev,
    [key]: true,
  }));
});

export const closeModalAtom = atom(null, (_, set, key: string) => {
  set(modalsAtom, (prev) => ({
    ...prev,
    [key]: false,
  }));
});
