import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ui } from "../utils/styles";

export default function Button({ icon, text, onClick, small }) {

    return (
        <TouchableOpacity style={[styles.button, small && styles.small ]} onPress={onClick}>
            { icon }
            <Text style={[ui.h4, styles.buttonText]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    button: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        backgroundColor: "#488aec",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,

        shadowColor: "#488aec",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    small: {
        transform: [{ scale: 0.7 }]
    },
    buttonText: {
        marginBottom: -4
    }
})