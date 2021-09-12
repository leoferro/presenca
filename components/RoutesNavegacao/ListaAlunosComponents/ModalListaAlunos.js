import React, { useState, useEffect } from 'react'
import { Modal, HelperText, TextInput, Button } from 'react-native-paper'

const ModalListaAlunos = ({ fecharModal , funcaoModal, alunoAtual, setAlunoAtual , enviarAdicionarAluno, editarAluno}) => {

    const [visivelModal, setVisivelModal] = useState(false)
    const [botaoModalTexto, setBotaoModalTexto] = useState('')

    const [numeroAluno, setNumeroAluno] = useState('')
    const [nomeAlunoNovo, setNomeAlunoNovo] = useState('')

    const [erroNome, setErroNome] = useState(false)
    const [erroNumero, setErroNumero] = useState(false)

    const limparErrosModal = () => {
        setErroNome(false)
        setErroNumero(false)
    }

    const limparCamposModal = () => {
        setAlunoAtual(null)
        setNomeAlunoNovo('')
        setNumeroAluno('')
    }

    const botaoFuncaoModal = () => {
        if (funcaoModal === 'add') {
            enviarAdicionarAluno(numeroAluno, nomeAlunoNovo)
        } else if (funcaoModal === 'edit') {
            editarAluno(numeroAluno, nomeAlunoNovo)
        }

    }


    //Abrir o modal apenas quando muda o função modal
    useEffect(() => {
        if (funcaoModal !== null) {
            if (funcaoModal === 'add') {
                setBotaoModalTexto('Adicionar Aluno')
            } else if (funcaoModal === 'edit') {
                setBotaoModalTexto('Editar Aluno')
            }
            setVisivelModal(true)
        } else {
            limparCamposModal()
            setVisivelModal(false)
        }
    }, [funcaoModal])



    useEffect(() => {
        if (erroNome || erroNumero) {
            limparErrosModal()
        }
    }, [numeroAluno, nomeAlunoNovo])
    
    useEffect(()=>{
        if (alunoAtual && nomeAlunoNovo==''){
            setNomeAlunoNovo(alunoAtual.nome)
            setNumeroAluno(alunoAtual.numero)
        }
    },[alunoAtual])





    const containerStyle = { backgroundColor: 'white', padding: 20 };

    return (
        <Modal visible={visivelModal} onDismiss={fecharModal} contentContainerStyle={containerStyle}>
            <TextInput
                label='Nome do aluno'
                value={nomeAlunoNovo}
                onChangeText={setNomeAlunoNovo}
                mode='outlined'
                error={erroNome}
            />
            <HelperText
                type='error'
                visible={erroNome}
            >
                Digite um nome
                    </HelperText>
            <TextInput
                label='Numero do aluno'
                value={numeroAluno}
                onChangeText={setNumeroAluno}
                keyboardType='numeric'
                mode='outlined'
                error={erroNumero}
            />
            <HelperText
                type='error'
                visible={erroNumero}
            >
                Digite um numero
                    </HelperText>
            <Button onPress={botaoFuncaoModal}>{botaoModalTexto}</Button>
        </Modal>
    )
}

export default ModalListaAlunos
