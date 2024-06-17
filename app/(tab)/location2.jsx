import React, { useState, useEffect } from "react";
import {Image} from "react-native";
import {
    ActivityIndicator,
    Alert,
    Button,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import FormField from "../../components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePickerExample from "../../components/pickImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';
import icons from "../../constants/icons";
import * as DocumentPicker from "expo-document-picker"

const Location2 = () => {
    const [lId, setLId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem("user_id");
            setLId(id);
        };
        fetchUserId();
    }, []);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [apartmentType, setApartmentType] = useState(null);
    const [annualRentFee, setAnnualRentFee] = useState('');
    const [agreementAndCommission, setAgreementAndCommission] = useState('');
    const [image, setImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(false);


    const openPicker = async () =>{
        const result = await DocumentPicker.getDocumentAsync({
            type: ['image/png', 'image/jpg', 'image/jpeg'],
            copyToCacheDirectory : true,

        })

        if (!result.canceled){
            setImage(result.assets[0])

        } else {
            setTimeout(()=>{
                Alert.alert("","cancelled")
            },200)
        }

        console.log('image is ',image)
    }



    const submit = async () => {


        setIsSubmitting(true);

        const apiBaseUrl = 'http://192.168.43.125:9897/api/v1/postApartment';

        try {

            const formData = new FormData();

            function sanitizeImageName(name) {
                return name.replace(/\s*\(\d*\)\s*/g, '').replaceAll(" ", "_");
            }
              var imageName;
             if (image.name !== undefined){
            imageName = sanitizeImageName(image.name || 'untitled') + '.' + (image.name.split('.').pop() || 'jpg');}


            formData.append("image", {
                uri: image.uri,
                type: image.mimeType || 'image/jpeg',
                name: imageName
            });
            console.log(imageName)
            formData.append("landLordId", lId);
            formData.append("description", description);
            formData.append("location", location);
            formData.append("apartmentType", apartmentType);
            formData.append("annualRentFee", annualRentFee);
            formData.append("agreementAndCommission", agreementAndCommission);





            console.log('FormData:', formData);
            console.log(image);

            const response = await fetch(apiBaseUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });



            if (response.ok){
                setModalVisible(true)
            }

            else{
                const responseJson = await response.text();
                setErrorMessage(responseJson)
                setModalVisible(true)
            }



        } catch (error) {
            console.log('Error:', error);
            if (error.response) {
                console.log('Error response data:', error.response.data);
            } else {
                console.log('Error message:', error.message);
            }
        } finally {
            setIsSubmitting(false);
           setDescription('')
            setLocation('')
            setApartmentType(null)
            setAnnualRentFee('')
            setAgreementAndCommission('')
            setImage('')

        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    <FormField
                        title="Description"
                        value={description}
                        onChangeText={(e) => setDescription(e)}
                        otherStyles='mt-7'
                    />
                    <FormField
                        title="Location"
                        value={location}
                        onChangeText={(e) => setLocation(e)}
                        otherStyles='mt-4'
                    />
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={apartmentType}
                            onValueChange={(itemValue) => setApartmentType(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Apartment Type" value="" />
                            <Picker.Item label="Mini Flat" value="MINIFLAT" />
                            <Picker.Item label="Self Contained" value="SELFCONTAINED" />
                            <Picker.Item label="Shared Apartment" value="SHAREDAPARTMENT" />
                            <Picker.Item label="Studio Apartment" value="STUDIOAPARTMENT" />
                            <Picker.Item label="Two Bedroom" value="TWOBEDROOM" />
                            <Picker.Item label="Three Bedroom" value="THREEBEDROOM" />
                        </Picker>
                    </View>
                    <FormField
                        title="Annual Rent"
                        value={annualRentFee}
                        onChangeText={(e) => setAnnualRentFee(e)}
                        otherStyles='mt-4'
                    />
                    <FormField
                        title="Agreement and Commission"
                        value={agreementAndCommission}
                        onChangeText={(e) => setAgreementAndCommission(e)}
                        otherStyles='mt-4'
                    />
                 <TouchableOpacity onPress={()=>openPicker()}>
                       <View className={'w-52 h-40 px-4  rounded-2xl justify-center items-center mt-8 border border-dashed'}>
                             <View className={"w-14 h-14 border border-dashed justify-center items-center"}>
                                 <Image source={icons.uploadPix} resizeMode={"contain"} className={"h-1/2 w-1/2"}/>
                             </View>
                         </View>

                         <View className={"mt-10"}>
                             {image && <Image source={{uri : image.uri}} resizeMode={"cover"} className={"w-full h-40 rounded-2xl"}/>}
                     </View>
                     </TouchableOpacity>
                    <TouchableOpacity
                        onPress={submit}
                        style={[styles.button, isSubmitting ? styles.disabledButton : null]}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Post</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={errorMessage ? styles.modalText : {color : "green", marginBottom: 20}}>{errorMessage ? errorMessage : 'Posted Successfully'}</Text>
                        <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    button: {
        backgroundColor: "#006FFF",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 20
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center"
    },
    disabledButton: {
        opacity: 0.5
    },
    pickerContainer: {
        width: '100%',
        marginTop: 20,
        borderColor: 'grey',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10
    },
    picker: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "red",
    }
});

export default Location2;
