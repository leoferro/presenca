import * as React from 'react';
import { IconButton, Colors } from 'react-native-paper';

const IconeDeletar = ({entrarTelaConfirmacao, alunoNumero}) => (
  <IconButton
    icon="account-off"
    color={Colors.red500}
    size={20}
    onPress={() => entrarTelaConfirmacao(alunoNumero)}
  />
);

export default IconeDeletar;