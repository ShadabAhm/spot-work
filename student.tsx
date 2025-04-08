import { Text, View } from 'react-native';

function Student(props: { name?: string; cartCount?: number }): React.JSX.Element {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
      {props.name && (
        <Text style={{ fontSize: 20 }}>
          Hello, {props.name}
        </Text>
      )}
      {props.cartCount !== undefined && (
        <Text style={{ fontSize: 30, color:'green', fontWeight: '700' }}>
          Cart: {props.cartCount}
        </Text>
      )}
    </View>
  );
}

export default Student;
