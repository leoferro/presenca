import React from 'react'
import { View } from 'react-native'
import IconeDeletar from './IconeDeletar'
import IconeEditar from './IconeEditar'

const Icones = ({alunoNumero, abrirModalEdit, entrarTelaConfirmacao}) => {

    

    return (
        <>
            <IconeEditar abrirModalEdit={abrirModalEdit} alunoNumero={alunoNumero} />
            <IconeDeletar entrarTelaConfirmacao={entrarTelaConfirmacao} alunoNumero={alunoNumero}/>
        </>
    )
}

export default Icones
