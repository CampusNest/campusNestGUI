import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserDetails = async () => {
    const firstName = await AsyncStorage.getItem("first_name");
    const lastName = await AsyncStorage.getItem("last_name");
    return { firstName, lastName };
};

export default getUserDetails()