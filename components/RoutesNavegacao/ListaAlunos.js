import React, { useState, useEffect } from 'react'
import { Text, List, Divider, Portal, Modal, TextInput, Button, HelperText, Snackbar } from 'react-native-paper'
import { ScrollView, View, StyleSheet } from 'react-native'
import Icones from './Icones/Icones'
import IconeAdicionar from './Icones/IconeAdicionar'
import { deleteDataAluno, salvarAluno, editarDataAluno } from '../../controler/controlerTurmaStorage'
import Confirmacao from './ListaAlunosComponents/Confirmacao'
import ModalListaAlunos from './ListaAlunosComponents/ModalListaAlunos'
import {Turma} from '../../models/Turma'

const ListaAlunos = ({ sala, setSala }) => {

    const [visivelSnackBar, setVisivelSnackBar] = useState(false)
    const [visivelModal, setVisivelModal] = useState(false)

    const [numeroAluno, setNumeroAluno] = useState('')
    const [mensagemModal, setMensagemModal] = useState('')
    const [listaAlunos, setListaAlunos] = useState([])

    const [mensagemTelaConfirmacao, setMensagemTelaConfirmacao] = useState('')
    const [visivelConfirmacao, setVisivelConfirmacao] = useState(false)

    const [funcaoModal, setFuncaoModal] = useState(null)

    const [alunoAtual, setAlunoAtual] = useState(null)




    //---FUNCOES DO MODAL---

    const abrirModalEdit = async (alunoNumero) => {
        setAlunoAtual({nome:sala.nomes[alunoNumero], numero:alunoNumero})
        setFuncaoModal('edit')
    }



    const fecharModal = () => {
        setFuncaoModal(null)
    };





    //--Funções que interagem com o controlador--


    const enviarAdicionarAluno = async (numeroAluno, nomeAlunoNovo) => {


        const pedido = await salvarAluno(numeroAluno, nomeAlunoNovo, sala)
        if (pedido.sala instanceof Turma) {
            setMensagemModal('Adicionado')
            setSala(pedido.sala)
        } else {
            setMensagemModal(pedido.erro)
        }
        setVisivelSnackBar(true)
        fecharModal()

        //limparErrosModal()
        //if (isNaN(parseInt(numeroAluno)) || nomeAlunoNovo == '') {
        //    setErroNumero(isNaN(parseInt(numeroAluno)))
        //    setErroNome(nomeAlunoNovo == '')
        //} else {
        //}
    }


    const editarAluno = async (numeroAluno, nomeAlunoNovo) => {
        const novaSala = await editarDataAluno(alunoAtual.numero, numeroAluno, nomeAlunoNovo, sala)
        if (novaSala instanceof Turma) {
            setSala(novaSala)
        } else {
            setMensagemModal(novaSala.erro)
            setVisivelSnackBar(true)
        }
        fecharModal()
    }

    const entrarTelaConfirmacao = (alunoNumero) => {
        setAlunoAtual({nome:sala.nomes[alunoNumero], numero:alunoNumero})
        setMensagemTelaConfirmacao('Você tem certeza que quer deletar ' + sala.nomes[alunoNumero])
        setVisivelConfirmacao(true)
    }

    const deletarAluno = async () => {
        const novaSala = await deleteDataAluno(alunoAtual.numero, sala)
        setListaAlunos(novaSala.getListaNomes())
        setSala(novaSala)
        setMensagemModal('Aluno deletado com sucesso')
        setAlunoAtual(null)
    }



    //-- COMPONENTES EM FORMA DE CONST --




    const condicionalSala = () => {
        if (sala !== '') {
            return sala.getNumerosComNomesLista()
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
                    <ModalListaAlunos
                        fecharModal={fecharModal}
                        funcaoModal={funcaoModal}
                        alunoAtual={alunoAtual}
                        setAlunoAtual={setAlunoAtual}
                        enviarAdicionarAluno={enviarAdicionarAluno}
                        editarAluno={editarAluno}
                    />
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
