import {StyleSheet,Text,View} from "react-native";
import {StatusBar} from "react-native-web";


const SignIn = () =>{
    return(
        <View style={styles.container}>
            <Text>Profile demo</Text>
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

export default SignIn;