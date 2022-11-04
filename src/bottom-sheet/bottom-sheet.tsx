/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { withStyle } from '../styles/index';
import { StyledDivider as StyledDividerBase, SIZE as DIVIDER_SIZE } from '../divider';
import { Button, KIND, SHAPE, SIZE } from '../button';
import { ProgressBar, SIZE as PROGESS_BAR_SIZE } from '../progress-bar';
import {
  StyledRoot,
  StyledBottomContainer,
  StyledHeader,
  StyledHeaderInner,
  StyledContent,
  StyledTitle,
  StyledDescription,
  StyledGrabber,
} from './styled-components';
import type { BottomSheetProps } from './types';

const renderContent = (content) => {
  return typeof content === 'function' ? content() : content;
};

const renderButtonContent = (content) => {
  if (typeof content === 'string') {
    return content;
  }
  const Icon = content;
  return <Icon size={32} />;
};

const StyledDivider = withStyle(StyledDividerBase, { marginTop: 0, marginBottom: 0 });

const DefaultActionButton = ({ children, ...restProps }) => {
  const hasTextContent = typeof children === 'string';

  const style = {
    ...(!hasTextContent
      ? {
          // height: '48px',
          // width: '48px',
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }
      : {}),
  };

  return (
    <Button
      kind={KIND.tertiary}
      shape={SHAPE.square}
      overrides={{
        BaseButton: {
          style,
        },
      }}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export function BottomSheet({
  overrides = {},
  title,
  description,
  content,
  positions,
  leadingAction,
  trailingAction,
  progressBar,
  children,
}: BottomSheetProps) {
  const [positionIdx, setPositionIdx] = React.useState(0);

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [BottomContainer, bottomContainerProps] = getOverrides(
    overrides.BottomContainer,
    StyledBottomContainer
  );
  const [Header, headerProps] = getOverrides(overrides.Header, StyledHeader);
  const [HeaderInner, headerInnerProps] = getOverrides(overrides.HeaderInner, StyledHeaderInner);
  const [Title, titleProps] = getOverrides(overrides.Title, StyledTitle);
  const [Description, descriptionProps] = getOverrides(overrides.Description, StyledDescription);
  const [Content, contentProps] = getOverrides(overrides.Content, StyledContent);
  const [Grabber, grabberProps] = getOverrides(overrides.Grabber, StyledGrabber);
  const [Divider, dividerProps] = getOverrides(overrides.Divider, StyledDivider);
  const [ActionButton, actionButtonProps] = getOverrides(overrides.Divider, DefaultActionButton);

  const cyclePosition = () => {
    const nextPositionIdx = positionIdx + 1;
    if (nextPositionIdx < positions.length) {
      setPositionIdx(nextPositionIdx);
    } else {
      setPositionIdx(0);
    }
  };

  const isDraggable = Boolean(positions);
  const hasTitle = Boolean(title);
  const hasDescription = Boolean(description);
  const hasLeadingAction = Boolean(leadingAction);
  const hasTrailingAction = Boolean(trailingAction);

  return (
    <Root {...rootProps}>
      {children}
      <BottomContainer $position={isDraggable && positions[positionIdx]} {...bottomContainerProps}>
        <Header
          $hasLeadingAction={hasLeadingAction}
          $hasTrailingAction={hasTrailingAction}
          {...headerProps}
        >
          {leadingAction && (
            <ActionButton
              onClick={leadingAction.onClick}
              aria-label={leadingAction.label}
              size={hasTitle ? SIZE.large : SIZE.default}
              {...actionButtonProps}
            >
              {renderButtonContent(leadingAction.renderIcon || leadingAction.label)}
            </ActionButton>
          )}
          <HeaderInner
            $isDraggable={isDraggable}
            $hasTitle={hasTitle}
            $hasDescription={hasDescription}
            {...headerInnerProps}
          >
            {isDraggable && <Grabber onClick={cyclePosition} {...grabberProps} />}
            {title && <Title {...titleProps}>{title}</Title>}
            {description && <Description {...descriptionProps}>{description}</Description>}
          </HeaderInner>
          {trailingAction && (
            <ActionButton
              onClick={trailingAction.onClick}
              aria-label={trailingAction.label}
              size={hasTitle ? SIZE.large : SIZE.default}
              {...actionButtonProps}
            >
              {renderButtonContent(trailingAction.renderIcon || trailingAction.label)}
            </ActionButton>
          )}
        </Header>
        {progressBar ? (
          <ProgressBar
            size={PROGESS_BAR_SIZE.small}
            overrides={{ BarContainer: { style: { marginTop: 0, marginBottom: 0 } } }}
            {...progressBar}
          />
        ) : (
          <Divider $size={DIVIDER_SIZE.section} overrides={{}} {...dividerProps} />
        )}
        <Content {...contentProps}>{renderContent(content)}</Content>
      </BottomContainer>
    </Root>
  );
}

export default BottomSheet;