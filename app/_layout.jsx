
import {Stack} from "expo-router";



const RootLayout = () =>{

  return (
<Stack>
    <Stack.Screen name="index" options={{headerShown:false}}/>
  <Stack.Screen name="(boarding)/screentwo" options={{headerShown:false}}/>
  <Stack.Screen name="(boarding)/screenthree" options={{headerShown:false}}/>
  <Stack.Screen name="(auth)" options={{headerShown:false}}/>
</Stack>
  )
}
export default RootLayout;




