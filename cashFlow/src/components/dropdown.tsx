import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';

interface DropdownProps {
    currencies: Currency[];
    selectedCurrency: Currency;
    onSelect: (currency: Currency) => void;
}

const Dropdown = ({ currencies, selectedCurrency = currencies[0], onSelect }: DropdownProps) => {
    const [selectedValue, setSelectedValue] = useState(selectedCurrency.name);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSelection = (itemValue: string) => {
        const selected = currencies.find((currency) => currency.name === itemValue);
        if (selected) {
            onSelect(selected);
        }
        setIsModalVisible(false);
    };

    const renderItem = ({ item }: { item: Currency }) => (
        <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelection(item.name)}>
            <Text>{item.name} - {item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Text style={styles.dropdownContainerText}>{selectedCurrency?.flag}   {selectedCurrency?.name} - {selectedCurrency?.label}</Text>
            </TouchableOpacity>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContent}>
                    <FlatList
                        data={currencies}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.name}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
    },
    dropdownContainerText: {
        fontSize: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 10,
        maxHeight: 500, // Set a maximum height for the dropdown list
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
    },
    flag: {
        width: 50,
        height: 50,
        fontSize: 28,
    }
});

export default Dropdown;