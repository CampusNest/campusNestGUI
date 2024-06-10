import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const ApartmentTypeDropdown = ({ form, handleInputChange }) => {
    return (
        <View style={styles.container}>
            <Picker
                selectedValue={form}
                style={styles.picker}
                onValueChange={(itemValue) => handleInputChange('apartmentType', itemValue)}
            >
                <Picker.Item label="Select Apartment Type" value="" />
                <Picker.Item label="Studio" value="studio" />
                <Picker.Item label="1 Bedroom" value="1-bedroom" />
                <Picker.Item label="2 Bedrooms" value="2-bedrooms" />
                <Picker.Item label="3 Bedrooms" value="3-bedrooms" />
                <Picker.Item label="Penthouse" value="penthouse" />
                {/* Add more options as needed */}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 7,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default ApartmentTypeDropdown;
