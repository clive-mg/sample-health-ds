export interface SkeletonProps {
  variant?: "line" | "circle";
  width?: number | string;
  height?: number | string;
  lines?: number;
}
export function Skeleton(props: SkeletonProps): JSX.Element;
export default Skeleton;
