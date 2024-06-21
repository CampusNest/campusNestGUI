import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "react-native-web";
import {useEffect, useState} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Book = () =>{
    const [notificationData, setNotificationData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const showNotification = async () => {
            const userId = await AsyncStorage.getItem("user_id");
            const url = `http://192.168.43.125:9897/api/v1/notification/notifications/${userId}`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data) {
                    setNotificationData(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        showNotification();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView style={styles.contentBox}>
                {loading ? (
                    <Text>Loading....</Text>
                ) : notificationData.length > 0 ? (
                    notificationData.map(notification => (
                        <View key={notification.id} style={styles.container}>
                            <Text>{notification}</Text>
                        </View>
                    ))
                ) : (
                    <Text>No Notifications</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    contentBox : {
        marginTop: 80,
    },
    container: {
        flex : 1,
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
    },
});

export default Book ;