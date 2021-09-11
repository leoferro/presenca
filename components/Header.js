import React, { useState, useEffect } from 'react'

import { Appbar, Menu, Divider, Button, IconButton } from 'react-native-paper';
import { listaTurmas, pegarTurma } from '../controler/controlerTurmaStorage';


function Header({ sala, setSala, setModalVisivel, dadosSalas, carregarDados, setNomeTurma, setSiglaTurma , setSobrescreverTurma}) {

    const [subHeader, setSubHeader] = useState('Escolha a sala')

    const [visivel, setVisivel] = useState(false)

    const [nomeSala, setNomeSala] = useState('')



    useEffect(() => {
        if (sala!==''){
            setNomeSala(sala.getNome())
        }else{
            setNomeSala('Escolha sua Sala')
        }
    }, [sala])

    const abrirMenu = () => setVisivel(true);

    const fecharMenu = () => setVisivel(false)

    const escolher = async (sala) => {
        const atribuirSala = await pegarTurma(sala)
        setSubHeader(atribuirSala.getNome())
        setSala(atribuirSala)
        fecharMenu()
    }

    const abrirModalCadastroEscola = () => {
        setModalVisivel(true)
        fecharMenu()
    }


    if (!dadosSalas) {
        carregarDados()
    }

    const condicionalConfig = () => {
        if (sala !== '') {
            return (
                <IconButton
                    icon='briefcase-edit-outline'
                    onPress={()=>{
                        setNomeTurma(sala.getNome())
                        setSiglaTurma(sala.getSigla())
                        setSobrescreverTurma(true)
                        abrirModalCadastroEscola()
                    }}

                />
            )
        }
    }

    const condicionalDados = () => {
        if (dadosSalas) {
            return dadosSalas.map((sala, index) => {

                return (
                    <Menu.Item key={index} title={sala.slice(5)} onPress={() => { escolher(sala) }} />
                )

            })
        }
    }


    return (
        <Appbar.Header>
            <Appbar.Content title="Chamada" subtitle={nomeSala==''?subHeader:nomeSala} />
            {condicionalConfig()}
            <Menu
                visible={visivel}
                onDismiss={fecharMenu}
                anchor={<Appbar.Action icon="dots-vertical" onPress={abrirMenu} />}
            >
                <Button
                    onPress={abrirModalCadastroEscola}
                >Nova Escola</Button>
                {condicionalDados()}
            </Menu>
        </Appbar.Header>
    )
}

export default Header
