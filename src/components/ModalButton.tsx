import { ReactNode } from "react";

export interface ModalButtonProps {
  onClick: () => void;
  infosCompleted: boolean;
  children: ReactNode;
}

export default function ModalButton({
  onClick,
  infosCompleted,
  children,
}: ModalButtonProps) {
  return infosCompleted ? (
    <button className="px-2 py-5 border-2 border-green-600" onClick={onClick}>
      {children}
    </button>
  ) : (
    <button className="px-2 py-5 border-2 border-red-600" onClick={onClick}>
      {children}
    </button>
  );
}
