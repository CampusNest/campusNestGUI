import { SafeAreaView } from "react-native-safe-area-context";
import { Image, FlatList, Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallery = ({ id }) => {
    const [galleryData, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const getGalleryImages = async (id) => {
        const url = `http://172.16.0.183:9897/api/v1/apartment/apartmentGallery/${id}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setGallery(response.data);
            setLoading(false);
            console.log("gallery", response.data);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getGalleryImages(id);
    }, [id]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
                setSelectedImage(item);
                setModalVisible(true);
            }}
        >
            <Image style={styles.image} source={{ uri: item }} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <Text style={styles.loadingText}>Loading....</Text>
            ) : galleryData.length > 0 ? (
                <FlatList
                    data={galleryData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <Text style={styles.loadingText}>No Images</Text>
            )}
            {selectedImage && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                        <Image style={styles.fullImage} source={{ uri: selectedImage }} />
                    </View>
                </Modal>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    loadingText: {
        marginTop: 50,
        textAlign: 'center',
    },
    list: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    imageContainer: {
        margin: 10,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
    },
    modalView: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
    },
    closeButtonText: {
        color: 'white',
    },
    fullImage: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
});

export default Gallery;
