import {StyleSheet,Text,View} from "react-native";
import {StatusBar} from "react-native-web";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import tailwind from 'tailwindcss-react-native';
import {Header} from "../../components/Header";


const Home = () =>{
    const insets = useSafeAreaInsets();
    return(
        <View style={{paddingTop: insets.top,
            paddingButton : insets.bottom }}>
            <Header/>
        </View>

    )}



export default Home;