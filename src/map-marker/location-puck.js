/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { useStyletron } from '../styles/index.js';
import { getOverrides } from '../helpers/overrides.js';
import {
  LOCATION_PUCK_SIZES,
  LOCATION_PUCK_TYPES,
  EARNER_LOCATION_PUCK_CORE_SCALES,
  LOCATION_PUCK_CONFIDENCES,
} from './constants.js';
import type {
  LocationPuckPropsT,
  ConsumerLocationPuckPropsT,
  EarnerLocationPuckPropsT,
} from './types.js';
import {
  LocationPuckContainer,
  StyledConsumerLocationPuckCore,
  StyledLocationPuckApproximation,
  StyledEarnerLocationPuckCore,
} from './styled-components.js';

const ConsumerLocationPuckHeading = ({ bearing }) => {
  const [css, theme] = useStyletron();
  return (
    <svg
      className={css({
        height: `${6}px`,
        width: `${11}px`,
        position: 'absolute',
        color: theme.colors.contentAccent,
        transform: `rotate(${bearing}deg) translateY(-16px)`,
        transition: `${theme.animation.timing300} ${theme.animation.easeOutCurve} all`,
      })}
      width="11"
      height="6"
      viewBox="0 0 11 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 0L0 6L5.5 5L11 6L5.5 0Z"
        fill="currentColor"
      />
    </svg>
  );
};

const ConsumerLocationPuck = ({ bearing, confidence, overrides }: ConsumerLocationPuckPropsT) => {
  const [, theme] = useStyletron();
  const [ConsumerLocationPuckCore, consumerLocationPuckCoreProps] = getOverrides(
    overrides.ConsumerLocationPuckCore,
    StyledConsumerLocationPuckCore
  );

  const [LocationPuckApproximation, locationPuckApproximationProps] = getOverrides(
    overrides.LocationPuckApproximation,
    StyledLocationPuckApproximation
  );

  return (
    <LocationPuckContainer>
      <LocationPuckApproximation
        $color={theme.colors.contentAccent}
        $confidence={confidence}
        {...locationPuckApproximationProps}
      />
      <ConsumerLocationPuckCore {...consumerLocationPuckCoreProps} />
      <ConsumerLocationPuckHeading bearing={bearing} />
    </LocationPuckContainer>
  );
};

const EarnerLocationPuckHeading = ({ size, color, bearing }) => {
  const [css, theme] = useStyletron();
  return (
    <svg
      className={css({
        position: 'absolute',
        transition: `${theme.animation.timing300} ${theme.animation.easeOutCurve} all`,
        transform: `rotate(${bearing}deg) scale(${EARNER_LOCATION_PUCK_CORE_SCALES[size]})`,
      })}
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36 20L52 52L36 42.8571L20 52L36 20Z"
        fill={color}
      />
    </svg>
  );
};

const EarnerLocationPuck = ({ bearing, confidence, size, overrides }: EarnerLocationPuckPropsT) => {
  const [, theme] = useStyletron();
  const color = theme.colors.contentAccent;
  const [LocationPuckApproximation, locationPuckApproximationProps] = getOverrides(
    overrides.LocationPuckApproximation,
    StyledLocationPuckApproximation
  );
  const [EarnerLocationPuckCore, earnerLocationPuckCoreProps] = getOverrides(
    overrides.EarnerLocationPuckCore,
    StyledEarnerLocationPuckCore
  );

  return (
    <LocationPuckContainer>
      <LocationPuckApproximation
        $color={color}
        $confidence={confidence}
        {...locationPuckApproximationProps}
      />
      <EarnerLocationPuckCore $color={color} $size={size} {...earnerLocationPuckCoreProps} />
      <EarnerLocationPuckHeading size={size} color={color} bearing={bearing} />
    </LocationPuckContainer>
  );
};

const LocationPuck = ({
  size = LOCATION_PUCK_SIZES.medium,
  bearing = 0,
  confidence = LOCATION_PUCK_CONFIDENCES.medium,
  type = LOCATION_PUCK_TYPES.consumer,
  overrides = {},
}: LocationPuckPropsT) => {
  if (__DEV__) {
    if (size !== LOCATION_PUCK_SIZES.medium && type === LOCATION_PUCK_TYPES.consumer) {
      console.warn(`Location puck size can only be applied to type === LOCATION_PUCK_TYPES.earner`);
    }
  }

  const sharedProps = {
    bearing,
    confidence,
    overrides,
  };

  return type === LOCATION_PUCK_TYPES.consumer ? (
    <ConsumerLocationPuck {...sharedProps} />
  ) : (
    <EarnerLocationPuck {...sharedProps} size={size} />
  );
};

export default LocationPuck;