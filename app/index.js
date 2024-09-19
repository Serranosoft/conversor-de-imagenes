import { Image, StyleSheet, Text, ToastAndroid, View } from "react-native";
import Button from "../src/components/button";
import { ui } from "../src/utils/styles";
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useState } from "react";
import { FilePicker, GalleryPicker } from "../src/utils/pickers";
import * as MediaLibrary from 'expo-media-library';
import { convertImage } from 'react-native-simple-heic2jpg';
import * as Progress from 'react-native-progress';
import AntDesign from '@expo/vector-icons/AntDesign';

const ALBUM_NAME = "IMAGENES CONVERTIDAS";
const MIN_PROGRESS = 1;

export default function Index() {

    const [image, setImage] = useState(null);
    const [conversion, setConversion] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (image) fromHeicToJPG();
    }, [image])

    useEffect(() => {
        if (conversion) {
            let time = 0;
            const interval = setInterval(() => {
                time += 0.1;
                if (time <= 1.1) {
                    setProgress(time);
                } else {
                    clearInterval(interval);
                }
            }, 100);
        }
    }, [conversion])

    /** Encargado de solicitar los permisos necesarios para almacenar el resultado en la galería del dispositivo */
    async function requestPermissions() {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync(false, ["photo"]);
            if (status === "granted") {
                save();
            } else {
                ToastAndroid.showWithGravityAndOffset(PERMISSION_DENIED, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.showWithGravityAndOffset(PERMISSION_DENIED, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
    }

    /** Conversión de HEIC a JPG */
    async function fromHeicToJPG() {
        const result = await convertImage(image);
        setConversion(result);
    }

    /** Almacenar en galería */
    async function save() {
        const asset = await MediaLibrary.createAssetAsync(conversion);
        let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
        if (!album) {
            album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset, false);
        } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
    }

    useEffect(() => {
        console.log(image);
    }, [image])

    return (
        <>
            <View style={styles.container}>
                <View style={styles.hero}>
                    <Text style={ui.h2}>Convierte tu imagen HEIC a JPG</Text>
                    <View style={styles.actions}>
                        <Button
                            text={"Abrir galería"}
                            icon={<Entypo style={styles.buttonImg} name="images" size={24} color="#fff" />}
                            onClick={() => GalleryPicker(setImage)}
                        />
                        <Text style={[ui.muted, { textAlign: "center", maxWidth: 200 }]}>
                            Si no encuentras tu archivo en la galería prueba en <Text style={{ textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#000" }}>Abrir archivos
                            </Text>
                        </Text>
                        <Button
                            text={"Abrir archivos"}
                            icon={<AntDesign name="filetext1" size={24} color="#fff" />}
                            onClick={() => FilePicker(setImage)}
                            small
                        />
                    </View>
                    {
                        conversion && progress < MIN_PROGRESS &&
                        <Progress.Bar progress={progress} width={200} height={25} borderRadius={10} />
                    }
                    {
                        progress >= MIN_PROGRESS &&
                        <>
                            <Image source={{ uri: image }} style={styles.result} />

                            <Button
                                text={"Descargar"}
                                icon={<Entypo name="download" size={24} color="#fff" />}
                                onClick={requestPermissions}
                            />
                        </>

                    }

                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#06062A",
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 48
    },

    hero: {
        alignItems: "center",
        gap: 24,
    },

    actions: {
        gap: 8,
        alignItems: "center",
        maxWidth: 300,
    },

    result: {
        width: 250,
        height: 200,
        marginTop: 16,
        objectFit: "contain",
    }
})