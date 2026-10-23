import React from "react";
import { MapMarker } from "../data-display/MapMarker.jsx";

/** Untitled UI PRO — Map location marker (internal). Pin used on maps, with optional active state. */
export function MapLocationMarker({ label, active = false, style = {}, ...rest }) {
  return <MapMarker label={label} active={active} style={style} {...rest} />;
}
export default MapLocationMarker;
