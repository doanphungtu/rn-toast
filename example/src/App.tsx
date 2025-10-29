import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { multiply } from '../../src/index';

const result = multiply(3, 7);

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Result: {result}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
