import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpLandlord from '../app/(auth)/signupLandlord';
import LoginPage from '../app/(auth)/signinLandlord';

const Stack = createStackNavigator();

const Navigation = () => {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem("access_token");
            if (token) {
                setIsLoggedIn(true);
            }
            setLoading(false);
        };
        checkToken();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ? (
                    <Stack.Screen name="Home" component={Home} />
                ) : (
                    <>
                        <Stack.Screen name="SignUpLandlord" component={SignUpLandlord} />
                        <Stack.Screen name="LoginPage" component={LoginPage} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
