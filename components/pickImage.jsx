// import { useState } from 'react';
// import { Button, Image, View, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
//
// export default function ImagePickerExample({onImageSelected,value}) {
//     const [image, setImage] = useState(null);
//
//     const pickImage = async () => {
//
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });
//         console.log(result)
//
//
//
//
//         if (!result.canceled) {
//             const imgUri = result.assets[0].uri
//             setImage(imgUri);
//             onImageSelected(result.assets[0].fileName)
//             console.log(result.assets[0].fileName)
//         }
//
//
//     };
//
//     return (
//         <View style={styles.container}>
//             <Button title="Select an image" onPress={pickImage} value ={value}/>
//             {image && <Image source={{ uri: image }} style={styles.image}/>}
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 30
//     },
//     image: {
//         width: 200,
//         height: 200,
//
//     },
// });
//
// import { useState, useEffect } from 'react';
// import { Button, Image, View, StyleSheet, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
//
// export default function ImagePickerExample({ onImageSelected }) {
//     const [image, setImage] = useState(null);
//
//     useEffect(() => {
//         (async () => {
//             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//             if (status !== 'granted') {
//                 Alert.alert('Permission Denied', 'Sorry, we need media library permissions to make this work!');
//             }
//         })();
//     }, []);
//
//     const pickImage = async () => {
//         try {
//             let result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                 allowsEditing: true,
//                 aspect: [4, 3],
//                 quality: 1,
//             });
//              console.log("photo is ",result)
//             if (!result.canceled) {
//                 const asset = result.assets[0];
//                 const imgUri = asset.uri;
//                 setImage(imgUri);
//
//
//                 onImageSelected({
//                     uri: imgUri,
//                     type: asset.type || 'image/jpeg',
//                     fileName: asset.fileName || imgUri.split('/').pop(),
//                 });
//             } else {
//                 console.log('Image picking canceled');
//             }
//         } catch (error) {
//             console.error('Error picking image:', error);
//             Alert.alert('Error', 'Failed to pick image. Please try again.');
//         }
//     };
//
//     return (
//         <View style={styles.container}>
//             <Button title="Select an image" onPress={pickImage} />
//             {image && <Image source={{ uri: image }} style={styles.image} />}
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 30,
//     },
//     image: {
//         width: 200,
//         height: 200,
//     },
// });
//


import { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function ImagePickerExample({ onImageSelected }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            if (status !== 'granted') {
                Alert.alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log('ImagePicker result:', result);

        if (!result.canceled) {
            const asset = result.assets[0];
            const imgUri = asset.uri;
            setImage(imgUri);

            onImageSelected({
                uri: imgUri,
                type: asset.type || 'image/jpeg',
                fileName: asset.fileName || imgUri.split('/').pop(),
            });
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Select an Image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
});
