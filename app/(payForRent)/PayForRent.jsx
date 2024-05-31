import React, {useEffect} from "react";
import {useRoute} from "@react-navigation/native";
import axios from "axios";
import {SafeAreaView} from "react-native-safe-area-context";
import {Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MakePaymentComponent = () => {

    const route = useRoute();



    useEffect(() =>{

        const fetchPayment = async  () =>{
            const payload = {
                apartmentId : apartment_id,
                userId : user_id
            };
            const response = await axios.post(url,payload)
            console.log(response.data)
        }

        fetchPayment()
    },[]);

}