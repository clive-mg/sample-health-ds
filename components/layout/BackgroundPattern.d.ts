import * as React from "react";
export interface BackgroundPatternProps { type?: "grid" | "dots"; size?: number; masked?: boolean; style?: React.CSSProperties; }
export function BackgroundPattern(props: BackgroundPatternProps): JSX.Element;
export default BackgroundPattern;
