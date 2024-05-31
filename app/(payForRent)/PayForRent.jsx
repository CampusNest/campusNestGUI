import {useEffect} from "react";
import {useRoute} from "@react-navigation/native";

const MakePaymentComponent = () => {

    const route = useRoute();
    const { user_id, apartment_id } = route.params;
    let url = "http://localhost:8080/api/v1/payment/payForRent";

    useEffect(() =>{

        const fetchPayment = async  () =>{

            const response = await fetch('')
        }
    },[]);

}