/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { FileUploaderBeta } from "baseui/file-uploader-beta";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";
import iconConfig from "./icon";

const changeHandlers = [
  "onClick",
  "onFocus",
  "onBlur",
  "onKeyDown",
  "onDragStart",
  "onDragEnter",
  "onDragOver",
  "onDragLeave",
  "onDrop",
  "onDropAccepted",
  "onDropRejected",
  "onFileDialogCancel",
  "onCancel",
  "onRetry",
];

const FileUploaderBetaConfig: TConfig = {
  componentName: "FileUploaderBeta",
  imports: {
    "baseui/file-uploader-beta": { named: ["FileUploaderBeta"] },
  },
  scope: {
    FileUploaderBeta,
  },
  theme: [],
  props: {
    accept: {
      value: "",
      type: PropTypes.String,
      description:
        "Set accepted file types. See https://github.com/okonet/attr-accept for more information",
    },
    fileRows: {
      value: "[]",
      type: PropTypes.Array,
      description: "Array of file objects.",
      stateful: true,
    },
    setFileRows: {
      value: "newFileRows => setFileRows(newFileRows)",
      type: PropTypes.Function,
      description: "Function to set file rows.",
    },
    maxSize: {
      value: undefined,
      type: PropTypes.Number,
      description: "Maximum file size (in bytes).",
    },
    minSize: {
      value: undefined,
      type: PropTypes.Number,
      description: "Minimum file size (in bytes).",
    },
    multiple: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        "Allow drag n drop (or selection from the file dialog) of multiple files",
    },
    disableClick: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        "Disallow clicking on the dropzone container to open file dialog.",
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: "Renders component in disabled state.",
    },
    errorMessage: {
      value: undefined,
      type: PropTypes.String,
      description: "Error message to be displayed.",
    },
    ...changeHandlers.reduce((acc, current) => {
      //@ts-ignore
      acc[current] = {
        value: undefined,
        type: PropTypes.Function,
        description: `Called when the ${current} event is triggered.`,
        hidden: true,
      };
      return acc;
    }, {}),
    name: {
      value: undefined,
      type: PropTypes.String,
      description: "Name attribute.",
      hidden: true,
    },
    ["aria-describedby"]: {
      value: undefined,
      type: PropTypes.String,
      description: `Sets aria-describedby attribute.`,
      hidden: true,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: [
          { ...iconConfig, componentName: "AlertIcon" },
          { ...iconConfig, componentName: "CircleCheckFilledIcon" },
          "FileRow",
          "FileRowColumn",
          "FileRowContent",
          "FileRowFileName",
          "FileRowText",
          "FileRowUploadMessage",
          "FileRowUploadText",
          "FileRows",
          "Hint",
          "ImagePreviewThumbnail",
          "ItemPreviewContainer",
          "Label",
          { ...iconConfig, componentName: "PaperclipFilledIcon" },
          "ParentRoot",
          { ...iconConfig, componentName: "TrashCanFilledIcon" },
          "TrashCanFilledIconContainer",
        ],
        sharedProps: {},
      },
    },
  },
};

export default FileUploaderBetaConfig;
