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
    const task = newImageRef.putFile(file.uri);

    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    task.then(() => {
      console.log('Image uploaded to the bucket!');
      // 3 - Generate a public URL for the file.
      newImageRef.getDownloadURL().then((publicImageUrl) => {
        console.log('------------> url da imagem: ' + publicImageUrl);
        // 4 - Update the chat message placeholder with the image’s URL.
        messageRef.update({
          imageUrl: publicImageUrl,
        });
      });
    });
  } catch (error) {
    console.error(
      '-----------------> There was an error uploading a file to Cloud Storage:',
      error,
    );
  }
}
