import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "react-native-web";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const AuthLayout = () => {
    const handleSubmit = async () => {
        await AsyncStorage.clear();
                router.push("../(auth)/signInStudent")

    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AuthLayout;
