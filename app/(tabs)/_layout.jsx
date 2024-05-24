import {StyleSheet,Text,View} from "react-native";
import {StatusBar} from "react-native-web";
import {Tabs,Redirect} from "expo-router";


const TabsLayout = () =>{
    return(
        <View style={styles.container}>
          <Tabs>
              <Tabs.Screen name={"home"}/>
          </Tabs>
        </View>

    )}

const styles = StyleSheet.create({

});

export default TabsLayout ;