import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { styles } from '../util/styles';
import firestore from '@react-native-firebase/firestore';
import { Button, TextInput } from 'react-native-paper';
import Mensagem from '../components/Mensagem';

const HomeScreen = () => {
  const ref = firestore().collection('mensagens');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensagens, setMensagens] = useState([]);
  async function enviarMensagem() {
    await ref.add({
      texto: mensagem,
    });
    setMensagem('');
  }
  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { texto } = doc.data();
        list.push({
          id: doc.id,
          texto,
        });
      });
      setMensagens(list);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);
  const Separador = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#aaa',
          marginBottom: 4
        }}
      />
    );
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
        renderItem={({ item }) => <Mensagem {...item} />}
        ItemSeparatorComponent={Separador}
      />
      <TextInput
        label={'Nova mensagem'}
        value={mensagem}
        onChangeText={setMensagem}
      />
      <Button onPress={() => enviarMensagem()}>Enviar mensagem</Button>
    </>
  );
};

export default HomeScreen;
