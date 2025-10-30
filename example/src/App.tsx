import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from '../../src';

const Button = ({
  label,
  onPress,
  color = '#333',
}: {
  label: string;
  onPress: () => void;
  color?: string;
}) => (
  <TouchableOpacity
    style={[styles.btn, { backgroundColor: color }]}
    onPress={onPress}
  >
    <Text style={styles.btnText}>{label}</Text>
  </TouchableOpacity>
);

export default function App() {
  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.heading}>✨ Top Toast</Text>

          <Button
            label="Info Toast"
            onPress={() =>
              Toast.show({
                type: 'info',
                title: 'This is a info toast.',
                autoHide: true,
              })
            }
          />

          <Button
            label="Success Toast"
            color="#2ecc71"
            onPress={() =>
              Toast.show({
                type: 'success',
                title: 'Hello 👋',
                message: 'This is a success toast.',
                autoHide: true,
              })
            }
          />

          <Button
            label="Error Toast"
            color="#e74c3c"
            onPress={() =>
              Toast.show({
                type: 'error',
                title: 'Hello 👋',
                message: 'This is a error toast.',
                autoHide: true,
              })
            }
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>✨ Bottom Toast</Text>

          <Button
            label="Info Toast"
            onPress={() =>
              Toast.show({
                type: 'info',
                title: 'Hello 👋',
                message: 'This is a info toast.',
                autoHide: true,
                position: 'bottom',
              })
            }
          />

          <Button
            label="Success Toast"
            color="#2ecc71"
            onPress={() =>
              Toast.show({
                type: 'success',
                title: 'Hello 👋',
                message: 'This is a success toast.',
                autoHide: true,
                position: 'bottom',
              })
            }
          />

          <Button
            label="Error Toast"
            color="#e74c3c"
            onPress={() =>
              Toast.show({
                type: 'error',
                title: 'Hello 👋',
                message: 'This is a error toast.',
                autoHide: true,
                position: 'bottom',
              })
            }
          />
        </View>
      </ScrollView>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  section: {
    marginVertical: 20,
    width: '100%',
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#555',
  },
  btn: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
  },
});
