import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';

const AuthLayout = () => {
    const handleSubmit = async () => {
        await AsyncStorage.clear();
        router.push("../(auth)/signinLandlord");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleSubmit}>
                        <Icon name="exit-to-app" size={24} color="white" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ff5252",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
    },
    logoutText: {
        fontSize: 18,
        color: "#ffffff",
        marginLeft: 8,
    },
});

export default AuthLayout;
