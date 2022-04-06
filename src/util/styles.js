import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18073f',
  },
  navbar: { backgroundColor: '#f4511e' },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8,
    color: '#0fa',
  },
  button: {
    width: 192,
    height: 48,
    alignSelf: 'center',
  },
  logoutButton: {
    color: '#fff',
  },
  mensagens: {},
  card: { borderColor: '#f00', borderWidth: 2 },
  separador: {
    height: 1,
    width: '100%',
    backgroundColor: '#aaa',
    marginBottom: 4,
  },
  splashLogo: {
    padding: 8,
    width: 32,
    height: 32,
  },
  imageMessage: {
    margin: 16,
    width: '100%',
    height: 200,
  },
  textInputStyle: { flexGrow: 1 },
  containerTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTextInput: {},
});
