import React, { memo, useEffect, useState } from 'react';

import {
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

const BackgroundChanger = memo(({ shouldRoll }: { shouldRoll: boolean }) => {
    // const shapes = ["square", "circle", "triangle"]
    // const [randomShapes, setRandomShapes] = useState<string[]>([]);
    // const [numShapes, setNumShapes] = useState(Math.floor(Math.random() * 3));

    // const handleShapeGeneration = () => {
    //     const newShapes = [];
    //     for (let i = 0; i < numShapes; i++) {
    //         const randomIndex = Math.floor(Math.random() * shapes.length);
    //         newShapes.push(shapes[randomIndex]);
    //     }
    //     setRandomShapes(newShapes);
    //     setNumShapes(Math.floor(Math.random() * 3)); // Update the numShapes state
    // };

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
        for (let i = 0; i < 1; i++) {
            colors.push(generateColor());
        }
        return colors;
    });

    // const handlePress = () => {
    //     const newColors = colors.map(() => generateColor());
    //     while (newColors.some((color, index) => colors.includes(color) && color !== newColors[index])) {

    //         newColors[randomShapes.length + 1] = generateColor();
    //     }
    //     setColors(newColors);
    // };

    const handlePress = () => {
        setColors(colors.map(() => generateColor()))
    }

    // const [randomBackground, squareDye, circleDye, triangleDye] = colors;

    useEffect(() => {
        if (shouldRoll) {
            handlePress();
            // handleShapeGeneration();
            // handlePress();
        }
    }, [shouldRoll]);

    // const getShapeStyle = (shape: string) => {
    //     switch (shape) {
    //         case "square":
    //             return { ...styles.squareShape, backgroundColor: squareDye };
    //         case "circle":
    //             return { ...styles.circleShape, backgroundColor: circleDye };
    //         case "triangle":
    //             return { ...styles.triangleShape, borderLeftColor: triangleDye };
    //         default:
    //             return {};
    //     }
    // };

    const [randomBackground] = colors;

    return (
        <>
            <StatusBar backgroundColor={randomBackground} />
            <View style={[styles.container, { backgroundColor: randomBackground }]}>
                {/* {randomShapes.map((shape, index) => (
                    <View key={index} style={getShapeStyle(shape)}></View>
                ))} */}
            </View>
        </>
    );
})

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    // squareShape: {
    //     width: 500,
    //     height: 500,
    //     position: 'absolute',
    //     bottom: 500,
    //     right: 200
    // },
    // circleShape: {
    //     width: 100,
    //     height: 100,
    //     borderRadius: 50,
    //     position: 'absolute',
    //     top: 500,
    // },
    // triangleShape: {
    //     width: 0,
    //     height: 0,
    //     position: 'absolute',
    //     bottom: 500,
    //     backgroundColor: 'transparent',
    //     borderLeftWidth: 100,
    //     borderTopWidth: 50,
    //     borderTopColor: 'transparent',
    //     borderStyle: 'solid',
    //     transform: [{ rotate: `${45}deg` }]
    // }
})

export default BackgroundChanger;