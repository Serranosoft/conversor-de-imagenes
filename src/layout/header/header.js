import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Header({ navigation }) {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#06062A",
        alignItems: "flex-start",
        gap: 8,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        paddingTop: StatusBar.currentHeight + 16,
        paddingBottom: 12
    }
})