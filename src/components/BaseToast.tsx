import React from 'react';
import { Text, View } from 'react-native';

import type { BaseToastProps } from '../types';
import { getTestId } from '../utils';
import { styles } from './BaseToast.styles';

export function BaseToast({
  title,
  message,
  style,
  containerProps,
  contentContainerStyle,
  contentContainerProps,
  titleStyle,
  titleProps,
  messageStyle,
  messageProps,
  renderLeadingIcon,
  renderTrailingIcon,
}: BaseToastProps): React.ReactElement {
  return (
    <View
      testID={getTestId('ViewContainer')}
      style={[styles.base, style] as any}
      {...containerProps}
    >
      {renderLeadingIcon && renderLeadingIcon()}
      <View
        testID={getTestId('ContentContainer')}
        style={[styles.contentContainer, contentContainerStyle]}
        {...contentContainerProps}
      >
        {!!title && (
          <Text
            testID={getTestId('Title')}
            style={[styles.title, titleStyle]}
            numberOfLines={1}
            {...titleProps}
          >
            {title}
          </Text>
        )}
        {!!message && (
          <Text
            testID={getTestId('Message')}
            style={[styles.message, messageStyle]}
            numberOfLines={1}
            {...messageProps}
          >
            {message}
          </Text>
        )}
      </View>
      {renderTrailingIcon && renderTrailingIcon()}
    </View>
  );
}
