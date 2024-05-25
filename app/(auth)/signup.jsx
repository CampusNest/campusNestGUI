import {StyleSheet,Text,View} from "react-native";
import {StatusBar} from "react-native-web";
import {Link} from "expo-router";


const Signup = () =>{
    return(
        <View style={styles.container}>

            <Text>Sign up</Text>
        </View>

    )}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flex:1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Signup ;