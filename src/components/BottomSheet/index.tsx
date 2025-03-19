import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  AnimatePresence,
  motion,
  PanInfo,
  useDragControls,
} from 'framer-motion';
import useModal from '@hooks/useModal';
import useBodyScrollLock from '@hooks/useBodyScrollLock';

interface BottomSheetProps {
  sheetKey: string;
  children: React.ReactNode;
}

const BottomSheet = ({ sheetKey, children }: BottomSheetProps) => {
  const { isModalOpen, closeModal } = useModal();
  const isBottomSheetOpen = isModalOpen(sheetKey);
  const dragControls = useDragControls();
  const { lockBodyScroll, unlockBodyScroll } = useBodyScrollLock();

  const sheetRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScrollLock = () => {
      if (isBottomSheetOpen) {
        lockBodyScroll();
      } else {
        unlockBodyScroll();
      }
    };

    handleScrollLock();

    return () => {
      if (isBottomSheetOpen) {
        unlockBodyScroll();
      }
    };
  }, [isBottomSheetOpen, lockBodyScroll, unlockBodyScroll]);

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

  const startDrag = (event: React.PointerEvent) => {
    dragControls.start(event);
  };

  const handleDragEnd = (
    // @ts-expect-error: onDragEnd의 시그니처와 일치시키기 위해 남겨둠
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.y > 50) {
      closeModal(sheetKey);
    }
  };

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
            className="bg-background w-full max-w-[480px] rounded-t-2xl p-[8px] origin-bottom"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 100 }}
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            dragSnapToOrigin
          >
            <div
              data-testid="bottom-sheet-close-button"
              className="flex justify-center items-center pt-[4px] p-[12px]"
              onPointerDown={startDrag}
            >
              <div className="w-[40px] h-[4px] bg-beige-primary rounded-full cursor-pointer" />
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
