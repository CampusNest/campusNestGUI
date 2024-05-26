import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../../constants/images";
import FormField from "../../components/FormField";
import React, { useState, useEffect } from "react";
import { Link } from "expo-router";

const SignUpStudent = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [isFormFilled, setIsFormFilled] = useState(false);

    // useEffect to check if all fields are filled
    useEffect(() => {
        const { firstName, lastName, email, password } = form;
        if (firstName && lastName && email && password) {
            setIsFormFilled(true);
        } else {
            setIsFormFilled(false);
        }
    }, [form]);

    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-full justify-center min-h-[85 vh] px-4 my-6"}>
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
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles='mt-4'
                    />

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles='mt-4'
                        keyBoardType='email-address'
                    />

                    <View style={{ alignItems: "center", marginTop: 20 , flexDirection: "row" , justifyContent: "space-between"  }}>
                        <Text style={{ color: "#091130" }}>Already registered? </Text>
                        <Link
                            href={'../(auth)/signInStudent'}
                            style={{ color: "#006FFF" }}
                        >
                            Login
                        </Link>
                    </View>

                    <Link
                        href={'../(auth)/signup'}
                        style={[styles.container, isFormFilled ? styles.blueButton : styles.greyButton]}
                        className="mt-9"
                    >
                        SignUp
                    </Link>
                </View>
            </ScrollView>
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
    }
});

export default SignUpStudent;
