import {ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert, Pressable} from "react-native";
import {StatusBar} from "react-native-web";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import tailwind from 'tailwindcss-react-native';
import {Header} from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import hos from "../../assets/images/sketch.png";
import axios from "axios";
import icons from "../../constants/icons";
import CompleteRegistration from "../../components/completeRegistration";
import AddGallery from "../../components/addGallery";

const Home2 = () =>{
    const [apartmentData, setApartmentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [apartmentToDelete, setApartmentToDelete] = useState(null);
    const [addGallery, setAddGallery] = useState(false)
    const [gallery, setGallery] = useState(null);

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

                const response = await fetch(`http://172.16.0.183:9897/api/v1/apartment/apartments/${userId}`, {
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

    const handleDelete = async (apartmentId) => {
        const apiBaseUrl = `http://172.16.0.183:9897/api/v1/deleteApartment/${apartmentId}`;
        const axiosInstance  = axios.create({
            baseURL: apiBaseUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        try {
            const response = await axiosInstance.delete(apiBaseUrl);
                if (response.data){
                    Alert.alert("  ", "Post deleted")
                }

            setApartmentData(prevApartmentData =>
                prevApartmentData.filter(apartment => apartment.id !== apartmentId)
            );

        } catch (error) {
            console.error("Error deleting apartment:", error);

        } finally {
            setModalVisible(false);
            setApartmentToDelete(null);
        }
    };


    const showDeleteConfirmation = (apartmentId) => {
        setApartmentToDelete(apartmentId);
        setModalVisible(true);
    };

    const showGalleryUpload = (apartmentId) =>{
        setAddGallery(true)
        setGallery(apartmentId)
    }



    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.content}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : apartmentData.length > 0 ? (
                    apartmentData.map(apartment => (
                        <View key={apartment.id} style={styles.apartmentContainer}>
                            <Image source={{ uri: apartment.image}} style={styles.image} />
                            <Text>Description: {apartment.description}</Text>
                            <Text>Type: {apartment.apartmentType}</Text>
                            <Text>Annual Rent Fee: {apartment.annualRentFee}</Text>
                            <Text>Agreement and Commission: {apartment.agreementAndCommission}</Text>
                            <Text>Location: {apartment.location}</Text>


                            <View style={styles.edel}>
                                <TouchableOpacity>
                                    <Text style={styles.edt}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => showDeleteConfirmation(apartment.id)}>
                                    <Text style={styles.delt}>Delete</Text>
                                </TouchableOpacity>
                            </View>



                            <View>

                                <Pressable onPress={() => showGalleryUpload(apartment.id)}>
                                    <Text>Add To Gallery</Text>
                                </Pressable>
                            </View>


                        </View>
                    ))
                ) : (
                    <>
                        <Image source={hos} style={styles.image} />
                        <Text>No House Posted </Text>
                    </>
                )}


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                        setApartmentToDelete(null);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Are you sure you want to delete this post?</Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.textStyle}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonDelete]}
                                    onPress={() => handleDelete(apartmentToDelete)}
                                >
                                    <Text style={styles.textStyle}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>



                {addGallery && (
                    <View style={styles.backgroundOverlay} />
                )}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addGallery}
                    onRequestClose={() => {}}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView2}>
                            <TouchableOpacity onPress={() => setAddGallery(!addGallery)}>
                                <Image source={icons.cancel} style={{width:25,height:25}} className="ml-72 mb-4"/>
                            </TouchableOpacity>
                            <Text style={styles.txt}>Add To Gallery</Text>

                            <AddGallery id={gallery}/>

                        </View>
                    </View>
                </Modal>

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
    edel : {
        flex :1 ,
        justifyContent: "center",
        flexDirection : "row",
        gap : 20,
        marginTop: 10
    },
    edt : {
        backgroundColor: "green",
        width : 70,
        height: 30,
        textAlign: "center",
        color : "#fff",
        paddingTop : 4,
        fontWeight : "bold"
    },
    delt : {
        backgroundColor: "red",
        width : 70,
        height: 30,
        textAlign: "center",
        color : "#fff",
        paddingTop : 4,
        fontWeight : "bold"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center"},

    modalButtons : {
        flexDirection : 'row',
        gap : 120,
        marginTop: 10
    },
    backgroundOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1
    }
    });




export default Home2;