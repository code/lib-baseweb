import * as React from "react";
import { FileUploader, type FileRow } from "baseui/file-uploader";

export default function Example() {
  const [fileRows, setFileRows] = React.useState<Array<FileRow>>([
    {
      file: new File(["test file"], "file.txt"),
      id: "0",
      status: "processed",
      errorMessage: null,
    },
  ]);
  return (
    <FileUploader
      fileRows={fileRows}
      hint={
        "Try uploading a file to see the item preview. Image files will show a thumbnail."
      }
      itemPreview
      setFileRows={setFileRows}
    />
  );
}