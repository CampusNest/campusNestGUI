import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Images from "../../constants/images";
import FormField from "../../components/FormField";
import React, { useState, useEffect } from "react";
import {Link, router} from "expo-router";


const SignUpLandlord = () => {
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
            const response = await fetch('http://172.16.0.218:9897/api/v1/landlordRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });


            if (response.ok) {
                router.push("../(auth)/signinLandlord");
            } else {
                const responseText = await response.json();
                setErrorMessage(responseText.error);
                setModalVisible(true);
            }

        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsSubmitting(false);
        }
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
                        value={form.firstName}
                        handleChangeText={(e) => setForm({ ...form, firstName: e })}
                        otherStyles='mt-7'
                    />
                    <FormField
                        title="LastName"
                        value={form.lastName}
                        handleChangeText={(e) => setForm({ ...form, lastName: e })}
                        otherStyles='mt-4'
                    />
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles='mt-4'
                        keyBoardType='email-address'
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles='mt-4'
                    />
                    <View style={{ alignItems: "center", marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "#091130" }}>Already registered? </Text>
                        <Link
                            href={'../(auth)/signinLandlord'}
                            style={{ color: "#006FFF" }}
                        >
                            Login
                        </Link>
                    </View>

                    <TouchableOpacity
                        onPress={submit}
                        className="mt-9"
                    >
                        <Text style={[styles.container, isFormFilled ? styles.blueButton : styles.greyButton]}>
                            SignUp
                        </Text>
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
});

export default SignUpLandlord;