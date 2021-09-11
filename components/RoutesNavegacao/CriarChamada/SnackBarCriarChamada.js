import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const SnackBarCriarChamada = ({mensagemSnackBar, setMensagemSnackBar}) => {

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
      if (mensagemSnackBar!==''){
        onToggleSnackBar()
      }
  }, [mensagemSnackBar])

  React.useEffect(() => {
      if (!visible){
        setMensagemSnackBar('')
      }
  }, [visible])


  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'ok'
        }}>
        {mensagemSnackBar}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default SnackBarCriarChamada;