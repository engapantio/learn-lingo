import { Form } from 'react-hook-form';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  const handleBackdropClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (ev.target === ev.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed top-0 left-0 z-9999 w-screen h-screen bg-black/60 flex justify-center items-center"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-141.5 h-150 rounded-[30px] bg-white p-16">
        <FiX
          className="absolute top-5 right-5 w-8 h-8 cursor-pointer text-2xl flex justify-center items-center p-0 border-none"
          onClick={onClose}
          aria-label="Close modal"
        />
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
