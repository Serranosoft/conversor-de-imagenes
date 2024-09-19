import { ToastAndroid } from "react-native";
import * as MediaLibrary from 'expo-media-library';

const ALBUM_NAME = "IMAGENES CONVERTIDAS";

/** Encargado de solicitar los permisos necesarios para almacenar el resultado en la galería del dispositivo */
export async function requestPermissions(conversion) {
    console.log(conversion);
    try {
        const { status } = await MediaLibrary.requestPermissionsAsync(false, ["photo"]);
        if (status === "granted") {
            save(conversion);
        } else {
            ToastAndroid.showWithGravityAndOffset(PERMISSION_DENIED, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
    } catch (error) {
        console.log(error);
        ToastAndroid.showWithGravityAndOffset(PERMISSION_DENIED, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }
}

/** Almacenar en galería */
async function save(conversion) {
    const asset = await MediaLibrary.createAssetAsync(conversion);
    let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
    if (!album) {
        album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset, false);
    } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
}