
import {Stack} from "expo-router";



const RootLayout = () =>{

  return (
<Stack>
  <Stack.Screen name="index" options={{headerShown:false}}/>
  <Stack.Screen name="(boarding)/screentwo" options={{headerShown:false}}/>
  <Stack.Screen name="(boarding)/screenthree" options={{headerShown:false}}/>
  <Stack.Screen name="(boarding)/screenone" options={{headerShown:false}}/>
  <Stack.Screen name="(auth)/signup" options={{headerShown:false}}/>
  <Stack.Screen name="(auth)/signupStudent" options={{headerShown:false}}/>
  <Stack.Screen name="(auth)/signupLandlord" options={{headerShown:false}}/>
  <Stack.Screen name="(auth)/signInStudent" options={{headerShown:false}}/>
  <Stack.Screen name="(auth)/signinLandlord" options={{headerShown:false}}/>
  <Stack.Screen name="(auth)/forgotPassword" options={{headerShown:false}}/>
  <Stack.Screen name="(mainPage)/pickApartment" options={{headerShown:false}}/>
  <Stack.Screen name="(auth)/forgotLandlordPassword" options={{headerShown:false}}/>
  <Stack.Screen name="(tab)" options={{headerShown:false}}/>
  <Stack.Screen name="(tab2)" options={{headerShown:false}}/>
  <Stack.Screen name="(rentingApartmentDone)/rentalProcessDone" options={{headerShown:false}}/>
  <Stack.Screen name="(receipt)/receipt" options={{headerShown:false}}/>
</Stack>
  )
}
export default RootLayout;




