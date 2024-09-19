import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../src/components/button";
import { ui } from "../src/utils/styles";
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useState } from "react";
import { FilePicker, GalleryPicker } from "../src/utils/pickers";
import { convertImage } from 'react-native-simple-heic2jpg';
import * as Progress from 'react-native-progress';
import AntDesign from '@expo/vector-icons/AntDesign';
import { requestPermissions } from "../src/utils/media";
import { startProgress } from "../src/utils/progress";

const MIN_PROGRESS = 1;

export default function Index() {

    const [image, setImage] = useState(null);
    const [conversion, setConversion] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (image) fromHeicToJPG();
    }, [image])

    useEffect(() => {
        if (conversion) startProgress(setProgress);
    }, [conversion])

    /** Conversión de HEIC a JPG */
    async function fromHeicToJPG() {
        const result = await convertImage(image);
        setConversion(result);
    }

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
                                onClick={() => requestPermissions(conversion)}
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