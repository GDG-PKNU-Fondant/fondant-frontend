import { atom } from 'jotai';
import { Category } from '@type/Category';

export const rawCategoriesAtom = atom<Category[]>([]);

export const mainCategoriesAtom = atom((get) =>
  get(rawCategoriesAtom).map((c) => ({
    id: c.id,
    name: c.name,
    iconUrl: c.iconUrl,
  })),
);

export const allCategoriesAtom = atom((get) =>
  get(rawCategoriesAtom).flatMap((c) => [
    { id: c.id, name: c.name },
    ...c.subCategories.map((s) => ({ id: s.id, name: s.name })),
  ]),
);
