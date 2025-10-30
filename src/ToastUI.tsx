import { AnimatedContainer } from './components/AnimatedContainer';
import { ErrorToast } from './components/ErrorToast';
import { InfoToast } from './components/InfoToast';
import { SuccessToast } from './components/SuccessToast';
import type {
  ToastConfig,
  ToastData,
  ToastHideParams,
  ToastOptions,
  ToastShowParams,
} from './types';

export type ToastUIProps = {
  isVisible: boolean;
  options: Required<ToastOptions>;
  data: ToastData;
  show: (params: ToastShowParams) => void;
  hide: (params: ToastHideParams) => void;
  config?: ToastConfig;
};

const defaultToastConfig: ToastConfig = {
  success: (props) => <SuccessToast {...props} />,
  error: (props) => <ErrorToast {...props} />,
  info: (props) => <InfoToast {...props} />,
};

function renderComponent({
  data,
  options,
  config,
  isVisible,
  show,
  hide,
}: ToastUIProps) {
  const { title, message } = data;
  const { type, onPress, titleStyle, messageStyle, position, props } = options;

  const toastConfig = {
    ...defaultToastConfig,
    ...config,
  };
  const ToastComponent = toastConfig[type];

  if (!ToastComponent) {
    throw new Error(
      `Toast type: '${type}' does not exist. You can add it via the 'config' prop on the Toast instance. Learn more: https://github.com/doanphungtu/rn-toast/blob/master/README.md`
    );
  }

  return ToastComponent({
    position,
    type,
    isVisible,
    title,
    message,
    titleStyle,
    messageStyle,
    show,
    hide,
    onPress,
    props,
  });
}

export function ToastUI(props: ToastUIProps) {
  const { isVisible, options, hide } = props;
  const { position, topOffset, bottomOffset } = options;

  return (
    <AnimatedContainer
      isVisible={isVisible}
      position={position}
      topOffset={topOffset}
      bottomOffset={bottomOffset}
      onHide={hide}
    >
      {renderComponent(props)}
    </AnimatedContainer>
  );
}
