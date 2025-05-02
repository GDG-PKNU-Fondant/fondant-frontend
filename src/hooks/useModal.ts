import { useAtom, useAtomValue } from 'jotai';
import {
  isModalOpenAtom,
  openModalAtom,
  closeModalAtom,
} from '@stores/modalState';

const useModal = () => {
  const isModalOpen = useAtomValue(isModalOpenAtom);
  const [, openModal] = useAtom(openModalAtom);
  const [, closeModal] = useAtom(closeModalAtom);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
