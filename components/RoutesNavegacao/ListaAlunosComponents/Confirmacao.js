import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

const Confirmacao = ({setVisivelConfirmacao, visivelConfirmacao, mensagemTelaConfirmacao, deletarAluno, setNumeroAluno, numeroAluno}) => {

  const esconderConfirmacao = () => {
      setNumeroAluno('')
      setVisivelConfirmacao(false)
    };

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={visivelConfirmacao} onDismiss={esconderConfirmacao}>
            <Dialog.Title>Atenção</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{mensagemTelaConfirmacao}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={esconderConfirmacao}>Cancelar</Button>
              <Button onPress={async ()=>{
                  console.log(deletarAluno)
                  await deletarAluno(numeroAluno)
                  esconderConfirmacao()
              }}>Deletar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default Confirmacao;