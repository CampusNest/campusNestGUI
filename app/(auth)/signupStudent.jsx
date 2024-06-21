// import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Button, ActivityIndicator } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { BlurView } from 'expo-blur';
// import Images from "../../constants/images";
// import FormField from "../../components/FormField";
// import React, { useState, useEffect } from "react";
// import { Link, router } from "expo-router";
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
//
// const SignUpStudent = () => {
//     const [form, setForm] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: ''
//     });
//     const [isFormFilled, setIsFormFilled] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [modalVisible, setModalVisible] = useState(false);
//     const navigation = useNavigation();
//     const [welcomeModalVisible, setWelcomeModalVisible] = useState(false);
//
//     useEffect(() => {
//         const { firstName, lastName, email, password } = form;
//         if (firstName && lastName && email && password) {
//             setIsFormFilled(true);
//         } else {
//             setIsFormFilled(false);
//         }
//     }, [form]);
//
//     const submit = async () => {
//         try {
//             setIsSubmitting(true);
//             const response = await fetch('http://172.16.0.155:9897/api/v1/studentRegister', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(form),
//             });
//             const responseText = await response.json();
//             if (response.ok) {
//                 await AsyncStorage.setItem("access_token", responseText.access_token);
//
//                 const profileResponse = await fetch('http://172.16.0.155:9897/api/v1/landlordProfile', {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${responseText.access_token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 });
//
//                 const profileData = await profileResponse.json();
//
//                 if (profileResponse.ok) {
//                     await AsyncStorage.setItem("first_name", profileData.firstName);
//                     await AsyncStorage.setItem("last_name", profileData.lastName);
//                     await AsyncStorage.setItem("user_id",profileData.id.toString());
//                     await AsyncStorage.setItem("email", profileData.email);;
//                     setWelcomeModalVisible(true);
//
//
//                         router.push("/home");
//                 } else {
//                     setErrorMessage(profileData.error);
//                     setModalVisible(true);
//                 }
//             } else {
//                 setErrorMessage(responseText.error);
//                 setModalVisible(true);
//             }
//
//         } catch (error) {
//             console.error('Registration error:', error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//
//     const handleWelcomeModalClose = () => {
//         setWelcomeModalVisible(false);
//         router.push("/home");
//     };
//
//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <ScrollView>
//                 <View className={"w-full justify-center min-h-[85vh] px-4 my-6"}>
//                     <View style={{ alignItems: "center" }}>
//                         <Image source={Images.logo} resizeMode={'contain'} className={"w-[250px] h-[52px] mt-2"} />
//                     </View>
//
//                     <Text className={"mt-5"} style={{ fontWeight: "bold", fontSize: 20, color: "#091130" }}>Sign Up</Text>
//                     <FormField
//                         title="FirstName"
//                         value={form.firstName.trim()}
//                         handleChangeText={(e) => setForm({ ...form, firstName: e })}
//                         otherStyles='mt-7'
//                     />
//                     <FormField
//                         title="LastName"
//                         value={form.lastName.trim()}
//                         handleChangeText={(e) => setForm({ ...form, lastName: e })}
//                         otherStyles='mt-4'
//                     />
//                     <FormField
//                         title="Email"
//                         value={form.email.trim()}
//                         handleChangeText={(e) => setForm({ ...form, email: e })}
//                         otherStyles='mt-4'
//                         keyBoardType='email-address'
//                     />
//                     <FormField
//                         title="Password"
//                         value={form.password.trim()}
//                         handleChangeText={(e) => setForm({ ...form, password: e })}
//                         otherStyles='mt-4'
//                     />
//                     <View style={{ alignItems: "center", marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
//                         <Text style={{ color: "#091130" }}>Already registered? </Text>
//                         <Link
//                             href={'../(auth)/signInStudent'}
//                             style={{ color: "#006FFF" }}
//                         >
//                             Login
//                         </Link>
//                     </View>
//
//                     <TouchableOpacity
//                         onPress={submit}
//                         className="mt-9"
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? (
//                             <ActivityIndicator size="small" color="#fff" style={[styles.loadingIndicator,styles.container, isFormFilled ? styles.blueButton : styles.greyButton]}/>
//                         ) : (
//                             <Text style={[styles.container, isFormFilled ? styles.blueButton : styles.greyButton]}>
//                                 SignUp
//                             </Text>
//                         )}
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => {
//                     setModalVisible(!modalVisible);
//                 }}
//             >
//                 <View style={styles.centeredView}>
//                     <View style={styles.modalView}>
//                         <Text style={styles.modalText}>{errorMessage}</Text>
//                         <Button
//                             title="Close"
//                             onPress={() => setModalVisible(!modalVisible)}
//                         />
//                     </View>
//                 </View>
//             </Modal>
//
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={welcomeModalVisible}
//                 onRequestClose={handleWelcomeModalClose}
//             >
//                 <View style={styles.centeredView}>
//                     <View style={styles.modalView}>
//                         <Text style={styles.welcomeText}>Welcome!</Text>
//                         <Text style={styles.modalText}>Thank you for signing up. You're now part of our community.</Text>
//                         <Button
//                             title="Get Started"
//                             onPress={handleWelcomeModalClose}
//                         />
//                     </View>
//                 </View>
//             </Modal>
//         </SafeAreaView>
//     );
// }
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
//     loadingIndicator: {
//         paddingTop: 12.5,
//         height: 50,
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
//     absolute: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//     },
// });
//
// export default SignUpStudent;


import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from 'expo-blur';
import Images from "../../constants/images";
import FormField from "../../components/FormField";
import React, { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpStudent = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [welcomeModalVisible, setWelcomeModalVisible] = useState(false);

    useEffect(() => {
        const { firstName, lastName, email, password } = form;
        if (firstName && lastName && email && password) {
            setIsFormFilled(true);
        } else {
            setIsFormFilled(false);
        }
    }, [form]);

    const submit = async () => {
        try {
            setIsSubmitting(true);
            const response = await fetch('http://192.168.43.125:9897/api/v1/studentRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const responseText = await response.text();
            console.log(responseText)

            if (response.ok) {
                await AsyncStorage.setItem("user_id", responseText);
                await AsyncStorage.setItem("first_name", form.firstName);
                await AsyncStorage.setItem("last_name", form.lastName);
                await AsyncStorage.setItem("email", form.email);

                setWelcomeModalVisible(true);



            } else {
                setErrorMessage(responseText);
                setModalVisible(true);
            }

        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleWelcomeModalClose = () => {
        setWelcomeModalVisible(false);
        router.push("/home");
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View className={"w-full justify-center min-h-[85vh] px-4 my-6"}>
                    <View style={{ alignItems: "center" }}>
                        <Image source={Images.logo} resizeMode={'contain'} className={"w-[250px] h-[52px] mt-2"} />
                    </View>

                    <Text className={"mt-5"} style={{ fontWeight: "bold", fontSize: 20, color: "#091130" }}>Sign Up</Text>
                    <FormField
                        title="FirstName"
                        value={form.firstName.trim()}
                        handleChangeText={(e) => setForm({ ...form, firstName: e })}
                        otherStyles='mt-7'
                    />
                    <FormField
                        title="LastName"
                        value={form.lastName.trim()}
                        handleChangeText={(e) => setForm({ ...form, lastName: e })}
                        otherStyles='mt-4'
                    />
                    <FormField
                        title="Email"
                        value={form.email.trim()}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles='mt-4'
                        keyBoardType='email-address'
                    />
                    <FormField
                        title="Password"
                        value={form.password.trim()}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles='mt-4'
                    />
                    <View style={{ alignItems: "center", marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "#091130" }}>Already registered? </Text>
                        <Link
                            href={'../(auth)/signInStudent'}
                            style={{ color: "#006FFF" }}
                        >
                            Login
                        </Link>
                    </View>

                    <TouchableOpacity
                        onPress={submit}
                        className="mt-9"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator size="small" color="#fff" style={[styles.loadingIndicator,styles.container, isFormFilled ? styles.blueButton : styles.greyButton]}/>
                        ) : (
                            <Text style={[styles.container, isFormFilled ? styles.blueButton : styles.greyButton]}>
                                SignUp
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{errorMessage}</Text>
                        <Button
                            title="Close"
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={welcomeModalVisible}
                onRequestClose={handleWelcomeModalClose}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.welcomeText}>Welcome!</Text>
                        <Text style={styles.modalText}>Thank you for signing up. You're now part of our community.</Text>
                        <Button
                            title="Get Started"
                            onPress={handleWelcomeModalClose}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 324,
        height: 50,
        borderRadius: 50,
        textAlign: "center",
        fontSize: 18,
        paddingTop: 12.5,
        marginBottom: 20
    },
    blueButton: {
        backgroundColor: "#006FFF",
        color: "#fff",
    },
    greyButton: {
        backgroundColor: "grey",
        color: "#fff",
    },
    loadingIndicator: {
        paddingTop: 12.5,
        height: 50,
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
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default SignUpStudent;