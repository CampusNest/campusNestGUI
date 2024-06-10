// import React, { useState } from "react";
// import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
// import FormField from "../../components/FormField";
// import { SafeAreaView } from "react-native-safe-area-context";
// import {launchImageLibrary} from 'react-native-image-picker'
//
// import ImagePickerExample from "../../components/pickImage";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
//
//
//
//
// const Location2 = () => {
//     const opt = {
//         title: 'Select Image',
//         type: 'library',
//         options: {
//             maxHeight: 200,
//             maxWidth: 200,
//             selectionLimit: 1,
//             mediaType: 'photo',
//             includeBase64: false,
//         },
//     };
//     const lId = AsyncStorage.getItem("user_id");
//
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [form, setForm] = useState({
//         landlordId : lId,
//         description: '',
//         location: '',
//         apartmentType: '',
//         annualRentFee: '',
//         agreementAndCommission : '',
//         uploadApartmentImageRequest : {
//             multipartFiles : null
//         },
//
//     });
//
//
//     const handleInputChange = (name, value) => {
//         setForm({
//             ...form,
//             [name]: value,
//         });
//     };
//
//     const handleFileChange = (image,val) => {
//         setForm({
//             ...form,
//             [image] : val,
//         });
//     };
//
//
//     const submit = async () => {
//         setIsSubmitting(true);
//
//
//
//         const apiBaseUrl = 'http://192.168.0.196:9897/api/v1/postApartment';
//
//         const axiosInstance = axios.create({
//             baseURL : apiBaseUrl,
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 'Accept': 'application/json'
//             }
//         })
//
//         try {
//
//             const response =await axiosInstance.post(apiBaseUrl,form);
//             console.log(response.data.data)
//
//         }catch (error){
//             console.log(error.response)
//         }
//
//
//         setTimeout(() => {
//             setIsSubmitting(false);
//             alert("Form submitted!");
//         }, 2000);
//     };
//
//     // const handleInputChange = (key, value) => {
//     //     setForm({ ...form, [key]: value });
//     // };
//
//     // const handleImageSelected = (uri) => {
//     //     setForm({ ...form, image: uri });
//     // };
//
//     // const handleFileChange = (e) => {
//     //     setForm({
//     //         ...form,
//     //         image: e.target.files[0]
//     //     });
//     // };
//
//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <ScrollView>
//                 <View style={styles.container}>
//                     <FormField
//                         title="Description"
//                         value={form.description}
//                         onChangeText = {(e) => setForm({...form,description: e})}
//
//                         otherStyles='mt-7'
//                     />
//
//                     <FormField
//                         title="Location"
//                         value={form.location}
//                         onChangeText={(e) => setForm({...form,location : e})}
//                         otherStyles='mt-4'
//                     />
//
//
//                     <FormField
//                         title="Apartment Type"
//                         value={form.apartmentType}
//                         onChangeText={(e) => setForm({...form,apartmentType: e})}
//                         otherStyles='mt-7'
//                     />
//                     <FormField
//                         title="Annual Rent"
//                         value={form.annualRentFee}
//                         onChangeText={(e) => setForm({...form,annualRentFee: e})}
//                         otherStyles='mt-4'
//                     />
//
//                     <FormField
//                         title="Agreement and Commission"
//                         value={form.agreementAndCommission}
//                         onChangeText={(e) => setForm({...form,agreementAndCommission: e})}
//                         otherStyles='mt-4'
//                     />
//
//
//                     <ImagePickerExample value={form.uploadApartmentImageRequest} onImageSelected={(e) => handleFileChange("uploadApartmentImageRequest",e)}/>
//
//
//
//                     <TouchableOpacity
//                         onPress={submit}
//                         style={[styles.button, isSubmitting ? styles.disabledButton : null]}
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? (
//                             <ActivityIndicator size="small" color="#fff" />
//                         ) : (
//                             <Text style={styles.buttonText}>Post</Text>
//                         )}
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20
//     },
//     button: {
//         backgroundColor: "#006FFF",
//         borderRadius: 8,
//         paddingVertical: 12,
//         paddingHorizontal: 20,
//         marginTop: 20
//     },
//     buttonText: {
//         color: "#fff",
//         fontSize: 18,
//         textAlign: "center"
//     },
//     disabledButton: {
//         opacity: 0.5
//     },
//     imagePreview: {
//         width: 200,
//         height: 200,
//         marginTop: 20,
//         borderRadius: 8
//     }
// });
//
// export default Location2;
// // onChangeText={(text) => handleInputChange('apartmentType', text)}
//
// import React, { useState,useEffect } from "react";
// import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import FormField from "../../components/FormField";
// import { SafeAreaView } from "react-native-safe-area-context";
// import ImagePickerExample from "../../components/pickImage";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Media from "../../components/Media";
//
// const Location2 = () => {
//     const [lId, setLId] = useState(null);
//
//     useEffect(() => {
//         const fetchUserId = async () => {
//             const id = await AsyncStorage.getItem("user_id");
//             setLId(id);
//         };
//         fetchUserId();
//     }, []);
//
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     // const [form, setForm] = useState({
//     //     landlordId: '',
//     //     description: '',
//     //     location: '',
//     //     apartmentType: '',
//     //     annualRentFee: '',
//     //     agreementAndCommission: '',
//     //     uploadApartmentImageRequest: {
//     //         multipartFiles: [],
//     //     },
//     // });
//     const [form, setForm] = useState({
//         landlordId: '',
//         description: '',
//         location: '',
//         apartmentType: '',
//         annualRentFee: '',
//         agreementAndCommission: '',
//         multipartFiles: [],
//
//     });
//
//     useEffect(() => {
//         if (lId) {
//             setForm((prevForm) => ({
//                 ...prevForm,
//                 landlordId: lId,
//             }));
//         }
//     }, [lId]);
//
//     const handleInputChange = (name, value) => {
//         setForm({
//             ...form,
//             [name]: value,
//         });
//     };
//
//     const handleFileChange = (file) => {
//         setForm({
//             ...form,
//                 multipartFiles: file,
//
//         });
//     };
//
//     // const submit = async () => {
//     //     setIsSubmitting(true);
//     //
//     //     const apiBaseUrl = 'http://192.168.0.196:9897/api/v1/postApartment';
//     //
//     //     const formData = new FormData();
//     //     formData.append('landLordId', form.landlordId);
//     //     formData.append('description', form.description);
//     //     formData.append('location', form.location);
//     //     formData.append('apartmentType', form.apartmentType);
//     //     formData.append('annualRentFee', form.annualRentFee);
//     //     formData.append('agreementAndCommission', form.agreementAndCommission);
//     //
//     //     if (form.uploadApartmentImageRequest.multipartFiles) {
//     //         formData.append('uploadApartmentImageRequest.multipartFiles', {
//     //             uri: form.uploadApartmentImageRequest.multipartFiles.uri,
//     //             type: form.uploadApartmentImageRequest.multipartFiles.type,
//     //             name: form.uploadApartmentImageRequest.multipartFiles.fileName,
//     //         });
//     //     }
//     //
//     //     console.log('FormData to be sent:', formData);
//     //
//     //     try {
//     //         const response = await axios.post(apiBaseUrl, formData, {
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //             }
//     //         });
//     //
//     //         console.log('Response from API:', response.data);
//     //
//     //         alert("Form submitted!");
//     //     } catch (error) {
//     //         console.log('Error:', error);
//     //         if (error.response) {
//     //             console.log('Error response data:', error.response.data);
//     //         } else {
//     //             console.log('Error message:', error.message);
//     //         }
//     //     } finally {
//     //         setIsSubmitting(false);
//     //     }
//     // };
//     const submit = async () => {
//         setIsSubmitting(true);
//
//         const apiBaseUrl = 'http://172.16.0.155:9897/api/v1/postApartment';
//
//         try {
//             const formData = new FormData();
//             formData.append('landLordId', form.landlordId);
//             formData.append('description', form.description);
//             formData.append('location', form.location);
//             formData.append('apartmentType', form.apartmentType);
//             formData.append('annualRentFee', form.annualRentFee);
//             formData.append('agreementAndCommission', form.agreementAndCommission);
//             formData.append('multipartFiles',form.multipartFiles)
//
//             // const multipartFiles = form.uploadApartmentImageRequest.multipartFiles;
//             // if (Array.isArray(multipartFiles)) {
//             //     multipartFiles.forEach(file => {
//             //         formData.append('multipartFiles', {
//             //             uri: file.uri,
//             //             type: file.type,
//             //             name: file.name,
//             //         });
//             //     });
//             // } else {
//             //     formData.append('multipartFiles', {
//             //         uri: multipartFiles.uri,
//             //         type: multipartFiles.type,
//             //         name: multipartFiles.name,
//             //     });
//             // }
//              console.log(formData)
//             const response = await fetch(apiBaseUrl, {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Content-Type': 'multipart/form-data; ',
//                 },
//             });
//             let responseJson = await response.json();
//             if (responseJson.status === 1) {
//                 alert('Upload Successful');
//             }
//          else {
//             alert('Please Select File first');
//         }
//
//             alert("Form submitted!");
//         } catch (error) {
//             console.log('Error:', error);
//             if (error.response) {
//                 console.log('Error response data:', error.response.data);
//             } else {
//                 console.log('Error message:', error.message);
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//
//
//     // setTimeout(() => {
//     //         setIsSubmitting(false);
//     //         alert("Form submitted!");
//     //     }, 2000);
//
//
//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <ScrollView>
//                 <View style={styles.container}>
//                     <FormField
//                         title="Description"
//                         value={form.description}
//                         onChangeText={(e) => handleInputChange('description', e)}
//                         otherStyles='mt-7'
//                     />
//                     <FormField
//                         title="Location"
//                         value={form.location}
//                         onChangeText={(e) => handleInputChange('location', e)}
//                         otherStyles='mt-4'
//                     />
//                     <FormField
//                         title="Apartment Type"
//                         value={form.apartmentType}
//                         onChangeText={(e) => handleInputChange('apartmentType', e)}
//                         otherStyles='mt-7'
//                     />
//                     <FormField
//                         title="Annual Rent"
//                         value={form.annualRentFee}
//                         onChangeText={(e) => handleInputChange('annualRentFee', e)}
//                         otherStyles='mt-4'
//                     />
//                     <FormField
//                         title="Agreement and Commission"
//                         value={form.agreementAndCommission}
//                         onChangeText={(e) => handleInputChange('agreementAndCommission', e)}
//                         otherStyles='mt-4'
//                     />
//                     <ImagePickerExample onImageSelected={(e) => handleFileChange(e)} />
//                     {/*<Media/>*/}
//                     <TouchableOpacity
//                         onPress={submit}
//                         style={[styles.button, isSubmitting ? styles.disabledButton : null]}
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? (
//                             <ActivityIndicator size="small" color="#fff" />
//                         ) : (
//                             <Text style={styles.buttonText}>Post</Text>
//                         )}
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20
//     },
//     button: {
//         backgroundColor: "#006FFF",
//         borderRadius: 8,
//         paddingVertical: 12,
//         paddingHorizontal: 20,
//         marginTop: 20
//     },
//     buttonText: {
//         color: "#fff",
//         fontSize: 18,
//         textAlign: "center"
//     },
//     disabledButton: {
//         opacity: 0.5
//     },
//     imagePreview: {
//         width: 200,
//         height: 200,
//         marginTop: 20,
//         borderRadius: 8
//     }
// });
//
// export default Location2;

//--------------------------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormField from "../../components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePickerExample from "../../components/pickImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from '@react-native-picker/picker';




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
    const [multipartFiles, setMultipartFiles] = useState(null);

    const submit = async () => {
        setIsSubmitting(true);

        const apiBaseUrl = 'http://172.16.0.155:9897/api/v1/postApartment';

        try {
            const formData = new FormData();
            formData.append("landlordId", lId);
            formData.append("description", description);
            formData.append("location", location);
            formData.append("apartmentType", apartmentType);
            formData.append("annualRentFee", annualRentFee);
            formData.append("agreementAndCommission", agreementAndCommission);

            if (multipartFiles && multipartFiles.uri && multipartFiles.type && multipartFiles.name) {
                formData.append("multipartFiles", {
                    uri: multipartFiles.uri,
                    type: multipartFiles.type,
                    name: multipartFiles.name,
                });
            } else {
                console.error("Multipart file is missing required properties", multipartFiles);
            }

            console.log('FormData:', formData);
            console.log("multipart", multipartFiles)

            const response = await fetch(apiBaseUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                },
            });
            const responseJson = await response.json();
            if (responseJson.status === 1) {
                alert('Upload Successful');
            } else {
                alert('Please Select File first');
            }

            alert("Form submitted!");
        } catch (error) {
            console.log('Error:', error);
            if (error.response) {
                console.log('Error response data:', error.response.data);
            } else {
                console.log('Error message:', error.message);
            }
        } finally {
            setIsSubmitting(false);
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
                    {/*<FormField*/}
                    {/*    title="Apartment Type"*/}
                    {/*    value={apartmentType}*/}
                    {/*    onChangeText={(e) => setApartmentType(e)}*/}
                    {/*    otherStyles='mt-7'*/}
                    {/*/>*/}

                    <View style={styles.pickerContainer}>

                        <Picker
                            selectedValue={apartmentType}
                            onValueChange={(itemValue, itemIndex) => setApartmentType(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Apartment Type" value="" />
                            <Picker.Item label="Mini Flat" value="MINIFLAT"  />
                            <Picker.Item label="Self Contained" value="SELFCONTAINED"/>
                            <Picker.Item label="Shared Apartment" value="SHAREDAPARTMENT" />
                            <Picker.Item label="Studio Apartment" value="STUDIOAPARTMENT" />
                            <Picker.Item label="Two Bedroom" value="TWOBEDROOM"/>
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
                    <ImagePickerExample onImageSelected={(image) => setMultipartFiles(image)} />
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
        borderColor : 'grey',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10
    },
    pickerTitle: {
        fontSize: 16,
        marginBottom: 8,
    },
    picker: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },

});

export default Location2;

