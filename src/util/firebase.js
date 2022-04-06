import { utils } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

export async function saveImageMessage(file, usuario) {
  const ref = firestore().collection('mensagens');

  try {
    // 1 - We add a message with a loading icon that will get updated with the shared image.
    const messageRef = await ref.add({
      usuario: usuario.displayName,
      foto: usuario.photoURL,
      timeStamp: firestore.FieldValue.serverTimestamp(),
      imageUrl: LOADING_IMAGE_URL,
    });

    // 2 - Upload the image to Cloud Storage.
    const filePath = `${usuario.uid}/${messageRef.id}/${file.fileName}`;
    const newImageRef = storage().ref(filePath);

    console.log(`---------------------> ${utils.FilePath.PICTURES_DIRECTORY}`);
    console.log(`${utils.FilePath.PICTURES_DIRECTORY}/${file.fileName}`);
    console.log(file.uri);
    // const fileUri = `${utils.FilePath.PICTURES_DIRECTORY}/${file.fileName}`;
    await newImageRef.putFile(file.uri).on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    // 3 - Generate a public URL for the file.
    // const publicImageUrl = await newImageRef.getDownloadURL();

    // 4 - Update the chat message placeholder with the image’s URL.
    // await messageRef.update({
    //   imageUrl: publicImageUrl,
    //   storageUri: fileSnapshot.metadata.fullPath,
    // });
  } catch (error) {
    console.error(
      '-----------------> There was an error uploading a file to Cloud Storage:',
      error,
    );
  }
}
