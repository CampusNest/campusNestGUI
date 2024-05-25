import {View} from "react-native";

const CircleShape = ({ color, size }) => {
    return (
        <View
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: color,
            }}
        />
    );
};

export default CircleShape