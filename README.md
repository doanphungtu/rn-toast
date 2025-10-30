# @tudp/rn-toast

Animated toast notifications for React Native with a simple imperative API and friendly defaults.

## Features
- 🔔 Imperative `Toast.show` / `Toast.hide` API that works anywhere in your app tree
- 🎨 Out-of-the-box success, error, and info layouts with matching leading icons
- ⚙️ Configurable defaults for position, auto-hide timing, callbacks, and styles
- 🧩 Extensible `config` prop that lets you render any custom toast component
- 🪶 Zero extra setup for consumers — no SVG transformers or native modules required

## Installation

```bash
yarn add @tudp/rn-toast
# or
npm install @tudp/rn-toast
```

The package depends on `react` and `react-native` which must already exist in your project.

## Getting Started

1. **Render the `<Toast />` component once** near the root of your app (it can also live inside portals/modals if you need multiple instances).
2. **Call `Toast.show`** from anywhere to display a notification. The latest mounted toast instance receives the command.

```tsx
import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import Toast from '@tudp/rn-toast';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        title="Show success"
        onPress={() =>
          Toast.show({
            type: 'success',
            title: 'Saved',
            message: 'Your profile has been updated.',
          })
        }
      />

      <Toast />
    </SafeAreaView>
  );
}
```

Hide the current toast explicitly:

```ts
Toast.hide();
```

## API

### `<Toast />` props
All props are optional; values become defaults for every toast shown via `Toast.show`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'success' | 'error' | 'info' | string` | `'success'` | Default toast type |
| `position` | `'top' | 'bottom'` | `'top'` | Where the toast slides from |
| `autoHide` | `boolean` | `true` | Auto hide after `visibilityTime` ms |
| `visibilityTime` | `number` | `4000` | Delay before auto hide |
| `topOffset` | `number` | `40` | Offset from top when `position="top"` |
| `bottomOffset` | `number` | `40` | Offset from bottom when `position="bottom"` |
| `onShow` | `() => void` | noop | Called whenever any toast is shown |
| `onHide` | `() => void` | noop | Called whenever any toast hides |
| `onPress` | `() => void` | noop | Called when the toast body is pressed |
| `config` | `ToastConfig` | built-ins | Map of toast type to renderer |

### `Toast.show(options)`
Displays a toast. `options` extends the props above with per-toast overrides plus:

- `title?: string`
- `message?: string`
- `titleStyle?: StyleProp<TextStyle>`
- `messageStyle?: StyleProp<TextStyle>`
- `props?: any` → forwarded to custom renderer

### `Toast.hide()`
Immediately hides the currently visible toast.

## Custom Toast Layouts

Provide a `config` object to `<Toast />` or pass a `type` with the same key to `Toast.show`.

```tsx
const config = {
  warning: ({ title, message, hide }) => (
    <WarningToast
      title={title}
      message={message}
      onDismiss={hide}
    />
  ),
};

<Toast config={config} />;

Toast.show({
  type: 'warning',
  title: 'Heads up',
  message: 'You are almost out of storage.',
});
```

## Built-in Toasts

The library exports ready-to-use components if you want to render them directly:

```ts
import { SuccessToast, ErrorToast, InfoToast } from '@tudp/rn-toast';
```
Each ships with a colored leading icon that matches the toast type.

## Development

```bash
yarn install
yarn lint
yarn test
```

`yarn prepare` builds distribution files into `lib/` (ignored by git but picked up during npm publish).

## License

[MIT](LICENSE)
