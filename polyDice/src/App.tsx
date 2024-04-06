import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Dice from './components/dice';
import BackgroundChanger from './components/shapeBackground';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

function App(): JSX.Element {

  const [shouldRoll, setShouldRoll] = useState(false);

  const handlePress = () => {
    setShouldRoll(!shouldRoll); // Toggle roll state on press
    ReactNativeHapticFeedback.trigger("impactHeavy");
  };

  return (
    <View style={styles.container}>
      <BackgroundChanger shouldRoll={shouldRoll} />
      <Dice shouldRoll={shouldRoll} />
      <Pressable
        onPress={handlePress}
      >
        <Text style={styles.rollDiceBtnText}>Roll Dice</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E5E0FF',
    fontSize: 16,
    color: '#8EA7E9',
    fontWeight: '700',
    textTransform: 'uppercase',
  }
})

export default App;