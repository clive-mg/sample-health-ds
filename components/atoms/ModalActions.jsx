import React from "react";
import { Button } from "../buttons/Button.jsx";

/** Untitled UI PRO — Modal actions (internal build-block). Footer button row for modals. */
export function ModalActions({ confirmLabel = "Confirm", cancelLabel = "Cancel", destructive = false, onConfirm, onCancel, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 12, ...style }} {...rest}>
      <Button hierarchy="secondary" style={{ flex: 1 }} onClick={onCancel}>{cancelLabel}</Button>
      <Button hierarchy={destructive ? "primary-destructive" : "primary"} style={{ flex: 1 }} onClick={onConfirm}>{confirmLabel}</Button>
    </div>
  );
}
export default ModalActions;
