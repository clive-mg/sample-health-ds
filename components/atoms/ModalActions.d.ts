import * as React from "react";
export interface ModalActionsProps { confirmLabel?: React.ReactNode; cancelLabel?: React.ReactNode; destructive?: boolean; onConfirm?: () => void; onCancel?: () => void; }
export function ModalActions(props: ModalActionsProps): JSX.Element;
export default ModalActions;
