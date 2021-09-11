import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

const ConfirmacaoChamada = ({mensagemConfirmacao, setMensagemConfirmacao, requisicaoGravarChamada , setSobreescrever, sobreescrever}) => {

  React.useEffect(() => {
      if (mensagemConfirmacao!==''){
        showDialog()
      }
  }, [mensagemConfirmacao])

  React.useEffect(()=>{
    if (sobreescrever==true){
      requisicaoGravarChamada()
      setSobreescrever(false)
    }
  },[sobreescrever])
  
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
              <Paragraph>{mensagemConfirmacao}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Não</Button>
              <Button onPress={()=>{
                hideDialog()
                setSobreescrever(true)
              }}>Alterar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default ConfirmacaoChamada;
