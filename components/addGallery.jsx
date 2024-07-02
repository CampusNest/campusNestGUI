import {
    ActivityIndicator,
    Alert, Button,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import React, {useState} from "react";
import icons from "../constants/icons";

const AddGallery = ({id}) => {
    const [image,setImage] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const openFile = async () =>{
        const result = await DocumentPicker.getDocumentAsync({
            type: ['image/png', 'image/jpg', 'image/jpeg'],
            copyToCacheDirectory : true,

        })

        if (!result.canceled){
            setImage(result.assets[0])

        } else {
            setTimeout(()=>{
                Alert.alert("","cancelled")
            },200)
        }


    }

    const addToGallery = async () => {
        const url = `http://172.16.0.183:9897/api/v1/gallery/${id}`

        function sanitizeImageName(name) {
            return name.replace(/\s*\(\d*\)\s*/g, '').replaceAll(" ", "_");
        }

        var imageName;
        if (image.name !== undefined) {
            imageName = sanitizeImageName(image.name || 'untitled') + '.' + (image.name.split('.').pop() || 'jpg');
        }

        const formData = new FormData()

        formData.append("image",{
            uri: image.uri,
            type : image.mimeType || "image/jpeg",
            name : imageName
        })

        try {

            const response = await fetch(url,{
                method : "POST",
                body : formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                setModalVisible(true);
            } else {
                const responseJson = await response.text();
                setErrorMessage(responseJson);
                setModalVisible(true);
            }
            setIsSubmitting(true);

        }catch (error){
            console.log(error)
        }finally {
            setIsSubmitting(false);
            setImage('');
        }
    }



    return(
        <SafeAreaView>
            <ScrollView>
                <View>

                <TouchableOpacity onPress={() => openFile()}>
                    <View className={'w-52 h-40 px-4  rounded-2xl justify-center items-center mt-8 border border-dashed'}>
                        <View className={"w-14 h-14 border border-dashed justify-center items-center"}>
                            <Image source={icons.uploadPix} resizeMode={"contain"} className={"h-1/2 w-1/2"} />
                        </View>
                    </View>
                    <View className={"mt-10"}>
                        {image && <Image source={{ uri: image.uri }} resizeMode={"cover"} className={"w-full h-40 rounded-2xl"} />}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={addToGallery}
                    style={[styles.button, isSubmitting ? styles.disabledButton : null]}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Upload</Text>
                    )}
                </TouchableOpacity>


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(!modalVisible)}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={errorMessage ? styles.modalText : { color: "green", marginBottom: 20 }}>{errorMessage ? errorMessage : 'Uploaded Successfully'}</Text>
                                <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
                            </View>
                        </View>
                    </Modal>

                </View>

            </ScrollView>
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#006FFF",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 20
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center"
    },
    disabledButton: {
        opacity: 0.5
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
})

export default AddGallery;