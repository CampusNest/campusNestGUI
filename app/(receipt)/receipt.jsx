import React from 'react';
import { View, Text, Image, TouchableOpacity,StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import {FontAwesome} from "@expo/vector-icons";

const Receipt= () => {
    const route = useRoute();
    const { housepix, payDate, duration, amount, commission, total, name, number } = route.params.receiptData;

    const htmlContent = `
        <div style="display: flex; flex-direction: column; gap: 18px; justify-content: center; padding: 20px; background-color: white;">
            <img src=${housepix} style="width: 80px; height: 60px; border-radius: 7px; margin-top: 30px;" alt=""/>
            <div style="background-color: silver; border: 2px solid gray; border-radius: 7px; display: flex; flex-direction: column; justify-content: center; height: 80px; align-items: flex-start;">
                <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Rent Payment Date: ${payDate}</p>
                <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Duration: ${duration}</p>
            </div>
            <div style="background-color: silver; border: 2px solid gray; border-radius: 7px; display: flex; flex-direction: column; justify-content: center; height: 180px;">
                <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Amount: ${amount}</p>
                <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Commission: ${commission}</p>
                <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Total: ${total}</p>
            </div>
            <div style="background-color: silver; border: 2px solid gray; border-radius: 7px; display: flex; flex-direction: column; justify-content: center; height: 80px;">
                <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Name: ${name}</p>
                <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Phone Number: ${number}</p>
            </div>
        </div>
    `;

    const downloadReceipt = async () => {
        try {
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            console.log('PDF generated at:', uri);

            const newPath = `${FileSystem.documentDirectory}sample.pdf`;
            await FileSystem.moveAsync({
                from: uri,
                to: newPath,
            });

            shareAsync(newPath);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
                    <FontAwesome name="arrow-left" size={16} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Receipt</Text>
            </View>
            <Image source={{ uri: housepix }} style={{ width: 80, height: 60, borderRadius: 7, marginTop: 30 }} />
            <View style={styles.first}>
                <Text style={styles.detailText}>Rent Payment Date: {payDate} </Text>
                <Text style={styles.detailText}>Duration: {duration} </Text>
            </View>
            <View style={styles.secondTable}>
                <Text style={styles.detailText}>Amount: {amount} </Text>
                <Text style={styles.detailText}>Commission: {commission}</Text>
                <Text style={styles.detailText}>Total: {total}</Text>
            </View>
            <View style={styles.thirdTable}>
                <Text style={styles.detailText}>Name: {name}</Text>
                <Text style={styles.detailText}>Phone Number: {number} </Text>
            </View>
            <View style={styles.download}>
                <TouchableOpacity onPress={downloadReceipt} style={styles.downloadButton}>
                    <Text style={styles.buttonText}>Download Receipt</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    detailText : {},
    secondTable : {},
    thirdTable : {},
    downloadButton : {}



})
export default Receipt;