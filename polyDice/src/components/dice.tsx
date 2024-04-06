import React, { useEffect, useState, memo } from 'react';
import type { PropsWithChildren } from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    View,
} from 'react-native';

import DiceOne from '../assets/DiceOne.png'
import DiceTwo from '../assets/DiceTwo.png'
import DiceThree from '../assets/DiceThree.png'
import DiceFour from '../assets/DiceFour.png'
import DiceFive from '../assets/DiceFive.png'
import DiceSix from '../assets/DiceSix.png'

type DiceProps = PropsWithChildren<{
    imageUrl: ImageSourcePropType
}>

const Diced = ({ imageUrl }: DiceProps): JSX.Element => {
    return (
        <View>
            <Image style={styles.diceImage} source={imageUrl} />
        </View>
    )
}

const diceImages = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix];

const Dice = memo(({ shouldRoll }: { shouldRoll: boolean }) => {
    const [diceOneImage, setDiceOneImage] = useState<ImageSourcePropType>(DiceOne);
    const [diceTwoImage, setDiceTwoImage] = useState<ImageSourcePropType>(DiceOne);

    const rollDiceOnTap = () => {
        const randomNumberOne = Math.floor(Math.random() * 6);
        const randomNumberTwo = Math.floor(Math.random() * 6);

        setDiceOneImage(diceImages[randomNumberOne]);
        setDiceTwoImage(diceImages[randomNumberTwo]);
    }

    useEffect(() => {
        if (shouldRoll) {
            rollDiceOnTap();
        }
    }, [shouldRoll]);

    return (
        <View style={styles.diceContainer}>
            <Diced imageUrl={diceOneImage} />
            <Diced imageUrl={diceTwoImage} />
        </View>
    );
});

const styles = StyleSheet.create({
    diceContainer: {
        flexDirection: 'row',
    },
    diceImage: {
        width: 150,
        height: 150,
        margin: 10,
    }
})

export default Dice;