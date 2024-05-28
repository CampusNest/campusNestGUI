import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "react-native-web";
import {apartments as apartmentArray} from "../data";
import {useEffect, useState} from "react";
import Card from "../../components/card"

export default function pickApartment(){
    const [apartments, setApartments] = useState(apartmentArray)

    useEffect(() => {
        if (!apartments.length){
            setApartments(apartments)
        }
    }, [apartments.length]);

    return(
        <SafeAreaView >
            <View className={"h-full flex-1 items-center justify-center bg-white"}>
                <StatusBar hidden={true}/>
                {
                    apartments.map(({image, price, apartmentType}, index)=>{
                        const isFirst = index === 0;
                        return(
                            <Card
                                key={price}
                                price={price}
                                apartmentType={apartmentType}
                                image={image}
                                isFirst = {isFirst}
                            />
                        )
                    })
                }
            </View>
        </SafeAreaView>
    )
}