import * as React from "react";
export interface FeedItem { icon?: React.ReactNode; title?: React.ReactNode; time?: React.ReactNode; }
export interface ActivityFeedProps { items?: FeedItem[]; }
export function ActivityFeed(props: ActivityFeedProps): JSX.Element;
export default ActivityFeed;
