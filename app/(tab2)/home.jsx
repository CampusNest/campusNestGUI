

import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, Text, View, Image, Modal, TouchableOpacity, Linking} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import hos from '../../assets/images/sketch.png';
import { Header } from '../../components/Header';
import navigation from "../../components/Navigation";
import axios from "axios";
import Receipt from "../(receipt)/receipt";

const Home = () => {
    const [apartmentData, setApartmentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const userId = await AsyncStorage.getItem('user_id');


                if (!userId) {
                    console.error('No user ID found in AsyncStorage');
                    setLoading(false);
                    return;
                }

                const response = await fetch('http:/172.16.0.155:9897/api/v1/apartment/allApartment', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });



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

    const handleRentButtonPress = async (selected) => {
        let url = "http://172.16.0.155:9897/api/v1/payment/payForRent";
        const user = await AsyncStorage.getItem('user_id');
        const axiosInstance = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json'
            }
        });

                const payload = {
                    apartmentId : selected,
                    userId : user ,
                };
                const response = await axiosInstance.post(url,payload)
                 if (response.data){
                    let value = response.data.data
                     let ref = response.data.ref
                     await Linking.openURL(value);

                    await waitForPaymentToComplete(ref);

                    let res = await pollVerifyPayment(ref)
                     if (res === "success"){
                       let id = await landlordId(selected)
                         await deleteApartment(id,selected)

                         const receiptData = {
                             housepix: hos,
                             payDate: '2023-01-01',
                             duration: '12 months',
                             amount: '1000',
                             commission: '100',
                             total: '1100',
                             name: 'John Doe',
                             number: '1234567890'
                         };

                         navigation.navigate('Receipt', { receiptData });
                     }

                     }

    }
    const waitForPaymentToComplete = async (ref) => {

        await new Promise(resolve => setTimeout(resolve, 10000))
    }
    const pollVerifyPayment = async (ref) => {
            try {
                let urlRef = `http://172.16.0.155:9897/api/v1/payment/verifyPayment/${ref}`;
                const axiosInstance = axios.create({baseURL: urlRef, headers: {'Content-Type': 'application/json'}})
                const refResponse = await axiosInstance.get(urlRef)
                return refResponse.data;

            } catch (error) {
                console.error(error)
            }
    }

    const landlordId = async (id) =>{
        try {
            let url = `http://172.16.0.155:9897/api/v1/apartment/getLandLord/${id}`;
             const axiosInstance = axios.create({baseURL: url, headers: {'Content-Type': 'application/json'}})
            const response = await axiosInstance.get(url)
            return response.data;
        }catch (error){
            console.error(error)
        }
    }


    const deleteApartment = async (landlordID, apartmentID) => {
        const payload = {
            apartmentId: Number(apartmentID),
            landLordId: Number(landlordID)
        };
        console.log(payload);

        try {
            const urld = `http://172.16.0.155:9897/api/v1/deleteApartment`;
            const axiosInstance = axios.create({ baseURL: urld, headers: { 'Content-Type': 'application/json' } });
            const response = await axiosInstance.delete(urld, { data: payload });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const generateReceipt = async ({housepix,payDate, duration, amount, commission,total,name,number}) =>{
        return <Receipt housepix={housepix} payDate={payDate} duration={duration} amount={amount} commission={commission} total={total}  name={name} number={number}/>
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
                                    <Text style={styles.text}>Annual Rent Fee: {Number(apartment.annualRentFee) + 7000}</Text>
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
                                                          onPress={() => handleRentButtonPress(selectedApartment.id)}>
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


export default Home;

