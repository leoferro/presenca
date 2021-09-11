import React, { useState, useEffect } from 'react'
import { Text, Button, List, Checkbox, Badge } from 'react-native-paper'
import { DatePickerIOS, View, Platform, DatePickerAndroid, ScrollView } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { salvarChamada } from '../../controler/controlerTurmaStorage'
import ConfirmacaoChamada from './CriarChamada/ConfirmacaoChamada'
import SnackBarCriarChamada from './CriarChamada/SnackBarCriarChamada'

const os = Platform.OS



const CriarChamada = ({ sala, setSala, date, setDate, setMensagemSnackBarApp }) => {

    const [check, setCheck] = useState({})
    const [mensagemConfirmacao, setMensagemConfirmacao] = useState('')
    const [mensagemSnackBar, setMensagemSnackBar] = useState('')
    const [sobreescrever, setSobreescrever] = useState(false)

    //TODO: depois mudar a data

    useEffect(() => {
        if (sala !== '') {
            const dateConvert = `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`
            const novoDic = {}

            if (sala.getDatas().indexOf(dateConvert) !== -1) {
                const listaTuplas = sala.getNomesNaChamada(dateConvert)
                listaTuplas.forEach(aluno => {
                    novoDic[aluno[0]] = aluno[2] ? 'checked' : 'unchecked'
                })
            } else {
                const listaNumeros = sala.getListaNumeros()
                listaNumeros.forEach(numero => {
                    novoDic[numero] = 'unchecked'
                })
            }
            setCheck(novoDic)
        }
    }, [sala, date])

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    //const dataPickerCondicional = () => {
    //    if (os == 'ios') {
    //        return (
    //            <DatePickerIOS
    //                date={date}
    //                mode="date"
    //                onDateChange={e => mudarData(e)}
    //            />
    //        )
    //    } else if (os == 'android') {
    //        <DatePickerAndroid />
    //    }
    //}


    const requisicaoGravarChamada = async () => {
        const dataString = `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`
        const chamada = {}
        Object.keys(check).map(numeroAluno => {
            if (check[numeroAluno] == 'checked') {
                chamada[numeroAluno] = true
            } else {
                chamada[numeroAluno] = false
            }
        })
        const salvar = await salvarChamada(dataString, chamada, sala, sobreescrever)
        if ('erro' in salvar) {
            setMensagemConfirmacao('Você quer sobrescrever essa chamada?')
        } else {
            setMensagemSnackBarApp('Chamada criada')
            setSala('')
            setSala(salvar)
            setSobreescrever(false)
        }
    }



    const condicionalSala = () => {
        if (sala !== '') {
            return (
                <>
                    {
                        sala.getNumerosComNomesLista().map((aluno) => {
                            //aluno[0] = numero
                            //aluno[1] = nome
                            return (
                                <List.Item
                                    key={aluno[0]}
                                    title={aluno[1]}
                                    left={props => <Checkbox.Item label={aluno[0]} status={check[aluno[0]]} onPress={() => {
                                        const novoDic = { ...check }
                                        novoDic[aluno[0]] = novoDic[aluno[0]] == 'checked' ? 'unchecked' : 'checked'
                                        setCheck(novoDic)
                                    }
                                    } />}
                                />
                            )
                        })}
                    <Button size={30} onPress={requisicaoGravarChamada}>Salvar chamada {date.getUTCDate()}/{date.getMonth() + 1}/{date.getUTCFullYear()}</Button>
                </>
            )
        } else {
            return <Text>Aguardando escolha da sala</Text>
        }
    }

    return (
        <ScrollView>
            <Button onPress={showDatepicker}>Mudar data</Button>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display={Platform.OS === 'ios'?"inline":"default"}
                    onChange={onChange}
                />
            )}
            <ScrollView>
                {condicionalSala()}
            </ScrollView>

            <SnackBarCriarChamada mensagemSnackBar={mensagemSnackBar} setMensagemSnackBar={setMensagemSnackBar} />
            <ConfirmacaoChamada mensagemConfirmacao={mensagemConfirmacao} setMensagemConfirmacao={setMensagemConfirmacao} requisicaoGravarChamada={requisicaoGravarChamada} setSobreescrever={setSobreescrever} sobreescrever={sobreescrever} />
        </ScrollView>
    )
}

export default CriarChamada
