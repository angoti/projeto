import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useContext } from 'react';
import { Button } from 'react-native';
import { AuthContext } from '../../App';
import auth from '@react-native-firebase/auth';

function SignInScreen() {
  GoogleSignin.configure({
    webClientId:
      '439977024970-hl040j52rem8m896hh3ta4r1fqejakkd.apps.googleusercontent.com',
  });
  const { signIn } = useContext(AuthContext);
  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(user => signIn(user.user))}
    />
  );
}

export default SignInScreen;
