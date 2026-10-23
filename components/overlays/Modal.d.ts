import * as React from "react";
/**
 * Modal — dialogue box or content modal, centred or as a right slide-out.
 */
export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  /** "dialogue" — fixed 480px decision box. "content" — header / body / footer surface. */
  variant?: "dialogue" | "content";
  /** Content modals only: 480 / 640 / 800 / 1024 / fullscreen. "full" is centre-only. */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Content modals only. "right" is the slide-out. */
  position?: "center" | "right";
  icon?: React.ReactNode;
  iconColor?: "brand" | "gray" | "success" | "error" | "warning";
  /** Dialogues only: featured icon top-left, or centred above the title. */
  iconAlign?: "left" | "center";
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Button row. Omit on a content modal and it renders no footer. */
  actions?: React.ReactNode;
  /** Optional left-hand footer content — a checkbox or a help link. */
  footerLeading?: React.ReactNode;
  showClose?: boolean;
  dismissOnScrim?: boolean;
  /** Render inside the nearest positioned ancestor instead of the viewport. */
  inline?: boolean;
  children?: React.ReactNode;
}
export function Modal(props: ModalProps): JSX.Element | null;
export default Modal;
