import React from 'react'
import { IconButton, Colors } from 'react-native-paper';

const IconesChamadas = ({editarChamada, abrirConfirmacaoDeletar, data}) => {
    return (
        <>
            <IconButton
                icon="pencil"
                color={Colors.red500}
                size={20}
                onPress={()=>editarChamada(data)}
            />
            <IconButton
                icon="delete"
                color={Colors.red500}
                size={20}
                onPress={() =>abrirConfirmacaoDeletar(data)}
            />
        </>
    )
}

export default IconesChamadas
