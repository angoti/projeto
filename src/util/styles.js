import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#18073f',
  },
  navbar: { backgroundColor: '#f4511e' },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 8,
  },
  button: {
    width: 192,
    height: 48,
    alignSelf: 'center',
  },
  logoutButton: {
    // alignItems: 'center',
    // backgroundColor: '#DDD',
    // borderColor: '#aaa',
    // borderWidth: 1,
    // padding: 4,
    color: '#fff',
  },
  mensagens: {
    flex: 1,
  },
  card: { borderColor: '#f00', borderWidth: 2 },
  separador: {
    height: 1,
    width: '100%',
    backgroundColor: '#aaa',
    marginBottom: 4,
  },
});
