
import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, Text, View, Image, Modal, TouchableOpacity, Linking, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import hos from '../../assets/images/sketch.png';
import { Header } from '../../components/Header';
// import navigation from "../../components/Navigation";
import axios from "axios";
import Receipt from "../(receipt)/receipt";
import {useNavigation} from "@react-navigation/native";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import {shareAsync} from "expo-sharing";
import i from "../../assets/images/Campus nest logo.png"
import {router} from "expo-router";
import icons from "../../constants/icons";
import CompleteRegistration from "../../components/completeRegistration";
import StudentCompleteRegistration from "../../components/StudentCompleteRegistration";

const Home = () => {
    const [apartmentData, setApartmentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [showCompleteProfile, setShowCompleteProfile] = useState(false);
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [number, setNumber] = useState('')

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = await AsyncStorage.getItem('user_id');
                const firstName = await AsyncStorage.getItem("first_name");
                const lastName = await AsyncStorage.getItem("last_name");

                setUserName(`${firstName} ${lastName}`);

                if (!userId) {
                    console.error('No user ID found in AsyncStorage');
                    setLoading(false);
                    return;
                }

                await fetchApartmentData();
                await fetchUserProfile(userId);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        const fetchApartmentData = async () => {
            try {
                const response = await fetch('http://192.168.43.125:9897/api/v1/apartment/allApartment', {
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

        const fetchUserProfile = async (userId) => {
            try {
                const userUrl = `http://192.168.43.125:9897/api/v1/studentProfile/${userId}`;
                const instance = axios.create({
                    baseURL: userUrl,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const response = await instance.get(userUrl);
                const responseData = response.data;
                const profileComplete = responseData.imageUrl && responseData.phoneNumber && responseData.stateOfOrigin;

                setIsProfileComplete(profileComplete);
                setShowCompleteProfile(!profileComplete);
                setNumber(responseData.phoneNumber)
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleViewButtonPress = (apartment) => {
        setSelectedApartment(apartment);
        setModalVisible(true);
    };

    const handleRentButtonPress = async (selected) => {
        if (!isProfileComplete) {
            setShowCompleteProfile(true);
            return;
        }
        setIsSubmitting()

        try {
        let url = "http://192.168.43.125:9897/api/v1/payment/payForRent";
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
                       let landlord = await landlordId(selected)
                         console.log(landlord)

                         let userApartment = await findApartment(selected)


                         await generateReceipt({
                    housepix: userApartment.image,
                    payDate: new Date().toLocaleDateString(),
                    duration: '1 year',
                    amount: Number(userApartment.annualRentFee) + 7000,
                    commission: userApartment.agreementAndCommission,
                    total: Number(userApartment.annualRentFee) + 7000 + Number(userApartment.agreementAndCommission),
                    name: userName,
                    number: number
                });
                     }

                     await deleteApartment(selected)

                     }}catch (error){
                      console.log(error)
                }finally {
                  setModalVisible(false)
        }

    }
    const waitForPaymentToComplete = async (ref) => {

        await new Promise(resolve => setTimeout(resolve, 10000))
    }
    const pollVerifyPayment = async (ref) => {
            try {
                let urlRef = `http://192.168.43.125:9897/api/v1/payment/verifyPayment/${ref}`;
                const axiosInstance = axios.create({baseURL: urlRef, headers: {'Content-Type': 'application/json'}})
                const refResponse = await axiosInstance.get(urlRef)
                return refResponse.data;

            } catch (error) {
                console.error(error)
            }
    }

    const landlordId = async (id) =>{
        try {
            let url = `http://192.168.43.125:9897/api/v1/apartment/getLandLord/${id}`;
             const axiosInstance = axios.create({baseURL: url, headers: {'Content-Type': 'application/json'}})
            const response = await axiosInstance.get(url)
            console.log(response.data)
            return response.data;
        }catch (error){
            console.error(error)
        }
    }



    const findApartment = async (id) => {
        try {
            let url = `http://192.168.43.125:9897/api/v1/apartment/apartment/${id}`;
            const axiosInstance = axios.create({baseURL: url, headers: {'Content-Type': 'application/json'}})
            const response = await axiosInstance.get(url)
            return response.data;
        }catch (error){
            console.error(error)
        }
    }


    const deleteApartment = async (apartmentId) => {
        const apiBaseUrl = `http://192.168.43.125:9897/api/v1/deleteApartment/${apartmentId}`;
        const axiosInstance  = axios.create({
            baseURL: apiBaseUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        try {
            const response = await axiosInstance.delete(apiBaseUrl);

            console.log(response)
            setApartmentData(prevApartmentData =>
                prevApartmentData.filter(apartment => apartment.id !== apartmentId)
            );

        } catch (error) {
            console.error("Error deleting apartment:", error);

        }
    }

    // const generateReceipt = async ({housepix,payDate, duration, amount, commission,total,name,number}) =>{
    //     return <Receipt housepix={housepix} payDate={payDate} duration={duration} amount={amount} commission={commission} total={total}  name={name} number={number}/>
    // }

    const generateReceipt = async ({ housepix, payDate, duration, amount, commission, total, name, number }) => {
        const htmlContent = `
<html lang="">
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { width: 100%; padding: 20px; }
        .header { text-align: center; margin-bottom: 20px; }
        .content { margin-bottom: 20px; font-size: 35px}
        .footer { text-align: center; margin-top: 20px; }
        .imag {width: 250px; height: 250px}
    </style>
    <title>Receipt</title>
  
</head>
<body>
    <div class="container">
        <img src="../../assets/images/Campus%20nest%20logo.png" alt="logo" style="width: 40px; height: 40px">
        <div class="header">
            <h1>Receipt</h1>
        </div>
        <img src="${housepix}" alt="house" class="imag">
        <div class="content">
            <p><strong>Payment Date:</strong> ${payDate}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            <p><strong>Annual Rent:</strong> ${amount}</p>
            <p><strong>Commission:</strong> ${commission}</p>
            <p><strong>Total:</strong> ${total}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Contact Number:</strong> ${number}</p>
        </div>
        <div class="footer">
            <p>Thank you for your payment!</p>
        </div>
    </div>
</body>
</html>`;



        const options = {
            html: htmlContent,
            fileName: 'receipt',
            directory: 'Documents',
        };

        try {
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            console.log('PDF generated at:', uri);

            const newPath = `${FileSystem.documentDirectory}CampusNestReceipt.pdf`;
            await FileSystem.moveAsync({
                from: uri,
                to: newPath,
            });

            await shareAsync(newPath);
        } catch (e) {
            console.error(e);
        }
    };
        return (
            <SafeAreaView style={styles.container}>
                <Header/>
                <ScrollView contentContainerStyle={styles.content}>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : apartmentData.length > 0 ? (
                        apartmentData.map((apartment) => (
                            <View key={apartment.id} style={styles.apartmentContainer}>
                                <Image source={{ uri: apartment.image}} style={styles.image} />
                                {/*<Image source={{uri: apartment.apartmentImage[0].imageUrl}} style={styles.image}/>*/}
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
                                    <Image source={{ uri: selectedApartment.image}} style={styles.image} />
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

                {showCompleteProfile && (
                    <View style={styles.backgroundOverlay} />
                )}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showCompleteProfile}
                    onRequestClose={() => { /* do nothing */ }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView2}>
                            <TouchableOpacity onPress={() => setShowCompleteProfile(!showCompleteProfile)}>
                                <Image source={icons.cancel} style={{width:25,height:25}} className="ml-72 mb-4"/>
                            </TouchableOpacity>
                            <Text style={styles.txt}>Complete Registration</Text>

                            <StudentCompleteRegistration/>

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
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
        },
        modalView2: {
            margin: 20,
            width: 390,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 4.25,
            shadowRadius: 4,
            elevation: 5
        },
        backgroundOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1
        }, txt : {
            fontSize : 22,
            fontWeight: "bold"
        }
    });


export default Home;

