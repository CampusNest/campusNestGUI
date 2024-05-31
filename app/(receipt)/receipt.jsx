import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import house4 from "../../assets/images/house4.jpg";
import {Link} from "expo-router";
import { shareAsync } from 'expo-sharing'
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
    const Receipt= () => {
        const navigation = useNavigation();
        const route = useRoute();
        const handleGoBack = () => {
            navigation.goBack();
        };

        const htmlContent = `\`<div style="display: flex; flex-direction: column; gap: 18px; justify-content: center; padding: 20px; background-color: white;">
    <img src="data:image/png;base64,${house4}" style="width: 80px; height: 60px; border-radius: 7px; margin-top: 30px;" />
    <div style="background-color: silver; border: 2px solid gray; border-radius: 7px; display: flex; flex-direction: column; justify-content: center; height: 80px; align-items: flex-start; ">
      <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Rent Payment Date :</p>
      <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Duration :</p>
    </div>
    <div style="background-color: silver; border: 2px solid gray; border-radius: 7px; display: flex; flex-direction: column ;justify-content: center; height: 180px;">
      <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Amount :</p>
      <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Agreement :</p>
      <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Commission :</p>
      <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Total :</p>
    </div>
    <div style="background-color: silver; border: 2px solid gray; border-radius: 7px; display: flex; flex-direction: column ;justify-content: center; height: 80px;">
      <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Name :</p>
      <p style="font-size: 16px; margin-bottom: 10px; margin-left: 10px;">Phone Number :</p>
    </div>
  </div>\``

        const downloadReceipt = async () => {
            try {
                const {uri} = await Print.printToFileAsync({html : htmlContent})
                console.log('PDF generated at :', uri)

                const  newPath = `${FileSystem.documentDirectory}sample.pdf`
                await FileSystem.moveAsync({
                    from : uri,
                    to:newPath,
                })

                shareAsync(newPath)
            }catch (e) {
                console.error(e)
            }
        }
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.goBack}>
                        <FontAwesome name="arrow-left" size={16} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Receipt</Text>
                </View>
                {/*<Image source={{ uri: apartment.image }} style={styles.image} />*/}
                <Image source={house4} style={{width: 80, height: 60, borderRadius: 7, marginTop: 30 }}/>
                <View style={styles.first}>
                    <Text style={styles.detailText}>Rent Payment Date: </Text>
                    <Text style={styles.detailText}>Duration: </Text>
                </View>
                <View style={styles.secondTable}>
                    <Text style={styles.detailText}>Amount: </Text>
                    <Text style={styles.detailText}>Agreement: </Text>
                    <Text style={styles.detailText}>Commission: </Text>
                    <Text style={styles.detailText}>Total: </Text>
                </View>
                <View style={styles.thirdTable}>
                    <Text style={styles.detailText}>Name: </Text>
                    <Text style={styles.detailText}>Phone Number: </Text>
                </View>
                <View style={styles.download}>
                    <Link href={'../(receipt)/receipt'}>
                        <View style={styles.downloadButton}>
                            <Text style={styles.buttonText} onPress={downloadReceipt}>
                                 Download Receipt
                            </Text>
                        </View>
                    </Link>
                </View>
                {/*<Text style={styles.detailText}>Rent Payment Date: {rentPaymentDate}</Text>*/}
                {/*<Text style={styles.detailText}>Duration: {duration} year(s)</Text>*/}
                {/*<Text style={styles.detailText}>Amount: ${apartment.amount}</Text>*/}
                {/*<Text style={styles.detailText}>Agreement: ${apartment.agreement}</Text>*/}
                {/*<Text style={styles.detailText}>Commission: ${apartment.commission}</Text>*/}
                {/*<Text style={styles.detailText}>Total: ${total}</Text>*/}
                {/*<Text style={styles.detailText}>Name: {user.name}</Text>*/}
                {/*<Text style={styles.detailText}>Phone Number: {user.phoneNumber}</Text>*/}
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: 'white',
            display : "flex",
            flexDirection : "column",
            gap : 18,
            justifyContent :"center",
            bottom : 125
        },
        content : {
            display : 'flex',
            flexDirection :"row",
            gap : 120
        },
        title : {
            fontSize  : 18,
            display : "flex",

        },
        image: {
            width: '100%',
            height: 200,
            resizeMode: 'cover',
            marginBottom: 20,
        },
        detailText: {
            fontSize: 14,
            marginBottom: 10,
            marginLeft : 10
        },
        first :{
            backgroundColor : 'silver',
            borderColor : "gray",
            borderWidth : 2,
            borderLeftWidth : 0,
            borderRightWidth : 0,
            borderTopWidth : 0,
            borderRadius : 7,
            display : "flex",
            justifyContent : "center",
            height : 70,
            alignItems : "flex-start"
        },
        secondTable :{
            backgroundColor : 'silver',
            borderColor : "gray",
            borderWidth : 2,
            borderLeftWidth : 0,
            borderRightWidth : 0,
            borderTopWidth : 0,
            borderRadius : 7,
            display : "flex",
            justifyContent : "center",
            height : 120
        },
        thirdTable :{
            backgroundColor : 'silver',
            borderColor : "gray",
            borderWidth : 2,
            borderLeftWidth : 0,
            borderRightWidth : 0,
            borderTopWidth : 0,
            borderRadius : 7,
            display : "flex",
            justifyContent : "center",
            height : 70
        },
        download :{
            display : "flex",
            alignItems : 'center',
            justifyContent :'center',
            top : '20%',
        },
        downloadButton : {
            backgroundColor : "#006FFF",
            display : "flex",
            height : 30,
            width : 200,
            borderRadius : 7,
            justifyContent : "center",
            alignItems : "center"
        },
        buttonText : {
            fontSize: 20,
        },
    });
export default Receipt