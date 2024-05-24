import {Image, Text, TouchableOpacity, View} from "react-native";
import icon from "../constants/icons";

const GoBackButton = ({handlePress}) =>{
    return(
        <TouchableOpacity onPress={handlePress}>
                <Image source={icon.whiteArrow} style={{width:35,height: 35,marginRight:90}} />
        </TouchableOpacity>

    )}


export default GoBackButton;