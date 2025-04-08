import { multiply } from 'react-native-rn-package';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [result, setResult] = useState<number | undefined>();

  useEffect(() => {
    multiply(3, 8).then(setResult);
  }, []);

  const [count, setCount] = useState(0); // Counter state
  const incrementCount = () => {
    setCount(count + 1); // Increases counter by 1
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Result: {result}</Text>
      <Text style={styles.counterText}>Count: {count}</Text>

      <TouchableOpacity style={styles.button} onPress={incrementCount}>
        <Text style={styles.buttonText}>Increment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  counterText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 3, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
