import {Image, Text, TouchableOpacity, View} from "react-native";
import icon from "../constants/icons";

const NextButton = () =>{
    return(
        <TouchableOpacity>
            <Image source={icon.blueArrow}  style={{width:35,height: 35,marginLeft:90}}/>
        </TouchableOpacity>

    )}


export default NextButton;