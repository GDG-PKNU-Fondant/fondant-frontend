import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      lastFocusedElementRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        sheetRef.current?.focus();
      }, 10);
    } else {
      lastFocusedElementRef.current?.focus();
    }
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-end"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <motion.div
            ref={sheetRef}
            tabIndex={-1}
            className="bg-white w-full max-w-md rounded-t-2xl p-4 origin-bottom"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 100 }}
            dragElastic={0}
            onDragEnd={(_, info) => {
              if (info.offset.y > 50) onClose();
            }}
          >
            <div className="flex justify-center items-center mb-3">
              <div
                className="w-10 h-1.5 bg-gray-400 rounded-full cursor-pointer"
                onClick={onClose}
              ></div>
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
