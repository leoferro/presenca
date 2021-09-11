import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

const ConfirmacaoChamadas = ({mensagemConfirmacao, setMensagemConfirmacao, deletarChamada}) => {

  React.useEffect(() => {
      if (mensagemConfirmacao!==''){
        showDialog()
      }
  }, [mensagemConfirmacao])
  
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => {
    setMensagemConfirmacao('')
    setVisible(false)
  };

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Atenção</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Você quer mesmo apagar a data {mensagemConfirmacao}?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Não</Button>
              <Button onPress={()=>{
                hideDialog()
                deletarChamada(mensagemConfirmacao)
              }}>Deletar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default ConfirmacaoChamadas;
