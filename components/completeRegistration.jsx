import {Alert, SafeAreaView, ScrollView, View,Text} from "react-native";
import {useEffect, useState} from "react";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CompleteRegistration = ()=>{
    const [stateOfOrigin,setStateOfOrigin] = useState('')
    const [phoneNumber ,setPhoneNumber] = useState('')
    const [stateOfResidence,setStateOfResidence] = useState('')
    const [image,setImage] = useState('')
    const [lId, setLId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem("user_id");
            setLId(id);
        };
        fetchUserId();
    }, []);


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

        console.log('image is ',image)
    }

    const handleCompleteRegistration = async () =>{

    }


    return(
        <SafeAreaView>

            <ScrollView>

                <View>
                    <Text>t</Text>
                </View>

            </ScrollView>

        </SafeAreaView>
    )

}

export default CompleteRegistration