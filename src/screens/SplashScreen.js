import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../util/styles';

const SplashScreen = () => {
  const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Projeto X</Text>
      <Image source={{ uri: LOADING_IMAGE_URL }} style={styles.splashLogo} />
    </View>
  );
};

export default SplashScreen;
