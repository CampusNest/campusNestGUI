import {StyleSheet,Text,View} from "react-native";


const SignInStudent = () =>{
    return(

        <View style={styles.container}>
            <Text>Sign In Student loading..... </Text>
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

export default SignInStudent;