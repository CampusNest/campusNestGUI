import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    Button,
    ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Images from "../../constants/images";
import FormField from "../../components/FormField";
import React, { useState, useEffect } from "react";
import {Link, router} from "expo-router";

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import icon from "../../constants/icons"
import axios from "axios";


const SignInStudent = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    // const navigation = useNavigation();
    // const [setAuth] = useAuth();
    useEffect(() => {
        const {  email, password } = form;
        if (email && password) {
            setIsFormFilled(true);
        } else {
            setIsFormFilled(false);
        }
    }, [form]);

    const apiBaseUrl = 'http://172.16.0.56:8080/api/v1/studentLogin';

    const axiosInstance = axios.create({
        baseURL: apiBaseUrl,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const submit = async () => {
        try {
            setIsSubmitting(true);
            const response = await axiosInstance.post(apiBaseUrl, form);

            if (response.data) {
                await AsyncStorage.setItem("user_id", response.data.id.toString());
                console.log(response.data.id)

                const profileResponse = await fetch(`http://172.16.0.56:8080/api/v1/studentProfile/${response.data.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const profileData = await profileResponse.json();

                if (profileResponse.ok) {
                    await AsyncStorage.setItem("first_name", profileData.firstName);
                    await AsyncStorage.setItem("last_name", profileData.lastName);
                    await AsyncStorage.setItem("user_id", profileData.id.toString());
                    await AsyncStorage.setItem("email", profileData.email);

                    if (profileData.role === "STUDENT") {
                        router.push("/home");
                    } else {
                        router.push("/home2");
                    }
                } else {
                    setErrorMessage(profileData.error);
                    setModalVisible(true);
                }
            } else {
                setErrorMessage(response.data.error);
                setModalVisible(true);
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data;
                setErrorMessage(`${errorMessage}`);
            } else if (error.request) {
                setErrorMessage("Network Error: Please check your internet connection or server status.");
            } else {
                setErrorMessage(`Error: ${error.message}`);
            }
            setModalVisible(true);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View className={"w-full justify-center min-h-[85vh] px-4 my-6"}>
                    <Link href={"../(auth)/signup"}>
                        <View>
                            <Image source={icon.exit} style={{width: 25, height:25}} className={"ml-72 mb-4"}/>

                        </View>

                    </Link>
                    <View style={{ alignItems: "center" }}>
                        <Image source={Images.logo} resizeMode={'contain'} className={"w-[250px] h-[52px] mt-2"} />
                    </View>

                    <Text className={"mt-5"} style={{ fontWeight: "bold", fontSize: 20, color: "#091130" }}>Sign In</Text>

                    <FormField
                        title="Email"
                        value={form.email.trim()}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles='mt-7'
                        keyBoardType='email-address'
                    />
                    <FormField
                        title="Password"
                        value={form.password.trim()}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles='mt-4'
                    />
                    <View style={{ alignItems: "center", marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "#091130" }}>Don't have an account? </Text>
                        <Link
                            href={'../(auth)/signupLandlord'}
                            style={{ color: "#006FFF" }}
                        >
                            Signup
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
                                SignIn
                            </Text>
                        )}
                    </TouchableOpacity>


                    <Link href={"../(auth)/forgotPassword"} style={styles.forgot}>
                        forgot password?
                    </Link>

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
    forgot:{
        color: "red"
    }
});

export default SignInStudent;
