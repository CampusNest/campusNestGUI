//
// import React, { useEffect, useState } from 'react';
// import {ScrollView, StyleSheet, Text, View, Image, Modal, TouchableOpacity, Linking, Alert} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/Ionicons';
// import hos from '../../assets/images/sketch.png';
// import { Header } from '../../components/Header';
// // import navigation from "../../components/Navigation";
// import axios from "axios";
// import Receipt from "../(receipt)/receipt";
// import {useNavigation} from "@react-navigation/native";
// import * as Print from "expo-print";
// import * as FileSystem from "expo-file-system";
// import {shareAsync} from "expo-sharing";
// import i from "../../assets/images/Campus nest logo.png"
// import {router} from "expo-router";
// import icons from "../../constants/icons";
// import CompleteRegistration from "../../components/completeRegistration";
// import StudentCompleteRegistration from "../../components/StudentCompleteRegistration";
// import Gallery from "../../components/gallery";
//
// const Home = () => {
//     const [apartmentData, setApartmentData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedApartment, setSelectedApartment] = useState(null);
//     const [modalVisible, setModalVisible] = useState(false);
//     const navigation = useNavigation();
//     const [userName, setUserName] = useState('');
//     const [showCompleteProfile, setShowCompleteProfile] = useState(false);
//     const [isProfileComplete, setIsProfileComplete] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [number, setNumber] = useState('')
//
//
//
//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const userId = await AsyncStorage.getItem('user_id');
//                 const firstName = await AsyncStorage.getItem("first_name");
//                 const lastName = await AsyncStorage.getItem("last_name");
//
//                 setUserName(`${firstName} ${lastName}`);
//
//                 if (!userId) {
//                     console.error('No user ID found in AsyncStorage');
//                     setLoading(false);
//                     return;
//                 }
//
//                 await fetchApartmentData();
//                 await fetchUserProfile(userId);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//                 setLoading(false);
//             }
//         };
//
//         const fetchApartmentData = async () => {
//             try {
//                 const response = await fetch('http://172.16.0.183:9897/api/v1/apartment/allApartment', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//
//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log('Response Data:', data);
//                     setApartmentData(data);
//                 } else {
//                     console.error('Failed to fetch apartment data:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching apartment data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         const fetchUserProfile = async (userId) => {
//             try {
//                 const userUrl = `http://172.16.0.183:9897/api/v1/studentProfile/${userId}`;
//                 const instance = axios.create({
//                     baseURL: userUrl,
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//
//                 const response = await instance.get(userUrl);
//                 const responseData = response.data;
//                 const profileComplete = responseData.imageUrl && responseData.phoneNumber && responseData.stateOfOrigin;
//
//                 setIsProfileComplete(profileComplete);
//                 setShowCompleteProfile(!profileComplete);
//                 setNumber(responseData.phoneNumber)
//             } catch (error) {
//                 console.error('Error fetching user profile:', error);
//             }
//         };
//
//         fetchUserData();
//     }, []);
//
//     const handleViewButtonPress = async (apartment) => {
//         setSelectedApartment(apartment);
//         setModalVisible(true);
//
//     };
//
//
//     const handleRentButtonPress = async (selected) => {
//         if (!isProfileComplete) {
//             setShowCompleteProfile(true);
//             return;
//         }
//         setIsSubmitting(true);
//
//         try {
//             const url = "http://172.16.0.183:9897/api/v1/payment/payForRent";
//             const user = await AsyncStorage.getItem('user_id');
//             const axiosInstance = axios.create({
//                 baseURL: url,
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//
//             const payload = {
//                 apartmentId: selected,
//                 userId: user,
//             };
//
//             const response = await axiosInstance.post(url, payload);
//
//             if (response.data) {
//                 const value = response.data.data;
//                 const ref = response.data.ref;
//                 await Linking.openURL(value);
//                 await getGalleryImages(selected);
//
//                 await waitForPaymentToComplete(ref);
//
//                 const res = await pollVerifyPayment(ref);
//                 if (res === "success") {
//                     const landlord = await landlordId(selected);
//                     console.log(landlord);
//
//                     const userApartment = await findApartment(selected);
//
//                     await generateReceipt({
//                         housepix: userApartment.image,
//                         payDate: new Date().toLocaleDateString(),
//                         duration: '1 year',
//                         amount: Number(userApartment.annualRentFee) + 7000,
//                         commission: userApartment.agreementAndCommission,
//                         total: Number(userApartment.annualRentFee) + 7000 + Number(userApartment.agreementAndCommission),
//                         name: userName,
//                         number: number
//                     });
//
//                     await deleteApartment(selected);
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setModalVisible(false);
//             setIsSubmitting(false);
//         }
//     };
//
//     const waitForPaymentToComplete = async (ref) => {
//
//         await new Promise(resolve => setTimeout(resolve, 10000))
//     }
//     const pollVerifyPayment = async (ref) => {
//             try {
//                 let urlRef = `http://172.16.0.183:9897/api/v1/payment/verifyPayment/${ref}`;
//                 const axiosInstance = axios.create({baseURL: urlRef, headers: {'Content-Type': 'application/json'}})
//                 const refResponse = await axiosInstance.get(urlRef)
//                 return refResponse.data;
//
//             } catch (error) {
//                 console.error(error)
//             }
//     }
//
//     const landlordId = async (id) =>{
//         try {
//             let url = `http://172.16.0.183:9897/api/v1/apartment/getLandLord/${id}`;
//              const axiosInstance = axios.create({baseURL: url, headers: {'Content-Type': 'application/json'}})
//             const response = await axiosInstance.get(url)
//             console.log(response.data)
//             return response.data;
//         }catch (error){
//             console.error(error)
//         }
//     }
//
//
//
//     const findApartment = async (id) => {
//         try {
//             let url = `http://172.16.0.183:9897/api/v1/apartment/apartment/${id}`;
//             const axiosInstance = axios.create({baseURL: url, headers: {'Content-Type': 'application/json'}})
//             const response = await axiosInstance.get(url)
//             return response.data;
//         }catch (error){
//             console.error(error)
//         }
//     }
//
//
//     const deleteApartment = async (apartmentId) => {
//         const apiBaseUrl = `http://172.16.0.183:9897/api/v1/deleteApartment/${apartmentId}`;
//         const axiosInstance  = axios.create({
//             baseURL: apiBaseUrl,
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//
//         try {
//             const response = await axiosInstance.delete(apiBaseUrl);
//
//             console.log(response)
//             setApartmentData(prevApartmentData =>
//                 prevApartmentData.filter(apartment => apartment.id !== apartmentId)
//             );
//
//         } catch (error) {
//             console.error("Error deleting apartment:", error);
//
//         }
//     }
//
//
//     const generateReceipt = async ({ housepix, payDate, duration, amount, commission, total, name, number }) => {
//         const htmlContent = `
// <html lang="">
// <head>
//     <style>
//         body { font-family: Arial, sans-serif; }
//         .container { width: 100%; padding: 20px; }
//         .header { text-align: center; margin-bottom: 20px; }
//         .content { margin-bottom: 20px; font-size: 35px}
//         .footer { text-align: center; margin-top: 20px; }
//         .imag {width: 250px; height: 250px}
//     </style>
//     <title>Receipt</title>
//
// </head>
// <body>
//     <div class="container">
//         <img src="../../assets/images/Campus%20nest%20logo.png" alt="logo" style="width: 40px; height: 40px">
//         <div class="header">
//             <h1>Receipt</h1>
//         </div>
//         <img src="${housepix}" alt="house" class="imag">
//         <div class="content">
//             <p><strong>Payment Date:</strong> ${payDate}</p>
//             <p><strong>Duration:</strong> ${duration}</p>
//             <p><strong>Annual Rent:</strong> ${amount}</p>
//             <p><strong>Commission:</strong> ${commission}</p>
//             <p><strong>Total:</strong> ${total}</p>
//             <p><strong>Name:</strong> ${name}</p>
//             <p><strong>Contact Number:</strong> ${number}</p>
//         </div>
//         <div class="footer">
//             <p>Thank you for your payment!</p>
//         </div>
//     </div>
// </body>
// </html>`;
//
//
//
//         const options = {
//             html: htmlContent,
//             fileName: 'receipt',
//             directory: 'Documents',
//         };
//
//         try {
//             const { uri } = await Print.printToFileAsync({ html: htmlContent });
//             console.log('PDF generated at:', uri);
//
//             const newPath = `${FileSystem.documentDirectory}CampusNestReceipt.pdf`;
//             await FileSystem.moveAsync({
//                 from: uri,
//                 to: newPath,
//             });
//
//             await shareAsync(newPath);
//         } catch (e) {
//             console.error(e);
//         }
//     };
//         return (
//             <SafeAreaView style={styles.container}>
//                 <Header/>
//                 <ScrollView contentContainerStyle={styles.content}>
//                     {loading ? (
//                         <Text>Loading...</Text>
//                     ) : apartmentData.length > 0 ? (
//                         apartmentData.map((apartment) => (
//                             <View key={apartment.id} style={styles.apartmentContainer}>
//                                 <Image source={{ uri: apartment.image}} style={styles.image} />
//                                 {/*<Image source={{uri: apartment.apartmentImage[0].imageUrl}} style={styles.image}/>*/}
//                                 <View style={styles.textRow}>
//                                     <Icon name="home-outline" size={20} color="#4F8EF7"/>
//                                     <Text style={styles.text}>Type: {apartment.apartmentType}</Text>
//                                 </View>
//                                 <View style={styles.textRow}>
//                                     <Icon name="cash-outline" size={20} color="#4F8EF7"/>
//                                     <Text style={styles.text}>Annual Rent Fee: {Number(apartment.annualRentFee) + 7000}</Text>
//                                 </View>
//                                 <View style={styles.textRow}>
//                                     <Icon name="document-text-outline" size={20} color="#4F8EF7"/>
//                                     <Text style={styles.text}>Agreement and
//                                         Commission: {apartment.agreementAndCommission}</Text>
//                                 </View>
//                                 <View style={styles.textRow}>
//                                     <Icon name="location-outline" size={20} color="#4F8EF7"/>
//                                     <Text style={styles.text}>Location: {apartment.location}</Text>
//                                 </View>
//                                 <TouchableOpacity onPress={() => handleViewButtonPress(apartment)}
//                                                   style={styles.viewButton}>
//                                     <Text style={styles.viewButtonText}>View</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         ))
//                     ) : (
//                         <>
//                             <Image source={hos} style={styles.image}/>
//                             <Text>No House Available</Text>
//                         </>
//                     )}
//                 </ScrollView>
//                 <Modal
//                     animationType="slide"
//                     transparent={true}
//                     visible={modalVisible}
//                     onRequestClose={() => setModalVisible(false)}
//                 >
//                     <View style={styles.modalContainer}>
//                         <View style={styles.modalContent}>
//                             {selectedApartment && (
//                                 <>
//                                     <Image source={{ uri: selectedApartment.image}} style={styles.image} />
//                                     <View style={styles.textRow}>
//                                         <Icon name="document-text-outline" size={20} color="#4F8EF7"/>
//                                         <Text style={styles.text}>Description: {selectedApartment.description}</Text>
//                                     </View>
//
//
//                                     <View>
//                                         <Gallery id={selectedApartment.id}/>
//                                     </View>
//
//
//                                     <View style={{display: "flex", flexDirection: "row", gap: 80,marginTop: -300}}>
//                                         <TouchableOpacity style={styles.rentButton}
//                                                           onPress={() => handleRentButtonPress(selectedApartment.id)}>
//                                             <Text style={styles.rentButtonText}>Rent</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity style={styles.backButton}
//                                                           onPress={() => setModalVisible(false)}>
//                                             <Text style={styles.backButtonText}>Back</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 </>
//                             )}
//                         </View>
//                     </View>
//                 </Modal>
//
//                 {showCompleteProfile && (
//                     <View style={styles.backgroundOverlay} />
//                 )}
//
//                 <Modal
//                     animationType="slide"
//                     transparent={true}
//                     visible={showCompleteProfile}
//                     onRequestClose={() => {}}
//                 >
//                     <View style={styles.centeredView}>
//                         <View style={styles.modalView2}>
//                             <TouchableOpacity onPress={() => setShowCompleteProfile(!showCompleteProfile)}>
//                                 <Image source={icons.cancel} style={{width:25,height:25}} className="ml-72 mb-4"/>
//                             </TouchableOpacity>
//                             <Text style={styles.txt}>Complete Registration</Text>
//
//                             <StudentCompleteRegistration/>
//
//                         </View>
//                     </View>
//                 </Modal>
//             </SafeAreaView>
//         );
//     };
//
//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             backgroundColor: '#fff',
//         },
//         content: {
//             alignItems: 'center',
//             justifyContent: 'center',
//         },
//         apartmentContainer: {
//             marginBottom: 20,
//             padding: 10,
//             borderWidth: 1,
//             borderColor: '#ddd',
//             borderRadius: 5,
//             width: '90%',
//             alignItems: 'center',
//         },
//         image: {
//             width: 200,
//             height: 200,
//             marginBottom: 10,
//         },
//         textRow: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginBottom: 5,
//         },
//         text: {
//             marginLeft: 5,
//             fontSize: 16,
//         },
//         viewButton: {
//             marginTop: 10,
//             padding: 10,
//             backgroundColor: '#4F8EF7',
//             borderRadius: 5,
//         },
//         viewButtonText: {
//             color: '#fff',
//             fontWeight: 'bold',
//         },
//         modalContainer: {
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//
//         },
//         modalContent: {
//             backgroundColor: '#fff',
//             padding: 20,
//             borderRadius: 10,
//             width: '80%',
//             alignItems: 'center',
//
//         },
//         rentButton: {
//             backgroundColor: 'green',
//             padding: 10,
//             borderRadius: 5,
//             marginTop: 10,
//         },
//         rentButtonText: {
//             color: '#fff',
//             fontWeight: 'bold',
//         },
//         backButton: {
//             backgroundColor: '#ddd',
//             padding: 10,
//             borderRadius: 5,
//             marginTop: 10,
//         },
//         backButtonText: {
//             color: '#000',
//             fontWeight: 'bold',
//         },
//         centeredView: {
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: 22,
//         },
//         modalView2: {
//             margin: 20,
//             width: 390,
//             backgroundColor: "white",
//             borderRadius: 20,
//             padding: 35,
//             shadowColor: "#000",
//             shadowOffset: {
//                 width: 0,
//                 height: 2
//             },
//             shadowOpacity: 4.25,
//             shadowRadius: 4,
//             elevation: 5
//         },
//         backgroundOverlay: {
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 1
//         }, txt : {
//             fontSize : 22,
//             fontWeight: "bold"
//         }
//     });
//
//
// export default Home;
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Modal, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import hos from '../../assets/images/sketch.png';
import { Header } from '../../components/Header';
import axios from "axios";
import Receipt from "../(receipt)/receipt";
import { useNavigation } from "@react-navigation/native";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import icons from "../../constants/icons";
import CompleteRegistration from "../../components/completeRegistration";
import StudentCompleteRegistration from "../../components/StudentCompleteRegistration";
import Gallery from "../../components/gallery";

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
                const response = await fetch('http://172.16.0.183:9897/api/v1/apartment/allApartment', {
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
                const userUrl = `http://172.16.0.183:9897/api/v1/studentProfile/${userId}`;
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

    const handleViewButtonPress = async (apartment) => {
        setSelectedApartment(apartment);
        setModalVisible(true);

    };


    const handleRentButtonPress = async (selected) => {
        if (!isProfileComplete) {
            setShowCompleteProfile(true);
            return;
        }
        setIsSubmitting(true);

        try {
            const url = "http://172.16.0.183:9897/api/v1/payment/payForRent";
            const user = await AsyncStorage.getItem('user_id');
            const axiosInstance = axios.create({
                baseURL: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const payload = {
                apartmentId: selected,
                userId: user,
            };

            const response = await axiosInstance.post(url, payload);

            if (response.data) {
                const value = response.data.data;
                const ref = response.data.ref;
                await Linking.openURL(value);


                await waitForPaymentToComplete(ref);

                const res = await pollVerifyPayment(ref);
                if (res === "success") {
                    const landlord = await landlordId(selected);
                    console.log(landlord);

                    const userApartment = await findApartment(selected);

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

                    await deleteApartment(selected);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setModalVisible(false);
            setIsSubmitting(false);
        }
    };

    const waitForPaymentToComplete = async (ref) => {

        await new Promise(resolve => setTimeout(resolve, 10000))
    }
    const pollVerifyPayment = async (ref) => {
        try {
            let urlRef = `http://172.16.0.183:9897/api/v1/payment/verifyPayment/${ref}`;
            const axiosInstance = axios.create({baseURL: urlRef, headers: {'Content-Type': 'application/json'}})
            const refResponse = await axiosInstance.get(urlRef)
            return refResponse.data;

        } catch (error) {
            console.error(error)
        }
    }

    const landlordId = async (id) =>{
        try {
            let url = `http://172.16.0.183:9897/api/v1/apartment/getLandLord/${id}`;
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
            let url = `http://172.16.0.183:9897/api/v1/apartment/apartment/${id}`;
            const axiosInstance = axios.create({baseURL: url, headers: {'Content-Type': 'application/json'}})
            const response = await axiosInstance.get(url)
            return response.data;
        }catch (error){
            console.error(error)
        }
    }


    const deleteApartment = async (apartmentId) => {
        const apiBaseUrl = `http://172.16.0.183:9897/api/v1/deleteApartment/${apartmentId}`;
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
    const renderApartment = ({ item }) => (
        <View style={styles.apartmentContainer}>
            <Image source={{ uri: item.image }} style={styles.apartmentImage} />
            <View style={styles.apartmentDetails}>
                <Text style={styles.apartmentName}>{item.houseNumber}</Text>
                <Text style={styles.apartmentPrice}>Annual Rent: ${item.annualRentFee}</Text>
                <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => handleViewButtonPress(item)}
                >
                    <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                }
                title="Home"
            />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profileContainer}>
                    <Text style={styles.profileText}>Welcome, {userName}</Text>
                </View>
                {showCompleteProfile && (
                    <StudentCompleteRegistration
                        isVisible={showCompleteProfile}
                        onClose={() => setShowCompleteProfile(false)}
                    />
                )}
                <View style={styles.apartmentsContainer}>
                    {apartmentData.map(apartment => (
                        <View key={apartment.id} style={styles.apartmentCard}>
                            <Image source={{ uri: apartment.image }} style={styles.apartmentImage} />
                            <View style={styles.apartmentInfo}>

                                <View style={styles.textRow}>
                                    <Icon name="home-outline" size={20} color="#4F8EF7"/>
                                    <Text style={styles.apartmentRent}>{apartment.apartmentType}</Text>
                                </View>

                                <View style={styles.textRow}>
                                    <Icon name="cash-outline" size={20} color="#4F8EF7"/>
                                    <Text style={styles.apartmentRent}>Annual Rent Fee: {Number(apartment.annualRentFee) + 7000} Naira</Text>
                                </View>


                                <TouchableOpacity
                                    style={styles.viewButton}
                                    onPress={() => handleViewButtonPress(apartment)}
                                >
                                    <Text style={styles.viewButtonText}>View</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {selectedApartment && (
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <ScrollView style={styles.modalScroll}>
                            <Image source={{ uri: selectedApartment.image }} style={styles.modalImage} />
                            <View style={styles.modalDetails}>

                                <View style={styles.textRow}>
                                    <Icon name="home-outline" size={20} color="#4F8EF7"/>
                                    <Text style={styles.text}>{selectedApartment.apartmentType}</Text>
                                </View>


                                <View style={styles.textRow}>
                                    <Icon name="cash-outline" size={20} color="#4F8EF7"/>
                                    <Text style={styles.text}>Annual Rent Fee: {Number(selectedApartment.annualRentFee) + 7000} Naira</Text>
                                </View>

                                <View style={styles.textRow}>
                                    <Icon name="document-text-outline" size={20} color="#4F8EF7"/>
                                    <Text style={styles.text}>Agreement and Commission: {selectedApartment.agreementAndCommission} Naira</Text>
                                </View>

                                <View style={styles.textRow}>
                                    <Icon name="location-outline" size={20} color="#4F8EF7"/>
                                    <Text style={styles.text}>Location: {selectedApartment.location}</Text>
                                </View>


                                <View style={styles.textRw}>
                                    <Icon name="document-text-outline" size={20} color="#4F8EF7"/>
                                    <Text style={styles.text}>Description: {selectedApartment.description}</Text>
                                </View>


                            </View>

                            <View>
                                <Gallery id={selectedApartment.id}/>
                            </View>


                        </ScrollView>

                        <TouchableOpacity
                            style={styles.rentButton}
                            onPress={() => handleRentButtonPress(selectedApartment.id)}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.rentButtonText}>Rent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    scrollContainer: {
        padding: 16,
    },
    profileContainer: {
        marginBottom: 16,
    },
    profileText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    apartmentsContainer: {
        marginBottom: 16,
    },
    apartmentCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 3,
    },
    apartmentImage: {
        width: '100%',
        height: 200,
    },
    apartmentInfo: {
        padding: 16,
    },
    apartmentName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    apartmentRent: {
        fontSize: 16,
        color: '#888',
        marginBottom: 8,
    },
    viewButton: {
        backgroundColor: '#007bff',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    viewButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalScroll: {
        flex: 1,
    },
    modalImage: {
        width: '100%',
        height: 300,
    },
    modalDetails: {
        padding: 16,
    },
    modalName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalPrice: {
        fontSize: 20,
        color: '#888',
        marginBottom: 8,
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 16,
    },
    rentButton: {
        backgroundColor: '#007bff',
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 16,
        margin: 16,
    },
    rentButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backButton: {
        backgroundColor: '#888',
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 16,
        margin: 16,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textRow: {
             flexDirection: 'row',
             alignItems: 'center',
             gap: 8,
        },
    textRw: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop:50
    }
});

export default Home;
