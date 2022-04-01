import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../../App';
import { styles } from '../util/styles';

export async function logOut() {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
}

function SignInScreen() {
  const { signIn } = useContext(AuthContext);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  GoogleSignin.configure({
    webClientId:
      '439977024970-hl040j52rem8m896hh3ta4r1fqejakkd.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    setIsSigninInProgress(true);
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.button}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => onGoogleButtonPress().then((user) => signIn(user.user))}
        disabled={isSigninInProgress}
      />
    </View>
  );
}

export default SignInScreen;
