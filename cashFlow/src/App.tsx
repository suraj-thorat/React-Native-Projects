
import React, { useState } from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// Constants
import { currencyByRupee } from './constants';

// Components
import Dropdown from './components/dropdown'; ``

import Snackbar from 'react-native-snackbar';

const App = (): JSX.Element => {
  const [inputAmount, setInputAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState(currencyByRupee[0])
  const [targetCurrency, setTargetCurrency] = useState(currencyByRupee[1])
  const [resultValue, setResultValue] = useState('')

  const handleAmountChange = (newAmount: string) => {
    setInputAmount(newAmount.replace(/[^0-9.]/g, ''));
  };

  const handleCurrencyChange = (currency: Currency, isFrom: boolean) => {
    if (isFrom) {
      setFromCurrency(currency);
    } else {
      setTargetCurrency(currency);
    }
  };

  const handleConvert = () => {
    if (!inputAmount) {
      return Snackbar.show({
        text: "Enter a value to convert",
        backgroundColor: "#EA7773",
        textColor: "#000000"
      })
    }

    const inputValue = parseFloat(inputAmount)
    if (!isNaN(inputValue)) {
      const convertedValue = inputValue * fromCurrency.value / targetCurrency.value;
      setResultValue(convertedValue.toFixed(2).toString())
    } else {
      setResultValue('');
      return Snackbar.show({
        text: "NOT a valid number to convert",
        backgroundColor: "#F4BE2C",
        textColor: "#000000"
      })
    }
  }

  const handleReset = () => {
    setInputAmount('');
    setResultValue('');
  };


  return (
    <>
      <StatusBar backgroundColor={"#000000"} />
      <View style={styles.container}>
        <View style={styles.smallerContainer}>
          <View style={styles.convertContainer}>
            <Dropdown
              currencies={currencyByRupee}
              selectedCurrency={fromCurrency}
              onSelect={(currency) => handleCurrencyChange(currency, true)} // Indicate "from" selection
            />
            <Text style={styles.convertContainerText}>
              1 {fromCurrency.name} = {(fromCurrency.value / targetCurrency.value).toFixed(2).toString()} {targetCurrency.name}
            </Text>

            <TextInput
              style={styles.input}
              value={inputAmount}
              onChangeText={handleAmountChange}
              placeholder="Enter Amount"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.convertContainer}>
            <Dropdown
              currencies={currencyByRupee}
              selectedCurrency={targetCurrency}
              onSelect={(currency) => handleCurrencyChange(currency, false)} // Indicate "to" selection
            />

            <Text style={styles.convertContainerText}>
              1 {targetCurrency.name} = {(targetCurrency.value / fromCurrency.value).toFixed(2).toString()} {fromCurrency.name}
            </Text>
            <Text style={styles.input}>
              {resultValue}
            </Text>
          </View>

        </View>

        <View style={styles.buttons}>
          <Pressable
            onPress={handleConvert}
          >
            <Text style={styles.buttonText}>Convert</Text>
          </Pressable>
          <Pressable
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
        </View>
      </View>
    </ >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  smallerContainer: {
    borderRadius: 10,
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#ffffff"
  },
  convertContainer: {
    padding: 5,
  },
  convertContainerText: {
    marginTop: 10,
    marginLeft: 45
  },
  input: {
    marginTop: 10,
    marginLeft: 45,
    fontSize: 40
  },
  buttons: {
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonText: {
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
});

export default App;