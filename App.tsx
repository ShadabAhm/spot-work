import { MagicButton } from 'ahmad-rn-magic-button';
import React, { useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import Student from './student';

function App(): React.JSX.Element {
  const [cart, setCart] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MagicButton />
        <Student name="Shadab" />
        <Student name="Ahmad" />
        <Student name="Khan" />
        <Student name="Ansari" />
        <Student name="Alam" />
        <Student name="Siddique" />
        <Student cartCount={cart} />
      </View>
      <Text>Cart {cart}</Text>
      <View style={{ padding: 20 }}>
        <Button title="Add to Cart" onPress={() => setCart(cart + 1)} />
      </View>
    </SafeAreaView>
  );
}

export default App;
