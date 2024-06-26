/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { primitiveColors as colors, primitiveDarkColors } from '../tokens';
import { BACKGROUND_COLOR_TYPE } from './constants';

const LIGHT_COLORS = new Set([
  colors.red50,
  colors.red100,
  colors.red200,
  colors.red300,
  colors.red400,
  colors.green50,
  colors.green100,
  colors.green200,
  colors.green300,
  colors.green400,
  colors.teal50,
  colors.teal100,
  colors.teal200,
  colors.teal300,
  colors.teal400,
  colors.blue50,
  colors.blue100,
  colors.blue200,
  colors.blue300,
  colors.blue400,
  colors.cobalt50,
  colors.cobalt100,
  colors.cobalt200,
  colors.purple50,
  colors.purple100,
  colors.purple200,
  colors.purple300,
  colors.purple400,
  colors.magenta50,
  colors.magenta100,
  colors.magenta200,
  colors.magenta300,
  colors.magenta400,
  colors.brown50,
  colors.brown100,
  colors.brown200,
  colors.brown300,
  colors.orange50,
  colors.orange100,
  colors.orange200,
  colors.orange300,
  colors.orange400,
  colors.lime50,
  colors.lime100,
  colors.lime200,
  colors.lime300,
  colors.lime400,
  colors.platinum50,
  colors.platinum100,
  colors.platinum200,
  colors.platinum300,
  colors.platinum400,
  colors.yellow50,
  colors.yellow100,
  colors.yellow200,
  colors.yellow300,
  colors.yellow400,
  colors.white,
  colors.gray50,
  colors.gray100,
  colors.gray200,
  colors.gray300,
  colors.gray400,
]);

const DARK_COLORS = new Set([
  colors.red600,
  colors.red700,
  colors.red800,
  colors.red900,
  colors.green600,
  colors.green700,
  colors.green800,
  colors.green900,
  colors.teal600,
  colors.teal700,
  colors.teal800,
  colors.teal900,
  colors.blue600,
  colors.blue700,
  colors.blue800,
  colors.blue900,
  colors.purple600,
  colors.purple700,
  colors.purple800,
  colors.purple900,
  colors.cobalt300,
  colors.cobalt400,
  colors.cobalt500,
  colors.cobalt600,
  colors.cobalt700,
  colors.magenta600,
  colors.magenta700,
  colors.magenta800,
  colors.magenta900,
  colors.brown400,
  colors.brown500,
  colors.brown600,
  colors.brown700,
  colors.orange600,
  colors.orange700,
  colors.orange800,
  colors.orange900,
  colors.lime600,
  colors.lime700,
  colors.lime800,
  colors.lime900,
  colors.platinum500,
  colors.platinum600,
  colors.platinum700,
  colors.platinum800,
  colors.yellow600,
  colors.yellow700,
  colors.yellow800,
  colors.yellow900,
  colors.gray600,
  colors.gray700,
  colors.gray800,
  colors.gray900,
  colors.black,
]);

const POOR_CONTRAST_COLORS = new Set([
  colors.gray500,
  colors.red500,
  colors.orange500,
  colors.amber500,
  colors.yellow600,
  colors.lime500,
  colors.green500,
  colors.teal500,
  colors.blue500,
  colors.purple500,
  colors.magenta500,
]);

const DARK_COLOR_TOKENS = new Set([...Object.values(primitiveDarkColors)]);

export function getBackgroundColorType(backgroundColor: string) {
  if (__DEV__ && POOR_CONTRAST_COLORS.has(backgroundColor)) {
    console.warn(
      `The provided value for backgroundColor, ${backgroundColor}, is not supported because \
        it does not pass accessibility contrast tests for either white or black text.`
    );
    return null;
  }
  if (
    __DEV__ &&
    ![colors.white, colors.black].includes(backgroundColor) &&
    DARK_COLOR_TOKENS.has(backgroundColor)
  ) {
    console.warn(
      `It looks like you're supplying a primitive color token from the "dark" theme color ramp for MessageCard's backgroundColor. Only color tokens from the "light" theme color ramp are supported. MessageCard uses an overlay for dark mode.`
    );
  }
  if (LIGHT_COLORS.has(backgroundColor)) {
    return BACKGROUND_COLOR_TYPE.light;
  }
  if (DARK_COLORS.has(backgroundColor)) {
    return BACKGROUND_COLOR_TYPE.dark;
  }
  return null;
}
