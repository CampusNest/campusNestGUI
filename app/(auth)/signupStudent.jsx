import {StyleSheet,Text,View} from "react-native";


const SignUpStudent = () =>{
    return(

        <View style={styles.container}>
            <Text>Student Registration loading...... </Text>
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

export default SignUpStudent;