import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider as PaperProvider, Button } from 'react-native-paper';
import theme from './CustomProperties/Theme'
import Header from './components/Header';
import BotoesNavegacao from './components/BotoesNavegacao';
import CadastroSala from './components/CadastroSala';
import { listaTurmas } from './controler/controlerTurmaStorage';
import SnackBarApp from './components/SnackBarApp';



export default function App() {

  const [dadosSalas, setDadosSalas] = useState(null)
  const [sala, setSala] = useState('')


  //States SnackBar
  const [mensagemSnackBarApp, setMensagemSnackBarApp] = useState('')

  //states do Modal
  const [modalVisivel, setModalVisivel] = useState(false)
  const [sobrescreverTurma, setSobrescreverTurma] = useState(false)
  

  const carregarDados = async () => {
    const dados = await listaTurmas()
    setDadosSalas(dados)
  }

  useEffect(() => {
    carregarDados()
  }, [sala])



  return (
    <PaperProvider theme={theme}>
      <CadastroSala
        sobrescreverTurma={sobrescreverTurma}
        setSobrescreverTurma={setSobrescreverTurma}
        modalVisivel={modalVisivel}
        setModalVisivel={setModalVisivel}
        setSala={setSala} sala={sala}
        dadosSalas={dadosSalas}
        setDadosSalas={setDadosSalas}
        carregarDados={carregarDados}
        setMensagemSnackBarApp={setMensagemSnackBarApp}
      />

      <Header
        setSobrescreverTurma={setSobrescreverTurma}
        sala={sala}
        setSala={setSala}
        setModalVisivel={setModalVisivel}
        dadosSalas={dadosSalas}
        setDadosSalas={setDadosSalas}
        carregarDados={carregarDados}
      />

      <BotoesNavegacao
        sala={sala}
        setSala={setSala}
        setMensagemSnackBarApp={setMensagemSnackBarApp}
      />
      <SnackBarApp 
        setMensagemSnackBarApp={setMensagemSnackBarApp}
        mensagemSnackBarApp={mensagemSnackBarApp}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
