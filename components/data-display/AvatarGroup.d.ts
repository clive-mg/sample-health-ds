export interface AvatarEntry { src?: string; initials?: string; }
export interface AvatarGroupProps {
  size?: "xs" | "sm" | "md" | "lg";
  avatars?: AvatarEntry[];
  max?: number;
}
export function AvatarGroup(props: AvatarGroupProps): JSX.Element;
export default AvatarGroup;
