import React from 'react';
import type {
  StyleProp,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
} from 'react-native';

export type ReactChildren = React.ReactNode;

export type ToastType = 'success' | 'error' | 'info' | (string & {});
export type ToastPosition = 'top' | 'bottom';

export type ToastOptions = {
  /**
   * Toast type.
   * Default value: `success`
   */
  type?: ToastType;
  /**
   * Style for the header text in the Toast (title).
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Style for the inner message text in the Toast (message).
   */
  messageStyle?: StyleProp<TextStyle>;
  /**
   * Toast position.
   * Default value: `top`
   */
  position?: ToastPosition;
  /**
   * When `true`, the visible Toast automatically hides after a certain number of milliseconds,
   * specified by the `visibilityTime` prop.
   * Default value: `true`
   */
  autoHide?: boolean;
  /**
   * Number of milliseconds after which Toast automatically hides.
   * Has effect only in conjunction with `autoHide` prop set to `true`.
   * Default value: `4000`
   */
  visibilityTime?: number;
  /**
   * Offset from the top of the screen (in px).
   * Has effect only when `position` is `top`
   * Default value: `40`
   */
  topOffset?: number;
  /**
   * Offset from the bottom of the screen (in px)
   * Has effect only when `position` is `bottom`
   * Default value: `40`
   */
  bottomOffset?: number;
  /**
   * Called when Toast is shown
   */
  onShow?: () => void;
  /**
   * Called when Toast hides
   */
  onHide?: () => void;
  /**
   * Called on Toast press
   */
  onPress?: () => void;
  /**
   * Any custom props passed to the specified Toast type.
   * Has effect only when there is a custom Toast type (configured via the `config` prop
   * on the Toast instance) that uses the `props` parameter
   */
  props?: any;
};

export type ToastData = {
  title?: string;
  message?: string;
};

export type ToastShowParams = ToastData & ToastOptions;

export type ToastHideParams = void;

export type BaseToastProps = {
  title?: string;
  message?: string;
  style?: StyleProp<ViewStyle>;
  containerProps?: TouchableOpacityProps;
  contentContainerStyle?: StyleProp<ViewStyle>;
  contentContainerProps?: ViewProps;
  titleStyle?: StyleProp<TextStyle>;
  titleProps?: TextProps;
  messageStyle?: StyleProp<TextStyle>;
  messageProps?: TextProps;
  renderLeadingIcon?: () => React.ReactNode;
  renderTrailingIcon?: () => React.ReactNode;
};

export type ToastConfigParams<Props> = {
  position: ToastPosition;
  type: ToastType;
  isVisible: boolean;
  title?: string;
  message?: string;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
  show: (params: ToastShowParams) => void;
  hide: (params: ToastHideParams) => void;
  onPress: () => void;
  props: Props;
};

export type ToastConfig = {
  [key: string]: (params: ToastConfigParams<any>) => React.ReactNode;
};

export type ToastRef = {
  show: (params: ToastShowParams) => void;
  hide: (params: ToastHideParams) => void;
};

/**
 * `props` that can be set on the Toast instance.
 * They act as defaults for all Toasts that are shown.
 */
export type ToastProps = {
  /**
   * Layout configuration for custom Toast types
   */
  config?: ToastConfig;
  /**
   * Toast type.
   * Default value: `success`
   */
  type?: ToastType;
  /**
   * Toast position.
   * Default value: `top`
   */
  position?: ToastPosition;
  /**
   * Number of milliseconds after which Toast automatically hides.
   * Has effect only in conjunction with `autoHide` prop set to `true`.
   * Default value: `4000`
   */
  visibilityTime?: number;
  /**
   * When `true`, the visible Toast automatically hides after a certain number of milliseconds,
   * specified by the `visibilityTime` prop.
   * Default value: `true`
   */
  autoHide?: boolean;
  /**
   * Offset from the top of the screen (in px).
   * Has effect only when `position` is `top`
   * Default value: `40`
   */
  topOffset?: number;
  /**
   * Offset from the bottom of the screen (in px)
   * Has effect only when `position` is `bottom`
   * Default value: `40`
   */
  bottomOffset?: number;
  /**
   * Called when any Toast is shown
   */
  onShow?: () => void;
  /**
   * Called when any Toast hides
   */
  onHide?: () => void;
  /**
   * Called on any Toast press
   */
  onPress?: () => void;
};
