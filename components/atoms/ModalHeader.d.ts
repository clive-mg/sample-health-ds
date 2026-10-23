import * as React from "react";
export interface ModalHeaderProps { icon?: React.ReactNode; title?: React.ReactNode; description?: React.ReactNode; onClose?: () => void; }
export function ModalHeader(props: ModalHeaderProps): JSX.Element;
export default ModalHeader;
