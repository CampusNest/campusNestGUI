import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import icons from "../constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const Header = () => {
    const [userName, setUserName] = useState({ firstName: '', lastName: '' });
    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            const firstName = await AsyncStorage.getItem("first_name");
            const lastName = await AsyncStorage.getItem("last_name");
            setUserName({ firstName, lastName });
        };

        fetchUserName();
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userId = await AsyncStorage.getItem("user_id");
            if (userId) {
                const userUrl = `http://172.16.0.183:9897/api/v1/landlordProfile/${userId}`;
                try {
                    const response = await axios.get(userUrl);
                    setProfilePic(response.data.imageUrl);
                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                }
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <View style={styles.userDetails}>
                    <Image
                        source={icons.campusIcon}
                        style={styles.campusIcon}
                    />
                    <View>
                        <Text style={styles.userName}>{userName.firstName} {userName.lastName}</Text>
                    </View>
                </View>
                <View style={styles.profilePicContainer}>
                    {profilePic ? (
                        <Image source={{ uri: profilePic }} style={styles.profilePic} />
                    ) : (
                        <View style={styles.placeholderPic} />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 20,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    campusIcon: {
        height: 36,
        width: 36,
        borderRadius: 18,
    },
    greetingText: {
        fontSize: 14,
        color: '#90A4AE',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    profilePicContainer: {
        backgroundColor: 'grey',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    placeholderPic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'grey',
    },
});
