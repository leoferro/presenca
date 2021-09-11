import * as React from 'react';
import { IconButton, Colors } from 'react-native-paper';

const IconeEditar = ({abrirModalEdit, alunoNumero}) => (
  <IconButton
    icon="account-edit"
    color={Colors.red500}
    size={20}
    onPress={() => abrirModalEdit(alunoNumero)}
  />
);

export default IconeEditar;