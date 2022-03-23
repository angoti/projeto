import React, { useContext } from 'react';
import { Avatar, List } from 'react-native-paper';
import { AuthContext } from '../../App';

function Mensagem({ texto }) {
  const { usuario } = useContext(AuthContext);
  return (
    <List.Item
      title={usuario.displayName + ' falou'}
      titleStyle={{ fontSize: 10 }}
      description={texto}
      descriptionStyle={{ fontSize: 16 }}
      left={props => (
        <Avatar.Image
          size={44}
          source={{
            uri: usuario.photoURL,
          }}
        />
      )}
    />
  );
}

export default React.memo(Mensagem);
