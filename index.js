/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

//notifications
// Register background handler
messaging()
  .subscribeToTopic('notification')
  .then(() => console.log('inscrito para receber notificações'));

AppRegistry.registerComponent(appName, () => App);
