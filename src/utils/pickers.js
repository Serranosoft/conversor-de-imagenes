import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

export async function GalleryPicker(setImage) {

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, aspect: [4, 3], quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
}

export async function FilePicker(setImage) {

    const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
}