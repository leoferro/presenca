import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

const Confirmacao = ({ mensagemTelaConfirmacao, deletarAluno, setMensagemTelaConfirmacao, setAlunoAtual }) => {

  const [visivelConfirmacao, setVisivelConfirmacao] = React.useState(false)

  React.useEffect(() => {
    if (mensagemTelaConfirmacao == '') {
      setAlunoAtual(null)
      setVisivelConfirmacao(false)
    } else {
      setVisivelConfirmacao(true)
    }
  }, [mensagemTelaConfirmacao])

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={visivelConfirmacao} onDismiss={() => { setMensagemTelaConfirmacao('') }}>
            <Dialog.Title>Atenção</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{mensagemTelaConfirmacao}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => { setMensagemTelaConfirmacao('') }}>Cancelar</Button>
              <Button onPress={async () => {
                setMensagemTelaConfirmacao('')
                await deletarAluno()
              }}>Deletar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default Confirmacao;