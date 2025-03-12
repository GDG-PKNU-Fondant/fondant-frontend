import useModal from '@hooks/useModal';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface BottomSheetProps {
  sheetKey: string;
  children: React.ReactNode;
}

const BottomSheet = ({ sheetKey, children }: BottomSheetProps) => {
  const { isModalOpen, closeModal } = useModal();
  const isBottomSheetOpen = isModalOpen(sheetKey);

  const sheetRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isBottomSheetOpen) {
      lastFocusedElementRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        sheetRef.current?.focus();
      }, 10);
    } else {
      lastFocusedElementRef.current?.focus();
    }
  }, [isBottomSheetOpen]);

  return createPortal(
    <AnimatePresence>
      {isBottomSheetOpen && (
        <motion.div
          data-testid="bottom-sheet-overlay"
          className="z-1 fixed inset-0 bg-black/30 flex justify-center items-end"
          onClick={() => closeModal(sheetKey)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <motion.div
            ref={sheetRef}
            tabIndex={-1}
            className="bg-background w-full max-w-md rounded-t-2xl p-[8px] origin-bottom"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 100 }}
            dragElastic={0}
            onDragEnd={(_, info) => {
              if (info.offset.y > 50) closeModal(sheetKey);
            }}
          >
            <div className="flex justify-center items-center mb-[12px]">
              <button
                type="button"
                aria-label="닫기"
                data-testid="bottom-sheet-close-button"
                className="w-[40px] h-[4px] bg-beige-primary rounded-full cursor-pointer"
                onClick={() => closeModal(sheetKey)}
              />
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default BottomSheet;
