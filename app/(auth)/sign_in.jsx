import {StyleSheet,Text,View} from "react-native";


const SignIn = () =>{
    return(

        <View style={styles.container}>
            <Text>Profile signin </Text>
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