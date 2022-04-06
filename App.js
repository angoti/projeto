import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen, { logOut } from './src/screens/SignInScreen';
import SplashScreen from './src/screens/SplashScreen';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './src/util/styles';

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

  // temporizador para exibir a splashScreen
  useEffect(() => {
    const sleep = async (ms) => {
      await new Promise((resolve) => setTimeout(resolve, ms));
      // @ts-ignore
      dispatch({ type: 'RESTORE_TOKEN' });
    };
    sleep(500);
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
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
                      //authContext.usuario.delete();
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
