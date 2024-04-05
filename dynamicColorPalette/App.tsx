import React, { useState } from 'react';

import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


function App(): JSX.Element {

  const generateColor = () => {
    const hexRange = "0123456789ABCDEF"
    let color = "#"

    for (let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random() * 16)]
    }
    return color;
  };

  const [colors, setColors] = useState(() => {
    const colors = [];
    for (let i = 0; i < 3; i++) {
      colors.push(generateColor());
    }
    return colors;
  });

  const handlePress = () => {
    const newColors = colors.map((color) => generateColor()); // Generate new random colors for all elements
    while (newColors.some((color, index) => colors.includes(color) && color !== newColors[index])) {
      // Regenerate specific color if it matches any existing color (excluding itself)
      newColors[Math.floor(Math.random() * 3)] = generateColor(); // Randomly replace a color if needed
    }
    setColors(newColors);
  };

  const [randomBackground, triangleDye, squareDye] = colors; // Destructure colors array

  return (
    <>
      <StatusBar backgroundColor={randomBackground} />
      <View style={[styles.container, { backgroundColor: randomBackground }]}>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.actionBtn}>
            <Text style={styles.actionBtnText}> Press Me </Text>
          </View>
          <View style={[styles.triangle, { transform: [{ rotate: `${45}deg` }] }, { borderLeftColor: triangleDye }]}>
          </View>
          <View style={[styles.square, { backgroundColor: squareDye }]}>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionBtn: {
    borderRadius: 12,
    backgroundColor: '#6A1B4D',
    paddingVertical: 10,
    paddingHorizontal: 40
  },
  actionBtnText: {
    fontSize: 24,
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
  triangle: {
    width: 0,
    height: 0,
    position: 'absolute',
    bottom: 150,
    backgroundColor: 'transparent',
    borderLeftWidth: 100,
    borderTopWidth: 50,
    borderTopColor: 'transparent',
    borderStyle: 'solid'
  },
  square: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 150,
  }
});

export default App;