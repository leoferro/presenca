import * as React from 'react';
import { Modal, Portal, Button, Provider, TextInput, IconButton } from 'react-native-paper';
import { criarTurma, mudarNomeSiglaTurmaData, deletarDataSala } from '../controler/controlerTurmaStorage';
import { Turma } from '../models/Turma';
import ConfirmacaoCadastroSalas from './CadastroSalaComponents/ConfirmacaoCadastroSala'
import { View } from 'react-native';

const CadastroSala = ({ modalVisivel, setModalVisivel, setSala, sala, carregarDados,  sobrescreverTurma, setSobrescreverTurma, setMensagemSnackBarApp }) => {

    const [nomeTurma, setNomeTurma] = React.useState('')
    const [siglaTurma, setSiglaTurma] = React.useState('')


    const [textoBotaoModalEnviar, setTextoBotaoModalEnviar] = React.useState('')

    const [mensagemConfirmacao, setMensagemConfirmacao] = React.useState('')

    const acaoCondicionalBotao = () => {
        if (sobrescreverTurma) {
            mudarNomeSiglaTurma()
        } else {
            cadastrarSala()
        }
    }

    const abrirModalConfirmacao = () => {
        setMensagemConfirmacao(sala.getNome())
    }

    React.useEffect(() => {
        if (sobrescreverTurma) {
            setNomeTurma(sala.nomeTurma)
            setSiglaTurma(sala.siglaTurma)
            setTextoBotaoModalEnviar('Alterar')
        } else {
            setNomeTurma('')
            setSiglaTurma('')
            setTextoBotaoModalEnviar('Cadastrar')
        }
    }, [sobrescreverTurma])


    const mudarNomeSiglaTurma = async () => {
        const res = await mudarNomeSiglaTurmaData(nomeTurma, siglaTurma, sala)
        setSobrescreverTurma(false)
        setModalVisivel(false)
        if (res instanceof Turma) {
            setSala('')
            setSala(res)
            setMensagemSnackBarApp('Sala modificada!')
        }
    }

    const deletarSala = async () => {
        deletarDataSala(sala)
        setSala('')
        setNomeTurma('')
        setSiglaTurma('')
        setSobrescreverTurma(false)
        setModalVisivel(false)
        setMensagemSnackBarApp('Sala deletada com sucesso!')
    }

    const cadastrarSala = async () => {
        const res = await criarTurma(siglaTurma, nomeTurma);
        //TODO: Colocar os popups de sucesse e não sucesso no objeto res
        if (res.erro) {
            setMensagemSnackBarApp(res.erro)
        } else {
            setNomeTurma('')
            setSiglaTurma('')
            console.log('Sala criada')
            setModalVisivel(false)
            carregarDados()
            setMensagemSnackBarApp('Sala criada')
        }
    }

    const descartar = () => {
        setSobrescreverTurma(false)
        setNomeTurma('')
        setSiglaTurma('')
        setModalVisivel(false)
    }

    const containerStyle = { backgroundColor: 'white', padding: 20 };

    const iconeCondicional = () => {
        if (sobrescreverTurma) {
            return (
                <IconButton icon='delete' color='red' onPress={abrirModalConfirmacao} />
            )
        }
    }

    return (
        <Portal>
            <Modal visible={modalVisivel} onDismiss={descartar} contentContainerStyle={containerStyle}>
                {//TODO: Mudar os text inputs para os seguintes ano:[numerico] nomeDaEscola:[texto] letraDaTurma:[1string]
                }
                <TextInput
                    label="Nome da escola"
                    value={nomeTurma}
                    onChangeText={setNomeTurma}
                    mode='outlined'
                />

                <TextInput
                    label="Sigla da escola"
                    value={siglaTurma}
                    onChangeText={setSiglaTurma}
                    mode='outlined'
                />
                <View style={{ flexDirection: 'row', alignItems:'center', marginTop:10}}>
                    <Button style={{flexGrow:1}} onPress={acaoCondicionalBotao}>{textoBotaoModalEnviar}</Button>
                    <Button style={{flexGrow:1}} onPress={descartar}>Descartar</Button>
                    {iconeCondicional()}
                </View>
            </Modal>
            <ConfirmacaoCadastroSalas setMensagemConfirmacao={setMensagemConfirmacao} mensagemConfirmacao={mensagemConfirmacao} deletarSala={deletarSala} />
        </Portal>
    );
};

export default CadastroSala;