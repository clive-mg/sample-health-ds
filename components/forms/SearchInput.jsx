import React from "react";
import { Input } from "./Input.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Search input. Input preset with a leading search glyph. */
export function SearchInput({ placeholder = "Search", size = "md", ...rest }) {
  return <Input size={size} placeholder={placeholder} iconLeading={<Icon name="SearchLg" size={20} />} {...rest} />;
}
export default SearchInput;
