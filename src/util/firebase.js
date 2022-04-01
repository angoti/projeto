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
    const filePath = `${usuario.uid}/${messageRef.id}/${file.name}`;
    const newImageRef = storage().ref(filePath);
    const fileSnapshot = await newImageRef.putFile(file);

    // 3 - Generate a public URL for the file.
    const publicImageUrl = await newImageRef.getDownloadURL();

    // 4 - Update the chat message placeholder with the image’s URL.
    await messageRef.update({
      imageUrl: publicImageUrl,
      storageUri: fileSnapshot.metadata.fullPath,
    });
  } catch (error) {
    console.error(
      'There was an error uploading a file to Cloud Storage:',
      error,
    );
  }
}
