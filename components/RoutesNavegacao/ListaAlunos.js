import React, { useState, useEffect } from 'react'
import { Text, List, Divider, Portal, Modal, TextInput, Button, HelperText, Snackbar } from 'react-native-paper'
import { ScrollView, View, StyleSheet } from 'react-native'
import Icones from './Icones/Icones'
import IconeAdicionar from './Icones/IconeAdicionar'
import { salvarAluno, deleteDataAluno, editarDataAluno } from '../../controler/controlerTurmaStorage'
import { Turma } from '../../models/Turma'
import { set } from 'react-native-reanimated'
import Confirmacao from './ListaAlunosComponents/Confirmacao'

const ListaAlunos = ({ sala, setSala }) => {

    const [visivelSnackBar, setVisivelSnackBar] = useState(false)
    const [visivelModal, setVisivelModal] = useState(false)
    const [nomeAlunoNovo, setNomeAlunoNovo] = useState('')
    const [erroNome, setErroNome] = useState(false)
    const [numeroAluno, setNumeroAluno] = useState('')
    const [erroNumero, setErroNumero] = useState(false)
    const [mensagemModal, setMensagemModal] = useState('')
    const [listaAlunos, setListaAlunos] = useState([])

    const [mensagemTelaConfirmacao, setMensagemTelaConfirmacao] = useState('')
    const [visivelConfirmacao, setVisivelConfirmacao] = useState(false)

    const [funcaoModal, setFuncaoModal] = useState(null)

    const [alunoAtual, setAlunoAtual] = useState(null)

    const [botaoModalTexto, setBotaoModalTexto] = useState('')




    //---FUNCOES DO MODAL---

    const abrirModalEdit = async (alunoNumero) => {
        setFuncaoModal('edit')
        setAlunoAtual(alunoNumero)
        setNomeAlunoNovo(sala.nomes[alunoNumero])
        setNumeroAluno(alunoNumero)
    }

    const limparErrosModal = ()=>{
        setErroNome(false)
        setErroNumero(false)
    }

    useEffect(() => {
        limparErrosModal()
    }, [numeroAluno, nomeAlunoNovo])

    //Abrir o modal apenas quando muda o função modal
    useEffect(() => {
        if (funcaoModal !== null) {
            if (funcaoModal === 'add') {
                setBotaoModalTexto('Adicionar Aluno')
            } else if (funcaoModal === 'edit') {
                setBotaoModalTexto('Editar Aluno')
            }
            setVisivelModal(true)
        }
    }, [funcaoModal])

    const fecharModal = () => {
        setFuncaoModal(null)
        setVisivelModal(false)
        limparCamposModal()
    };

    const limparCamposModal = () => {
        setNomeAlunoNovo('')
        setNumeroAluno('')
    }

    const containerStyle = { backgroundColor: 'white', padding: 20 };




    //--Funções que interagem com o controlador--
    //TODO: on dismiss limpar janela

    const entrarTelaConfirmacao = (alunoNumero) => {
        setNumeroAluno(alunoNumero)
        setMensagemTelaConfirmacao('Você tem certeza que quer deletar ' + sala.nomes[alunoNumero])
        setVisivelConfirmacao(true)
    }

    const deletarAluno = async () => {
        const novaSala = await deleteDataAluno(numeroAluno, sala)
        setListaAlunos(novaSala.getListaNomes())
        setSala(novaSala)
        setMensagemModal('Aluno deletado com sucesso')
        setNumeroAluno('')
    }

    const enviarAdicionarAluno = async () => {
        limparErrosModal()
        if (isNaN(parseInt(numeroAluno)) || nomeAlunoNovo == '') {
            setErroNumero(isNaN(parseInt(numeroAluno)))
            setErroNome(nomeAlunoNovo == '')
        } else {
            const pedido = await salvarAluno(numeroAluno, nomeAlunoNovo, sala)
            if (pedido.sala instanceof Turma) {
                setMensagemModal('Adicionado')
                setSala(pedido.sala)
                setVisivelModal(false)
            } else {
                fecharModal()
                setMensagemModal(pedido.erro)
            }
            setVisivelSnackBar(true)
            limparCamposModal()
            setFuncaoModal(null)
        }
    }


    const editarAluno = async () => {
        const novaSala = await editarDataAluno(alunoAtual, numeroAluno, nomeAlunoNovo, sala)
        if (novaSala instanceof Turma) {
            limparCamposModal()
            setSala(novaSala)
            fecharModal()
        } else {
            fecharModal()
            setMensagemModal(novaSala.erro)
            setVisivelSnackBar(true)
        }
    }

    //TODO: Colocar a mensagem de sucesso de todas as ações na snackbar

    //-- COMPONENTES EM FORMA DE CONST --

    const botaoFuncaoModal = () => {
        if (funcaoModal === 'add') {
            enviarAdicionarAluno()
        } else if (funcaoModal === 'edit') {
            editarAluno(numeroAluno)
        }
    }


    const condicionalSala = () => {
        //TODO: Criar as funções de deletar e de editar aluno
        if (sala !== '') {
            return sala.getNumerosComNomesLista()
                //.sort((a, b) => parseInt(a) > parseInt(b))
                .map((aluno) => {
                    return (
                        <View key={aluno[0]}>
                            <List.Item
                                title={aluno[0] + ' - ' + aluno[1]}
                                right={props =>
                                    <Icones
                                        entrarTelaConfirmacao={entrarTelaConfirmacao}
                                        abrirModalEdit={abrirModalEdit}
                                        alunoNumero={aluno[0]}
                                    />}
                            />
                            <Divider />
                        </View>
                    )
                })
        } else {
            return <Text>Sem ALunos</Text>
        }
    }



    return (
        <>

            <ScrollView>

                <Portal>
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
                </Portal>

                {condicionalSala()}
                <List.Item
                    title="Adicionar novo aluno"
                    right={props => <IconeAdicionar setFuncaoModal={setFuncaoModal} />}
                />



            </ScrollView>

            <Confirmacao
                setVisivelConfirmacao={setVisivelConfirmacao}
                visivelConfirmacao={visivelConfirmacao}
                mensagemTelaConfirmacao={mensagemTelaConfirmacao}
                deletarAluno={deletarAluno}
                numeroAluno={numeroAluno}
                setNumeroAluno={setNumeroAluno}
            />

            <View style={styles.container}>
                <Snackbar
                    visible={visivelSnackBar}
                    onDismiss={() => setVisivelSnackBar(false)}
                    action={{
                        label: 'Ok'
                    }}>
                    {mensagemModal}
                </Snackbar>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
});

export default ListaAlunos
