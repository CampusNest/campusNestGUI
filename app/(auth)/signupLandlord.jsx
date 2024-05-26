import {StyleSheet,Text,View} from "react-native";


const SignUpLandLord = () =>{
    return(

        <View style={styles.container}>
            <Text>LandLord Registration loading..... </Text>
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

export default SignUpLandLord;