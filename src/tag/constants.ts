/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const SIZE = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export const HIERARCHY = Object.freeze({
  primary: 'primary',
  secondary: 'secondary',
} as const);

// todo: dynamic identity map generation
export const KIND = {
  custom: 'custom',
  // semantic
  neutral: 'neutral',
  primary: 'primary',
  accent: 'accent',
  positive: 'positive',
  warning: 'warning',
  negative: 'negative',
  // primitive
  black: 'black',
  blue: 'blue',
  green: 'green',
  red: 'red',
  yellow: 'yellow',
  orange: 'orange',
  purple: 'purple',
  brown: 'brown',
  teal: 'teal',
  lime: 'lime',
} as const;
