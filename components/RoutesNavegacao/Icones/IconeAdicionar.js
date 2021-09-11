import * as React from 'react';
import { IconButton, Colors } from 'react-native-paper';

const IconeAdicionar = ({ setFuncaoModal }) => (
  <IconButton
    icon="account-plus"
    color={Colors.red500}
    size={20}
    onPress={() => {
      setFuncaoModal('add')
    }}
  />
);

export default IconeAdicionar;