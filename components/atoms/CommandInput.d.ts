import * as React from "react";
export interface CommandInputProps { placeholder?: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; }
export function CommandInput(props: CommandInputProps): JSX.Element;
export default CommandInput;
