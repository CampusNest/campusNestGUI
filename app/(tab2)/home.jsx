

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import hos from '../../assets/images/sketch.png';
import { Header } from '../../components/Header';
import navigation from "../../components/Navigation";

const Home = () => {
    const [apartmentData, setApartmentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const userId = await AsyncStorage.getItem('user_id');
                console.log('User ID:', userId);

                if (!userId) {
                    console.error('No user ID found in AsyncStorage');
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://localhost:8080/api/v1/apartment/allApartment', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Response Status:', response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log('Response Data:', data);
                    setApartmentData(data);
                } else {
                    console.error('Failed to fetch apartment data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching apartment data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApartments();
    }, []);

    const handleViewButtonPress = (apartment) => {
        setSelectedApartment(apartment);
        setModalVisible(true);
    };

    const handleRentButtonPress = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        if (userId && selectedApartment) {
            navigation.navigate('MakePaymentComponent', {
                user_id: userId,
                apartment_id: selectedApartment.id,
            });

        }

        return (
            <SafeAreaView style={styles.container}>
                <Header/>
                <ScrollView contentContainerStyle={styles.content}>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : apartmentData.length > 0 ? (
                        apartmentData.map((apartment) => (
                            <View key={apartment.id} style={styles.apartmentContainer}>
                                <Image source={{uri: apartment.apartmentImage[0].imageUrl}} style={styles.image}/>
                                <View style={styles.textRow}>
                                    <Icon name="home-outline" size={20} color="#4F8EF7"/>
                                    <Text style={styles.text}>Type: {apartment.apartmentType}</Text>
                                </View>
                                <View style={styles.textRow}>
                                    <Icon name="cash-outline" size={20} color="#4F8EF7"/>
                                    <Text style={styles.text}>Annual Rent Fee: {apartment.annualRentFee}</Text>
                                </View>
                                <View style={styles.textRow}>
                                    <Icon name="document-text-outline" size={20} color="#4F8EF7"/>
                                    <Text style={styles.text}>Agreement and
                                        Commission: {apartment.agreementAndCommission}</Text>
                                </View>
                                <View style={styles.textRow}>
                                    <Icon name="location-outline" size={20} color="#4F8EF7"/>
                                    <Text style={styles.text}>Location: {apartment.location}</Text>
                                </View>
                                <TouchableOpacity onPress={() => handleViewButtonPress(apartment)}
                                                  style={styles.viewButton}>
                                    <Text style={styles.viewButtonText}>View</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <>
                            <Image source={hos} style={styles.image}/>
                            <Text>No House Available</Text>
                        </>
                    )}
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {selectedApartment && (
                                <>
                                    <Image
                                        source={{uri: selectedApartment.apartmentImage[0].imageUrl}}
                                        style={styles.image}
                                    />
                                    <View style={styles.textRow}>
                                        <Icon name="document-text-outline" size={20} color="#4F8EF7"/>
                                        <Text style={styles.text}>Description: {selectedApartment.description}</Text>
                                    </View>


                                    <View style={{display: "flex", flexDirection: "row", gap: 10}}>
                                        <TouchableOpacity style={styles.rentButton}
                                                          onPress={() => handleRentButtonPress}>
                                            <Text style={styles.rentButtonText}>Rent</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.backButton}
                                                          onPress={() => setModalVisible(false)}>
                                            <Text style={styles.backButtonText}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        content: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        apartmentContainer: {
            marginBottom: 20,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
            width: '90%',
            alignItems: 'center',
        },
        image: {
            width: 200,
            height: 200,
            marginBottom: 10,
        },
        textRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
        },
        text: {
            marginLeft: 5,
            fontSize: 16,
        },
        viewButton: {
            marginTop: 10,
            padding: 10,
            backgroundColor: '#4F8EF7',
            borderRadius: 5,
        },
        viewButtonText: {
            color: '#fff',
            fontWeight: 'bold',
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
            width: '80%',
            alignItems: 'center',
        },
        rentButton: {
            backgroundColor: 'green',
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
        },
        rentButtonText: {
            color: '#fff',
            fontWeight: 'bold',
        },
        backButton: {
            backgroundColor: '#ddd',
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
        },
        backButtonText: {
            color: '#000',
            fontWeight: 'bold',
        },
    });
}

export default Home;

