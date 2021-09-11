import * as React from 'react';
import { BottomNavigation, Text, Paragraph } from 'react-native-paper';
import CriarChamada from './RoutesNavegacao/CriarChamada';
import ListaAlunos from './RoutesNavegacao/ListaAlunos';
import Chamadas from './RoutesNavegacao/Chamadas'


const BotoesNavegacao = ({ sala, setSala, setMensagemSnackBarApp }) => {
  const [index, setIndex] = React.useState(0);
  const [date, setDate] = React.useState(new Date(2021, 8, 25))

  const [routes] = React.useState([
    { key: 'criarChamada', title: 'criar chamada', icon: 'book-plus' },
    { key: 'chamadas', title: 'Chamadas', icon: 'book-search' },
    { key: 'listaAlunos', title: 'Lista de Alunos', icon: 'account-group' },
  ]);

  //TODO: Abrir a navegação só se estiver com uma sala escolhida

  const navegacaoCondicional = (elemento) => {
    if (sala !== '') {
      return elemento
    } else {
      return (
        <Paragraph style={{height:'100%', width:'100%', textAlign:'center', marginTop:'40%'}}>Aguardando a escolha da sala</Paragraph>
      )
    }
  }

  const renderScene = BottomNavigation.SceneMap({
    criarChamada: () => navegacaoCondicional(<CriarChamada sala={sala} setSala={setSala} date={date} setDate={setDate}
          setMensagemSnackBarApp={setMensagemSnackBarApp} />),
    chamadas: () => navegacaoCondicional(<Chamadas sala={sala} setSala={setSala} setIndex={setIndex} setDate={setDate} setMensagemSnackBarApp={setMensagemSnackBarApp}/>),
    listaAlunos: () => navegacaoCondicional(<ListaAlunos sala={sala} setSala={setSala} />),
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BotoesNavegacao;