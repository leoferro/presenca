import * as React from 'react';
import { List, IconButton } from 'react-native-paper';
import { View, ScrollView, StyleSheet } from 'react-native';
import IconesChamadas from './chamadasComponents/IconesChamadas';
import { deletarDataChamada } from '../../controler/controlerTurmaStorage';
import ConfirmacaoChamadas from './chamadasComponents/ConfirmacaoChamadas';

const Chamadas = ({ sala, setSala, setIndex, setDate , setMensagemSnackBarApp}) => {

    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    const [listaChamadas, setListaChamadas] = React.useState([])

    const [mensagemConfirmacao, setMensagemConfirmacao] = React.useState('')

    React.useEffect(() => {
        if (sala !== '') {
            setListaChamadas(sala.getDatas())
        }
    }, [sala])

    const editarChamada = (data) => {
        const dataTemp = data.split('/')
        setDate(new Date(dataTemp[2], dataTemp[1] - 1, dataTemp[0]))
        setIndex(0)
    }

    const abrirConfirmacaoDeletar = (data) => {
        setMensagemConfirmacao(data)
    }

    const deletarChamada = async (data) => {
        const novaSala = await deletarDataChamada(data, sala)
        setListaChamadas(novaSala.getDatas())
        setSala(novaSala)
        setMensagemSnackBarApp('Chamada deletada')
    }

    const condicionalSala = () => {
        if (sala !== '') {
            return sala.getDatas()
                .map((data, index) => {
                    return (
                        <List.Accordion
                            title={data} key={index}
                            left={props => {
                                <List.Icon {...props} icon="folder" />
                            }}>
                            <List.Item
                                description='Configurações'
                                right={props => <IconesChamadas editarChamada={editarChamada} abrirConfirmacaoDeletar={abrirConfirmacaoDeletar} data={data} />}
                            />
                            {sala.getNomesNaChamada(data)
                                .map(aluno => {
                                    return (
                                        <List.Item
                                            key={aluno[0]}
                                            title={aluno[0] + ' - ' + aluno[1]}
                                            description={aluno[2] ? 'presente' : 'ausente'}
                                            descriptionStyle={aluno[2] ? styles.verde : styles.vermelho} />
                                    )
                                })
                            }
                        </List.Accordion>
                    )
                })
        }
    }

    return (
        <>
            <ScrollView>
                <List.Section title="datas">
                    {condicionalSala()}
                </List.Section>
            </ScrollView>
            <ConfirmacaoChamadas mensagemConfirmacao={mensagemConfirmacao} setMensagemConfirmacao={setMensagemConfirmacao} deletarChamada={deletarChamada} />
        </>
    );
};

const styles = StyleSheet.create({
    verde: {
        color: 'green'
    },
    vermelho: {
        color: 'red'
    }
})

export default Chamadas;