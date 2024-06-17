import {View,StyleSheet,Text,TouchableOpacity} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {Link} from "expo-router";
import React from "react";
import { useNavigation } from '@react-navigation/native';


const RentalProcessDone = ()=> {

    const currentDate = new Date();
    const dayOfWeek = currentDate.toLocaleDateString('default', {weekday: "short"})
    const month = currentDate.toLocaleString('default', {month: 'long'});
    const day = currentDate.getDate();
    const time = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.goBack} onPress={handleGoBack}>
                <FontAwesome name="arrow-left" size={16} color="black" />
            </TouchableOpacity>
            <View style={styles.circle}>
                <FontAwesome name="check" size={50} color={"white"}/>
            </View>
            <Text style={styles.text}>You Successfully rent this Apartment</Text>
            <Text style={styles.dateText}>{`${dayOfWeek}, ${month} ${day} , ${time}`}</Text>

            <View style={styles.down}>
                <Link href={'../(receipt)/receipt'}>
                    <View style={styles.receiptButton}>
                        <Text style={styles.goButton}>
                        View Receipt
                        </Text>
                    </View>
                </Link>
                <Link
                    href={'../(mainPage)/pickApartment'}
                    style={{color:"#006FFF",fontSize:20}}
                >
                    Go to Home
                </Link>
            </View>
        </View>
    )
}
    const styles = StyleSheet.create({
        container :{
            flex : 1,
            // justifyContent:"center",
            // alignItems:"center",
            backgroundColor:"#ffffff",
            justifyContent : "center",
            alignItems : 'center'
        },
        circle:{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#006FFF",
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        },
        text: {
            fontSize: 20,
            marginBottom: 10,
        },
        dateText: {
            fontSize: 16,
            color: '#555',
        },
        down:{
            display : "flex",
            alignItems: "center",
            justifyContent:'center',
            top : 130
        },
        goButton :{
            color: "#fff",
            display : "flex",
            fontSize : 17,
        },
        goBack:{
            right :'44%',
            bottom : "30%"
        },receiptButton :{
            backgroundColor : "#006FFF",
            display : "flex",
            height : 30,
            width : 170,
            borderRadius : 7,
            justifyContent : "center",
            alignItems : "center"
        }

    });



export default RentalProcessDone;