import type { ReactNode } from 'react';

export function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-sm shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children }: { children: ReactNode }) {
  return (
    <div className="px-6 py-4 border-b font-semibold text-lg text-text-200">
      {children}
    </div>
  );
}

export function ModalBody({ children }: { children: ReactNode }) {
  return <div className="px-6 py-4 text-text-200">{children}</div>;
}
