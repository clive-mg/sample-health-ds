import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Banner icon (internal). Leading featured icon block for banners. */
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";
export function BannerIcon({ icon = "Announcement01", color = "brand", style = {}, ...rest }) {
  return <FeaturedIcon color={color} size="md" style={style}><Icon name={icon} /></FeaturedIcon>;
}
export default BannerIcon;
