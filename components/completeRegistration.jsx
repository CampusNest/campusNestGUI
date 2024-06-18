import {Alert, SafeAreaView, ScrollView, View, Text, StyleSheet, Button, TouchableOpacity, Image} from "react-native";
import React, {useEffect, useState} from "react";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormField from "./FormField";
import {Picker} from "@react-native-picker/picker";
import icons from "../constants/icons";

const CompleteRegistration = ()=>{
    const [stateOfOrigin,setStateOfOrigin] = useState('')
    const [phoneNumber ,setPhoneNumber] = useState('')
    const [stateOfResidence,setStateOfResidence] = useState('')
    const [image,setImage] = useState('')
    const [lId, setLId] = useState(null);
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

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

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={stateOfOrigin}
                            onValueChange={(itemValue) => setStateOfOrigin(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="State Of Origin" value="" />
                            <Picker.Item label="Abia" value="ABIA" />
                            <Picker.Item label="Umuahia" value="UMUAHIA" />
                            <Picker.Item label="Adamawa" value="ADAMAWA" />
                            <Picker.Item label="Yola" value="YOLA" />
                            <Picker.Item label="Akwa Ibom" value="AKWAIBOM" />
                            <Picker.Item label="Uyo" value="UYO" />
                            <Picker.Item label="Anambra" value="ANAMBRA" />
                            <Picker.Item label="Awka" value="AWKA" />
                            <Picker.Item label="Bauchi" value="BAUCHI" />
                            <Picker.Item label="Bauchi" value="BAUCHI" />
                            <Picker.Item label="Bayelsa" value="BAYELSA" />
                            <Picker.Item label="Yenagoa" value="YENAGOA" />
                            <Picker.Item label="Benue" value="BENUE" />
                            <Picker.Item label="Makurdi" value="MAKURDI" />
                            <Picker.Item label="Borno" value="BORNO" />
                            <Picker.Item label="Maiduguri" value="MAIDUGURI" />
                            <Picker.Item label="Cross River" value="CROSSRIVER" />
                            <Picker.Item label="Calabar" value="CALABAR" />
                            <Picker.Item label="Delta" value="DELTA" />
                            <Picker.Item label="Asaba" value="ASABA" />
                            <Picker.Item label="Ebonyi" value="EBONYI" />
                            <Picker.Item label="Abakaliki" value="ABAKALIKI" />
                            <Picker.Item label="Edo" value="EDO" />
                            <Picker.Item label="Benin City" value="BENINCITY" />
                            <Picker.Item label="Ekiti" value="EKITI" />
                            <Picker.Item label="Ado Ekiti" value="ADOEKITI" />
                            <Picker.Item label="Enugu" value="ENUGU" />
                            <Picker.Item label="Enugu" value="ENUGU" />
                            <Picker.Item label="Gombe" value="GOMBE" />
                            <Picker.Item label="Gombe" value="GOMBE" />
                            <Picker.Item label="Imo" value="IMO" />
                            <Picker.Item label="Owerri" value="OWERRI" />
                            <Picker.Item label="Jigawa" value="JIGAWA" />
                            <Picker.Item label="Dutse" value="DUTSE" />
                            <Picker.Item label="Kaduna" value="KADUNA" />
                            <Picker.Item label="Kaduna" value="KADUNA" />
                            <Picker.Item label="Kano" value="KANO" />
                            <Picker.Item label="Kano" value="KANO" />
                            <Picker.Item label="Katsina" value="KATSINA" />
                            <Picker.Item label="Katsina" value="KATSINA" />
                            <Picker.Item label="Kebbi" value="KEBBI" />
                            <Picker.Item label="Birnin Kebbi" value="BIRNINKEBBI" />
                            <Picker.Item label="Kogi" value="KOGI" />
                            <Picker.Item label="Lokoja" value="LOKOJA" />
                            <Picker.Item label="Kwara" value="KWARA" />
                            <Picker.Item label="Ilorin" value="ILORIN" />
                            <Picker.Item label="Lagos" value="LAGOS" />
                            <Picker.Item label="Ikeja" value="IKEJA" />
                            <Picker.Item label="Nasarawa" value="NASARAWA" />
                            <Picker.Item label="Lafia" value="LAFIA" />
                            <Picker.Item label="Niger" value="NIGER" />
                            <Picker.Item label="Minna" value="MINNA" />
                            <Picker.Item label="Ogun" value="OGUN" />
                            <Picker.Item label="Abeokuta" value="ABEOKUTA" />
                            <Picker.Item label="Ondo" value="ONDO" />
                            <Picker.Item label="Akure" value="AKURE" />
                            <Picker.Item label="Osun" value="OSUN" />
                            <Picker.Item label="Oshogbo" value="OSHOGBO" />
                            <Picker.Item label="Oyo" value="OYO" />
                            <Picker.Item label="Ibadan" value="IBADAN" />
                            <Picker.Item label="Plateau" value="PLATEAU" />
                            <Picker.Item label="Jos" value="JOS" />
                            <Picker.Item label="Rivers" value="RIVERS" />
                            <Picker.Item label="Port Harcourt" value="PORTHARCOURT" />
                            <Picker.Item label="Sokoto" value="SOKOTO" />
                            <Picker.Item label="Sokoto" value="SOKOTO" />
                            <Picker.Item label="Taraba" value="TARABA" />
                            <Picker.Item label="Jalingo" value="JALINGO" />
                            <Picker.Item label="Yobe" value="YOBE" />
                            <Picker.Item label="Damaturu" value="DAMATURU" />
                            <Picker.Item label="Zamfara" value="ZAMFARA" />
                            <Picker.Item label="Gusau" value="GUSAU" />
                            <Picker.Item label="FCT" value="FCT" />
                            <Picker.Item label="Abuja" value="ABUJA" />

                        </Picker>
                    </View>

                    <FormField
                        title="Phone Number"
                        value={phoneNumber}
                        onChangeText={(e) => setPhoneNumber(e)}
                        otherStyles='mt-4'
                    />

                    <View style={styles.pickerContain} >
                        <Picker
                            selectedValue={stateOfResidence}
                            onValueChange={(itemValue) => setStateOfResidence(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="State Of Residence" value="" />
                            <Picker.Item label="Abia" value="ABIA" />
                            <Picker.Item label="Umuahia" value="UMUAHIA" />
                            <Picker.Item label="Adamawa" value="ADAMAWA" />
                            <Picker.Item label="Yola" value="YOLA" />
                            <Picker.Item label="Akwa Ibom" value="AKWAIBOM" />
                            <Picker.Item label="Uyo" value="UYO" />
                            <Picker.Item label="Anambra" value="ANAMBRA" />
                            <Picker.Item label="Awka" value="AWKA" />
                            <Picker.Item label="Bauchi" value="BAUCHI" />
                            <Picker.Item label="Bauchi" value="BAUCHI" />
                            <Picker.Item label="Bayelsa" value="BAYELSA" />
                            <Picker.Item label="Yenagoa" value="YENAGOA" />
                            <Picker.Item label="Benue" value="BENUE" />
                            <Picker.Item label="Makurdi" value="MAKURDI" />
                            <Picker.Item label="Borno" value="BORNO" />
                            <Picker.Item label="Maiduguri" value="MAIDUGURI" />
                            <Picker.Item label="Cross River" value="CROSSRIVER" />
                            <Picker.Item label="Calabar" value="CALABAR" />
                            <Picker.Item label="Delta" value="DELTA" />
                            <Picker.Item label="Asaba" value="ASABA" />
                            <Picker.Item label="Ebonyi" value="EBONYI" />
                            <Picker.Item label="Abakaliki" value="ABAKALIKI" />
                            <Picker.Item label="Edo" value="EDO" />
                            <Picker.Item label="Benin City" value="BENINCITY" />
                            <Picker.Item label="Ekiti" value="EKITI" />
                            <Picker.Item label="Ado Ekiti" value="ADOEKITI" />
                            <Picker.Item label="Enugu" value="ENUGU" />
                            <Picker.Item label="Enugu" value="ENUGU" />
                            <Picker.Item label="Gombe" value="GOMBE" />
                            <Picker.Item label="Gombe" value="GOMBE" />
                            <Picker.Item label="Imo" value="IMO" />
                            <Picker.Item label="Owerri" value="OWERRI" />
                            <Picker.Item label="Jigawa" value="JIGAWA" />
                            <Picker.Item label="Dutse" value="DUTSE" />
                            <Picker.Item label="Kaduna" value="KADUNA" />
                            <Picker.Item label="Kaduna" value="KADUNA" />
                            <Picker.Item label="Kano" value="KANO" />
                            <Picker.Item label="Kano" value="KANO" />
                            <Picker.Item label="Katsina" value="KATSINA" />
                            <Picker.Item label="Katsina" value="KATSINA" />
                            <Picker.Item label="Kebbi" value="KEBBI" />
                            <Picker.Item label="Birnin Kebbi" value="BIRNINKEBBI" />
                            <Picker.Item label="Kogi" value="KOGI" />
                            <Picker.Item label="Lokoja" value="LOKOJA" />
                            <Picker.Item label="Kwara" value="KWARA" />
                            <Picker.Item label="Ilorin" value="ILORIN" />
                            <Picker.Item label="Lagos" value="LAGOS" />
                            <Picker.Item label="Ikeja" value="IKEJA" />
                            <Picker.Item label="Nasarawa" value="NASARAWA" />
                            <Picker.Item label="Lafia" value="LAFIA" />
                            <Picker.Item label="Niger" value="NIGER" />
                            <Picker.Item label="Minna" value="MINNA" />
                            <Picker.Item label="Ogun" value="OGUN" />
                            <Picker.Item label="Abeokuta" value="ABEOKUTA" />
                            <Picker.Item label="Ondo" value="ONDO" />
                            <Picker.Item label="Akure" value="AKURE" />
                            <Picker.Item label="Osun" value="OSUN" />
                            <Picker.Item label="Oshogbo" value="OSHOGBO" />
                            <Picker.Item label="Oyo" value="OYO" />
                            <Picker.Item label="Ibadan" value="IBADAN" />
                            <Picker.Item label="Plateau" value="PLATEAU" />
                            <Picker.Item label="Jos" value="JOS" />
                            <Picker.Item label="Rivers" value="RIVERS" />
                            <Picker.Item label="Port Harcourt" value="PORTHARCOURT" />
                            <Picker.Item label="Sokoto" value="SOKOTO" />
                            <Picker.Item label="Sokoto" value="SOKOTO" />
                            <Picker.Item label="Taraba" value="TARABA" />
                            <Picker.Item label="Jalingo" value="JALINGO" />
                            <Picker.Item label="Yobe" value="YOBE" />
                            <Picker.Item label="Damaturu" value="DAMATURU" />
                            <Picker.Item label="Zamfara" value="ZAMFARA" />
                            <Picker.Item label="Gusau" value="GUSAU" />
                            <Picker.Item label="FCT" value="FCT" />
                            <Picker.Item label="Abuja" value="ABUJA" />
                        </Picker>
                    </View>

                    <FormField
                        title="Bank Name"
                        value={bankName}
                        onChangeText={(e) => setBankName(e)}

                    />

                    <FormField
                        title="Account Number"
                        value={accountNumber}
                        onChangeText={(e) => setAccountNumber(e)}
                        otherStyles='mt-4'
                    />

                    <TouchableOpacity onPress={() => openFile()}>
                        <View className={'w-32 h-20 px-4  rounded-2xl justify-center items-center mt-5 border border-dashed'}>
                            <Text>
                                Profile Picture
                            </Text>

                                <Image source={icons.uploadPix} resizeMode={"contain"} className={"h-1/2 w-1/2"} />

                        </View>
                        <View className={"mt-10"}>
                            {image && <Image source={{ uri: image.uri }} resizeMode={"cover"} className={"w-full h-40 rounded-2xl"} />}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className={"mb-24"}>
                        <Button title="Submit"/>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    pickerContainer: {
        width: '100%',
        marginTop: 20,
        borderColor: 'grey',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10
    },
    picker: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },

    pickerContain: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        borderColor: 'grey',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10
    }

});
export default CompleteRegistration