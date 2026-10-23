import * as React from "react";
/**
 * File upload item — one row per file. The type chip, the name, a meta line
 * pairing the size with what the file is doing, and a progress bar while there
 * is progress to show.
 */
export interface FileUploadItemProps {
  name?: string;
  /** Formatted size, e.g. "720 KB". */
  size?: string;
  /** queued and uploading are in flight; failed can retry, rejected never started. */
  status?: "queued" | "uploading" | "complete" | "failed" | "rejected";
  /** 0–100. Ignored unless the status shows a bar. */
  progress?: number;
  /** Reason shown in place of the status text when rejected, e.g. "Over 10 MB". */
  error?: string;
  onRemove?: () => void;
  /** Shows a Try again link on a failed row. */
  onRetry?: () => void;
}
export function FileUploadItem(props: FileUploadItemProps): JSX.Element;
export default FileUploadItem;
