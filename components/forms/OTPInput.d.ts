/**
 * OTP input — one-time-code entry boxes.
 */
export interface OTPInputProps { length?: number; value?: string; onChange?: (value: string) => void; }
export function OTPInput(props: OTPInputProps): JSX.Element;
export default OTPInput;
