import {ScrollView, StyleSheet, Text, View,Image} from "react-native";
import {StatusBar} from "react-native-web";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import tailwind from 'tailwindcss-react-native';
import {Header} from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import hos from "../../assets/images/sketch.png";


const Home2 = () =>{
    const [apartmentData, setApartmentData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const showHouse = async () => {
            try {
                const userId = await AsyncStorage.getItem("user_id");
                console.log("User ID:", userId);

                if (!userId) {
                    console.error("No user ID found in AsyncStorage");
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://172.16.0.155:9897/api/v1/apartment/postedApartment/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log("Response Status:", response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log("Response Data:", data);
                    setApartmentData(data);
                } else {
                    console.error("Failed to fetch apartment data:", response.statusText);
                }
            } catch (error) {
                console.error('Error fetching apartment data:', error);
            } finally {
                setLoading(false);
            }
        };

        showHouse();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.content}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : apartmentData.length > 0 ? (
                    apartmentData.map(apartment => (
                        <View key={apartment.id} style={styles.apartmentContainer}>
                            {apartment.apartmentImage.map(image => (
                                <Image key={image.id} source={{ uri: image.imageUrl }} style={styles.image} />
                            ))}
                            <Text>Description: {apartment.description}</Text>
                            <Text>Type: {apartment.apartmentType}</Text>
                            <Text>Annual Rent Fee: {apartment.annualRentFee}</Text>
                            <Text>Agreement and Commission: {apartment.agreementAndCommission}</Text>
                            <Text>Location: {apartment.location}</Text>
                        </View>
                    ))
                ) : (
                    <>
                        <Image source={hos} style={styles.image} />
                        <Text>No House Posted </Text>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
    },
    apartmentContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        width: '90%',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
});




export default Home2;