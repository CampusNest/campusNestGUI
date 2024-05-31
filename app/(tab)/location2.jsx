// import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
// import {StatusBar} from "react-native-web";
// import Images from "../../constants/images";
// import FormField from "../../components/FormField";
// import React, {useState} from "react";
// import {SafeAreaView} from "react-native-safe-area-context";
//
//
// const Location2 = () =>{
//     const [form, setForm] = useState({
//         email: '',
//         password: ''
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [isFormFilled, setIsFormFilled] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     return(
//         <SafeAreaView style={{ flex: 1 }}>
//             <ScrollView>
//                 <View className={"w-full justify-center min-h-[85vh] px-4 my-6"}>
//
//
//                     <FormField
//                         title="Description"
//                         value={form.email}
//                         // handleChangeText={(e) => setForm({ ...form, email: e })}
//                         otherStyles='mt-7'
//                     />
//
//                     <FormField
//                         title="Apartment Type"
//                         value={form.email}
//                         // handleChangeText={(e) => setForm({ ...form, email: e })}
//                         otherStyles='mt-7'
//                     />
//                     <FormField
//                         title="Annual Rent"
//                         value={form.password}
//                         // handleChangeText={(e) => setForm({ ...form, password: e })}
//                         otherStyles='mt-4'
//                     />
//
//                     <FormField
//                         title="Location"
//                         value={form.password}
//                         // handleChangeText={(e) => setForm({ ...form, password: e })}
//                         otherStyles='mt-4'
//                     />
//
//                     <TouchableOpacity
//                         // onPress={submit}
//                         className="mt-9"
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? (
//                             <ActivityIndicator size="small" color="#fff" style={[styles.loadingIndicator,styles.container, isFormFilled ? styles.blueButton : styles.greyButton]}/>
//                         ) : (
//                             <Text style={[styles.container, isFormFilled ? styles.blueButton : styles.greyButton]}>
//                                 Post
//                             </Text>
//                         )}
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//
//             )}
//
//
// const styles = StyleSheet.create({
//     container: {
//         width: 324,
//         height: 50,
//         borderRadius: 50,
//         textAlign: "center",
//         fontSize: 18,
//         paddingTop: 12.5,
//         marginBottom: 20
//     },
//     blueButton: {
//         backgroundColor: "#006FFF",
//         color: "#fff",
//     },
//     greyButton: {
//         backgroundColor: "grey",
//         color: "#fff",
//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 22,
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: "white",
//         borderRadius: 20,
//         padding: 35,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: "center",
//         color: "red",
//     },
//     successText: {
//         marginBottom: 15,
//         textAlign: "center",
//         color: "green",
//         fontWeight: "bold",
//     },
//     absolute: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//     }
// });
//
// export default Location2;
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import FormField from "../../components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import {launchImageLibrary} from 'react-native-image-picker'




const Location2 = () => {
    const opt = {
        title: 'Select Image',
        type: 'library',
        options: {
            maxHeight: 200,
            maxWidth: 200,
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
        },
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        description: '',
        apartmentType: '',
        annualRent: '',
        location: '',

    });

    const pickImage = async () => {
        const result = await launchImageLibrary({
            title: 'Select Image',
            type: 'library',
            options: {
                maxHeight: 200,
                maxWidth: 200,
                selectionLimit: 1,
                mediaType: 'photo',
                includeBase64: false,
            },
        });
    }

    const submit = () => {
        setIsSubmitting(true);


        const request = {
            description: form.description,
            apartmentType: form.apartmentType,
            annualRent: form.annualRent,
            location: form.location,
            image: form.image
        };

        console.log(request);

        // Simulate API request
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Form submitted!");
        }, 2000);
    };

    const handleInputChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    <FormField
                        title="Description"
                        value={form.description}
                        onChangeText={(text) => handleInputChange('description', text)}
                        otherStyles='mt-7'
                    />
                    <FormField
                        title="Apartment Type"
                        value={form.apartmentType}
                        onChangeText={(text) => handleInputChange('apartmentType', text)}
                        otherStyles='mt-7'
                    />
                    <FormField
                        title="Annual Rent"
                        value={form.annualRent}
                        onChangeText={(text) => handleInputChange('annualRent', text)}
                        otherStyles='mt-4'
                    />
                    <FormField
                        title="Location"
                        value={form.location}
                        onChangeText={(text) => handleInputChange('location', text)}
                        otherStyles='mt-4'
                    />

                    <TouchableOpacity
                        onPress={pickImage}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Select Image</Text>
                    </TouchableOpacity>
                    {/*{form.image && (*/}
                    {/*    <Image source={{ uri: form.image.uri }} style={styles.imagePreview} />*/}
                    {/*)}*/}


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
    imagePreview: {
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 8
    }
});

export default Location2;
