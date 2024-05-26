import { FontAwesome } from '@expo/vector-icons';
import {useState} from "react";
import {TextInput, TouchableOpacity, View,Text} from "react-native";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className={"text-base font-medium"} style={{ color: "#091130" }}>
                {title}
            </Text>

            <View
                className={"w-full h-12 px-4 bg-black-100 flex flex-row items-center"} // Modified styling
                style={{
                    borderColor: isFocused ? "#006FFF" : "#5C5C5C",
                    borderWidth: 1,
                    borderRadius: 8,
                }}
            >
                <TextInput
                    className={"text-black text-base flex-1"} // Modified styling
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={"#6A6A6A"}
                    onChangeText={handleChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={title === "Password" && !showPassword}
                    style={{ height: '100%' }}
                    {...props}
                />

                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 8 }}>
                        <FontAwesome name={!showPassword ? 'eye' : 'eye-slash'} size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
