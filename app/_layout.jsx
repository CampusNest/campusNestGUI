
import {Stack} from "expo-router";



const RootLayout = () =>{

  return (
<Stack>
    <Stack.Screen name="index" options={{headerShown:false}}/>
  <Stack.Screen name="(boarding)/screentwo" options={{headerShown:false}}/>
  <Stack.Screen name="(boarding)/screenthree" options={{headerShown:false}}/>
  <Stack.Screen name="(boarding)/screenone" options={{headerShown:false}}/>
  <Stack.Screen name="(auth)/signup" options={{headerShown:false}}/>
  <Stack.Screen name="(auth)/sign_in" options={{headerShown:false}}/>

</Stack>
  )
}
export default RootLayout;




