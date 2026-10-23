import * as React from "react";
export interface TeamMember { name?: string; role?: string; bio?: string; initials?: string; src?: string; }
export interface TeamSectionProps { eyebrow?: React.ReactNode; title?: React.ReactNode; members?: TeamMember[]; }
export function TeamSection(props: TeamSectionProps): JSX.Element;
export default TeamSection;
