import React from 'react';
import { Avatar, List } from 'react-native-paper';

function Mensagem({ texto, usuario, foto }) {
  return (
    <List.Item
      title={usuario + ' falou'}
      titleStyle={{ fontSize: 10 }}
      description={texto}
      descriptionStyle={{ fontSize: 16 }}
      left={props => (
        <Avatar.Image
          size={44}
          source={{
            uri: foto,
          }}
        />
      )}
    />
  );
}

export default React.memo(Mensagem);
