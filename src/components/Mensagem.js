import React from 'react';
import {View, Image} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import {styles} from '../util/styles';

function Mensagem({texto, usuario, foto, imageUrl}) {
  return (
    <View>
      <List.Item
        title={usuario + ' falou'}
        titleStyle={{fontSize: 10}}
        description={texto}
        descriptionStyle={{fontSize: 16}}
        left={() => (
          <Avatar.Image
            size={44}
            source={{
              uri: foto,
            }}
          />
        )}
      />
      {imageUrl ? (
        <Image
          source={{uri: imageUrl}}
          style={styles.imageMessage}
          resizeMode="contain"
        />
      ) : (
        <></>
      )}
    </View>
  );
}

export default React.memo(Mensagem);
