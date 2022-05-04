import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen, { logOut } from './src/screens/SignInScreen';
import SplashScreen from './src/screens/SplashScreen';
import { styles } from './src/util/styles';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

// @ts-ignore
export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isLoading: false,
            userToken: action.token,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      return userInfo;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        console.log('---------------------> precisa logar');
        return null;
      } else {
        console.log('---------------------> outro erro. precisa logar');
        return null;
      }
    }
  };

  // temporizador para exibir a splashScreen
  useEffect(() => {
    console.log('---------------------> Tentando recuperar info do usuario');
    const recuperaUsuario = async () => {
      GoogleSignin.configure({
        webClientId:
          '467453762904-pu5e3ojipk1opn69c710bofrkkf709o2.apps.googleusercontent.com',
      });
      const usuario = await getCurrentUserInfo();
      if (usuario === null) {
        console.log('---------------------> usuario === null');
        // @ts-ignore
        dispatch({ type: 'RESTORE_TOKEN', token: null });
      } else {
        const userToken = {
          displayName: usuario.user.name,
          photoURL: usuario.user.photo,
        };
        // @ts-ignore
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      }
    };
    recuperaUsuario();

    // messaging
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Nova menssagem!', remoteMessage.notification.body);
    });
    return unsubscribe;
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // @ts-ignore
        dispatch({ type: 'SIGN_IN', token: data });
      },
      // @ts-ignore
      signOut: () => {
        logOut();
        // @ts-ignore
        dispatch({ type: 'SIGN_OUT' });
      },
      usuario: state.userToken,
    }),
    [state.userToken],
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                headerStyle: {
                  backgroundColor: '#2b008f',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: state.userToken.displayName,
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'left',
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => {
                      authContext.signOut();
                    }}>
                    <Text style={styles.logoutButton}>Sair</Text>
                  </TouchableOpacity>
                ),
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
