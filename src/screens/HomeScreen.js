import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { styles } from '../util/styles';
import firestore from '@react-native-firebase/firestore';
import { Button, TextInput } from 'react-native-paper';
import Mensagem from '../components/Mensagem';
import { AuthContext } from '../../App';
import { launchImageLibrary } from 'react-native-image-picker';
import { saveImageMessage } from '../util/firebase';

const HomeScreen = () => {
  const ref = firestore().collection('mensagens');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensagens, setMensagens] = useState([]);
  const { usuario } = useContext(AuthContext);

  async function enviarMensagem() {
    await ref.add({
      texto: mensagem,
      usuario: usuario.displayName,
      foto: usuario.photoURL,
      timeStamp: firestore.FieldValue.serverTimestamp(),
    });
    setMensagem('');
  }

  function enviarImagem() {
    console.log('escolhendo imagem');
    launchImageLibrary({
      mediaType: 'photo',
    })
      .then(result => {
        saveImageMessage(result.assets[0], usuario);
      })
      .catch(error => {
        console.log('-------------------------> ' + error);
      });
  }

  useEffect(() => {
    console.log('--------------- useEffect <<<<<<<<<<<<');
    return ref.orderBy('timeStamp', 'desc').onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        list.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setMensagens(list);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  const Separador = () => {
    return <View style={styles.separador} />;
  };

  if (loading) {
    return null;
  }
  return (
    <>
      <FlatList
        style={styles.mensagens}
        data={mensagens}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return <Mensagem {...item} />;
        }}
        ItemSeparatorComponent={Separador}
      />
      <View style={styles.containerTextInput}>
        <TextInput
          label={'Nova mensagem'}
          value={mensagem}
          onChangeText={setMensagem}
          style={styles.textInputStyle}
        />
        <Button
          icon="send"
          onPress={() => enviarMensagem()}
          style={styles.buttonTextInput}
        />
        <Button
          icon="camera"
          onPress={() => enviarImagem()}
          style={styles.buttonTextInput}
        />
      </View>
    </>
  );
};

export default HomeScreen;
