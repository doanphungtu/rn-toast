import { act, cleanup, render } from '@testing-library/react-native';
import { Text } from 'react-native';

import { Toast } from '../Toast';
import { BaseToast } from '../components/BaseToast';
import { ErrorToast } from '../components/ErrorToast';
import { InfoToast } from '../components/InfoToast';
import { SuccessToast } from '../components/SuccessToast';
import type { ToastConfig } from '../types';

jest.mock('../components/AnimatedContainer', () => ({
  AnimatedContainer: jest.fn(({ children }) => <>{children}</>),
}));

import { AnimatedContainer } from '../components/AnimatedContainer';

const mockedAnimatedContainer = AnimatedContainer as jest.MockedFunction<
  typeof AnimatedContainer
>;

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  Toast.hide();
  cleanup();
  jest.clearAllMocks();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('Toast', () => {
  it('renders the animated container with default configuration', () => {
    render(<Toast />);

    expect(mockedAnimatedContainer).toHaveBeenCalledTimes(1);
    const props = mockedAnimatedContainer.mock.calls[0]?.[0];
    expect(props?.isVisible).toBe(false);
    expect(props?.position).toBe('top');
    expect(props?.topOffset).toBe(40);
    expect(props?.bottomOffset).toBe(40);
  });

  it('shows toast content when Toast.show is invoked', () => {
    const { getByText } = render(<Toast />);

    act(() => {
      Toast.show({
        type: 'success',
        title: 'Success',
        message: 'Everything is fine',
        autoHide: false,
      });
    });

    expect(getByText('Success')).toBeTruthy();
    expect(getByText('Everything is fine')).toBeTruthy();

    const lastCall =
      mockedAnimatedContainer.mock.calls[
        mockedAnimatedContainer.mock.calls.length - 1
      ];
    const props = lastCall?.[0];
    expect(props?.isVisible).toBe(true);
  });

  it('calls the supplied onHide callback when Toast.hide is executed', () => {
    const onHide = jest.fn();
    render(<Toast />);

    act(() => {
      Toast.show({
        type: 'success',
        title: 'Hide me',
        autoHide: false,
        onHide,
      });
    });

    act(() => {
      Toast.hide();
    });

    expect(onHide).toHaveBeenCalledTimes(1);
    const lastCall =
      mockedAnimatedContainer.mock.calls[
        mockedAnimatedContainer.mock.calls.length - 1
      ];
    const props = lastCall?.[0];
    expect(props?.isVisible).toBe(false);
  });

  it('auto hides after the default visibility time', () => {
    render(<Toast />);

    act(() => {
      Toast.show({
        title: 'Auto-hide',
      });
    });

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    const lastCall =
      mockedAnimatedContainer.mock.calls[
        mockedAnimatedContainer.mock.calls.length - 1
      ];
    const props = lastCall?.[0];
    expect(props?.isVisible).toBe(false);
  });

  it('supports rendering a custom toast type defined via config', () => {
    const CustomToast = ({ title }: { title?: string }) => (
      <Text testID="custom-toast">{title}</Text>
    );

    const config: ToastConfig = {
      custom: ({ title }) => <CustomToast title={title} />,
    };

    const { getByTestId } = render(<Toast config={config} />);

    act(() => {
      Toast.show({
        type: 'custom',
        title: 'Custom text',
        autoHide: false,
      });
    });

    expect(getByTestId('custom-toast').props.children).toBe('Custom text');
  });

  it('does not throw when show is called without a mounted instance', () => {
    expect(() => {
      Toast.show({ type: 'success', title: 'Orphan toast' });
    }).not.toThrow();
  });
});

describe('Component exports', () => {
  it('exposes BaseToast', () => {
    expect(BaseToast).toBeDefined();
    expect(typeof BaseToast).toBe('function');
  });

  it('exposes SuccessToast', () => {
    expect(SuccessToast).toBeDefined();
    expect(typeof SuccessToast).toBe('function');
  });

  it('exposes ErrorToast', () => {
    expect(ErrorToast).toBeDefined();
    expect(typeof ErrorToast).toBe('function');
  });

  it('exposes InfoToast', () => {
    expect(InfoToast).toBeDefined();
    expect(typeof InfoToast).toBe('function');
  });
});
