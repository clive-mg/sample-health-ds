import * as React from "react";
import { FileUploadItemProps } from "./FileUploadItem";

/** One entry in the zone's list. */
export interface FileUploadFile extends FileUploadItemProps { id?: string | number; }

/**
 * File upload — a dropzone that owns its list. Wears the same label, help
 * icon, hint and error line as Input.
 */
export interface FileUploadProps {
  label?: React.ReactNode;
  /** Accepted formats line inside the zone. */
  hint?: React.ReactNode;
  /** Tooltip text on a help icon beside the label. */
  helpText?: string;
  required?: boolean;
  /** Draws the zone's error border. */
  error?: boolean;
  /** Message under the zone, e.g. why the last drop was rejected. */
  errorText?: React.ReactNode;
  disabled?: boolean;
  multiple?: boolean;
  /** Native accept attribute, e.g. ".pdf,.jpg". */
  accept?: string;
  /** Rows rendered beneath the zone, one FileUploadItem each. */
  files?: FileUploadFile[];
  onFiles?: (files: FileList) => void;
  onRemove?: (file: FileUploadFile, index: number) => void;
  onRetry?: (file: FileUploadFile, index: number) => void;
}
export function FileUpload(props: FileUploadProps): JSX.Element;
export default FileUpload;
