import { SplashScreen } from "expo-router";
import { StatusBar, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Header from "../src/layout/header/header";

SplashScreen.preventAutoHideAsync();

export default function Layout() {

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
        "poppins-regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "poppins-medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf")
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    // Esperar hasta que las fuentes se carguen
    if (!fontsLoaded) {
        return null;
    }


    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer screenOptions={{
                    drawerStyle: {
                        backgroundColor: "#06062A",
                        width: 240,
                        borderRightWidth: 1,
                        borderRightColor: "#fff",
                        justifyContent: "center",
                        paddingTop: 32,
                        gap: 24,
                    },
                    drawerInactiveTintColor: "#fff",
                    header: ({ navigation }) => <Header {...{ navigation }} />
                }}>
                    <Drawer.Screen name="index" options={{
                        drawerLabel: "Convertir HEIC a JPG",
                    }} />
                    <Drawer.Screen name="toPng" options={{
                        drawerLabel: "Convertir Imagen a PNG",
                    }} />
                    <Drawer.Screen name="toJpg" options={{
                        drawerLabel: "Convertir Imagen a JPG",
                    }} />
                    <Drawer.Screen name="toWebp" options={{
                        drawerLabel: "Convertir Imagen a WEBP",
                    }} />
                   
                </Drawer>

            </GestureHandlerRootView>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight,
    },
    wrapper: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
    }
})