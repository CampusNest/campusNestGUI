import {ScrollView, Text, View,StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";


const Signup = () =>{
    return(
        <SafeAreaView>
            <ScrollView>
                <View className="w-full justify-center items-center h-full px-4" style={styles.main}>

                    <Text>I am a student</Text>
                    <Text>I am a house owner</Text>

                </View>

            </ScrollView>
        </SafeAreaView>

    )}

const styles = StyleSheet.create({
    main:{  display:"flex",
        flex:1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",

    },
});

export default Signup ;