import React from 'react';
import { useTimeout } from './useTimeout';
import type {
  ToastData,
  ToastOptions,
  ToastProps,
  ToastShowParams,
} from '../types';
import { mergeIfDefined } from '../utils';

export const DEFAULT_DATA: ToastData = {
  title: undefined,
  message: undefined,
};

export const DEFAULT_OPTIONS: Required<ToastOptions> = {
  type: 'success',
  titleStyle: null,
  messageStyle: null,
  position: 'top',
  autoHide: true,
  visibilityTime: 4000,
  topOffset: 40,
  bottomOffset: 40,
  onShow: Function,
  onHide: Function,
  onPress: Function,
  props: {},
};

export type UseToastParams = {
  defaultOptions: Omit<ToastProps, 'config'>;
};

export function useToast({ defaultOptions }: UseToastParams) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [data, setData] = React.useState<ToastData>(DEFAULT_DATA);

  const initialOptions = mergeIfDefined(
    DEFAULT_OPTIONS,
    defaultOptions
  ) as Required<ToastOptions>;
  const [options, setOptions] =
    React.useState<Required<ToastOptions>>(initialOptions);

  const onAutoHide = React.useCallback(() => {
    setIsVisible(false);
    options.onHide();
  }, [options]);

  const { startTimer, clearTimer } = useTimeout(
    onAutoHide,
    options.visibilityTime
  );

  const hide = React.useCallback(() => {
    setIsVisible(false);
    clearTimer();
    options.onHide();
  }, [clearTimer, options]);

  const show = React.useCallback(
    (params: ToastShowParams) => {
      const {
        title = DEFAULT_DATA.title,
        message = DEFAULT_DATA.message,
        type = initialOptions.type,
        titleStyle = initialOptions.titleStyle,
        messageStyle = initialOptions.messageStyle,
        position = initialOptions.position,
        autoHide = initialOptions.autoHide,
        visibilityTime = initialOptions.visibilityTime,
        topOffset = initialOptions.topOffset,
        bottomOffset = initialOptions.bottomOffset,
        onShow = initialOptions.onShow,
        onHide = initialOptions.onHide,
        onPress = initialOptions.onPress,
        props = initialOptions.props,
      } = params;
      setData({
        title,
        message,
      });
      setOptions(
        mergeIfDefined(initialOptions, {
          type,
          titleStyle,
          messageStyle,
          position,
          autoHide,
          visibilityTime,
          topOffset,
          bottomOffset,
          onShow,
          onHide,
          onPress,
          props,
        }) as Required<ToastOptions>
      );
      setIsVisible(true);
      onShow();
    },
    [initialOptions]
  );

  React.useEffect(() => {
    const { autoHide } = options;
    if (isVisible) {
      if (autoHide) {
        startTimer();
      } else {
        clearTimer();
      }
    }
  }, [isVisible, options, startTimer, clearTimer]);

  return {
    isVisible,
    data,
    options,
    show,
    hide,
  };
}
