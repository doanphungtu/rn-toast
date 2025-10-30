import React from 'react';
import { Animated, type LayoutChangeEvent } from 'react-native';

import type { ReactChildren, ToastPosition } from '../types';
import { getTestId } from '../utils';
import { styles } from './AnimatedContainer.styles';

export type AnimatedContainerProps = {
  children: ReactChildren;
  isVisible: boolean;
  position: ToastPosition;
  topOffset: number;
  bottomOffset: number;
  onHide: () => void;
};

const SPRING_CONFIG = {
  useNativeDriver: true,
  friction: 8,
};

const DEFAULT_HIDDEN_DISTANCE = 120;

function getOutputRange({
  position,
  topOffset,
  bottomOffset,
  containerHeight,
}: {
  position: ToastPosition;
  topOffset: number;
  bottomOffset: number;
  containerHeight: number;
}) {
  if (position === 'top') {
    return [-(containerHeight + topOffset), topOffset];
  }

  return [containerHeight + bottomOffset, -bottomOffset];
}

export function AnimatedContainer({
  children,
  isVisible,
  position,
  topOffset,
  bottomOffset,
}: AnimatedContainerProps) {
  const animatedValue = React.useRef(
    new Animated.Value(isVisible ? 1 : 0)
  ).current;
  const [containerHeight, setContainerHeight] = React.useState(
    DEFAULT_HIDDEN_DISTANCE
  );

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      ...SPRING_CONFIG,
      toValue: isVisible ? 1 : 0,
    }).start();
  }, [animatedValue, isVisible]);

  const outputRange = React.useMemo(
    () =>
      getOutputRange({
        position,
        topOffset,
        bottomOffset,
        containerHeight,
      }),
    [bottomOffset, containerHeight, position, topOffset]
  );

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange,
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, 1, 1],
  });

  const handleLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      if (height && Math.abs(height - containerHeight) > 1) {
        setContainerHeight(height);
      }
    },
    [containerHeight]
  );

  return (
    <Animated.View
      testID={getTestId('AnimatedContainer')}
      style={[
        styles.base,
        styles[position],
        { opacity, transform: [{ translateY }] },
      ]}
      pointerEvents="box-none"
      onLayout={handleLayout}
    >
      {children}
    </Animated.View>
  );
}
