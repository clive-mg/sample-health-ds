import * as React from "react";
/**
 * Video player — poster, play button & control bar (presentational).
 */
export interface VideoPlayerProps { poster?: string; title?: React.ReactNode; duration?: string; }
export function VideoPlayer(props: VideoPlayerProps): JSX.Element;
export default VideoPlayer;
