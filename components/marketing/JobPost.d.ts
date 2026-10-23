import * as React from "react";
export interface JobPostProps { title?: React.ReactNode; team?: string; location?: string; type?: string; description?: React.ReactNode; }
export function JobPost(props: JobPostProps): JSX.Element;
export default JobPost;
