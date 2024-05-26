import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Animated, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useNavigation, useRoute} from '@react-navigation/native';
import img from "../../constants/icons";
import {router} from "expo-router";




const Signup = () => {
    const [selected, setSelected] = useState(null);
    const slideAnim1 = useRef(new Animated.Value(300)).current;
    const slideAnim2 = useRef(new Animated.Value(-300)).current;
    const route = useRoute();

    useEffect(() => {
        Animated.stagger(200, [
            Animated.timing(slideAnim1, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim2, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }, [slideAnim1, slideAnim2]);

    const handlePress = (id) => {
        setSelected(id);
    };

    const handleNavigate = (route) => {
        router.push(route);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.main}>
                    <View style={styles.imageContainer}>
                        <Image source={img.campusIcon} style={styles.image} />
                    </View>
                    <Animated.View style={{ transform: [{ translateX: slideAnim1 }] }}>
                        <TouchableOpacity
                            style={[
                                styles.textContainer,
                                selected === 1 && styles.selectedContainer
                            ]}
                            onPress={() => handlePress(1)}
                        >
                            <Text style={[
                                styles.text,
                                selected === 1 && styles.selectedText
                            ]}>
                                I am a student
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={{ transform: [{ translateX: slideAnim2 }] }}>
                        <TouchableOpacity
                            style={[
                                styles.textContainer,
                                selected === 2 && styles.selectedContainer
                            ]}
                            onPress={() => handlePress(2)}
                        >
                            <Text style={[
                                styles.text,
                                selected === 2 && styles.selectedText
                            ]}>
                                I am a house owner
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                    {selected !== null && (
                        <View style={styles.absoluteContainer}>
                            {selected === 1 && (
                                <TouchableOpacity
                                    style={styles.routeButton}
                                    onPress={() => handleNavigate('../(auth)/signupStudent')}
                                >
                                    <Text style={styles.routeButtonText}>Proceed</Text>
                                </TouchableOpacity>
                            )}
                            {selected === 2 && (
                                <TouchableOpacity
                                    style={styles.routeButton}
                                    onPress={() => handleNavigate('../(auth)/signupLandlord')}
                                >
                                    <Text style={styles.routeButtonText}>Proceed</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    main: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
    },
    imageContainer: {
        position: 'absolute',
        top: 30,
        left: 30,
    },
    image: {
        width: 40,
        height: 40,
    },
    textContainer: {
        width: 324,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#D2E0FF",
        borderWidth: 1,
    },
    selectedContainer: {
        backgroundColor: '#E8734E',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    selectedText: {
        color: '#fff',
    },
    absoluteContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        alignItems: 'center',
    },
    routeButton: {
        width: 324,
        padding: 15,
        backgroundColor: '#006FFF',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    routeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Signup;
