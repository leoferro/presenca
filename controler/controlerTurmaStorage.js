import { Turma } from '../models/Turma.js';
import { storeData, getData, pegarChaves, removeItem } from '../storage/storage.js';

// Usar a string da sigla da turma para pegar os dados
export const pegarTurma = async (siglaTurma) => {
    const dadosTurma = await getData(siglaTurma);
    return Turma.parseToTurma(dadosTurma)
}

// Enviar o objeto turma
export const gravarTurma = async (turma) => {
    if (turma instanceof Turma) {
        const chave = 'sala-' + turma.getSigla()
        const valor = Turma.parseToString(turma)
        await storeData(chave, valor)
        return { msg: 'Sala Gravada com sucesso' }
    } else {
        return { erro: 'não foi possivel salvar a sala' }
    }
}

//Criar nova turma.
export const criarTurma = async (siglaTurma, nomeTurma) => {
    const novaTurma = new Turma(siglaTurma, nomeTurma)
    const chave = 'sala-' + novaTurma.getSigla()
    const valor = Turma.parseToString(novaTurma)
    const listaChaves = await pegarChaves();
    if (listaChaves.indexOf(chave) != -1) {
        return { erro: "Chave Já existente, excula a sala antes de adicionar" }
    } else {
        await storeData(chave, valor)
        return novaTurma
    }
}

export const listaTurmas = async () => {
    return (await pegarChaves()).filter(chave => {
        if (chave.indexOf('sala-') === 0) {
            return chave
        }
    })
}


export const mudarNomeSiglaTurmaData = async (nomeNovo, siglaNova, sala) => {
    const siglaAntiga = sala.getSigla()
    const mudouSigla = siglaAntiga !== siglaNova
    if (mudouSigla) {
        const criacao = await criarTurma(siglaNova, nomeNovo)
        if (!(criacao instanceof Turma)) {
            return { erro: 'erro na hora de criar turma' }
        }
    }
    sala.trocarNomeSigla(nomeNovo, siglaNova)
    const res = await gravarTurma(sala)
    if ('erro' in res) {
        return { erro: 'erro na hora de gravar sala' }
    } else {
        if (mudouSigla) {
            await removeItem('sala-' + siglaAntiga)
        }
        return sala
    }
}
export const deletarDataSala = async (sala) => {
    const delet = await removeItem('sala-' + sala.getSigla())
}


export const salvarAluno = async (numero, aluno, sala) => {
    const adicionarClasse = sala.adicionarAluno(numero, aluno)
    if ('erro' in adicionarClasse) {
        return adicionarClasse
    } else {
        const salvar = await gravarTurma(sala)
        return { sala }
    }
}

export const salvarChamada = async (data, chamada, sala, sobrescrever) => {
    const adicionarChamadaClasse = sala.adicionarChamada(chamada, data, sobrescrever)
    if ('erro' in adicionarChamadaClasse) {
        console.log(adicionarChamadaClasse.erro)
        return adicionarChamadaClasse
    } else {
        const salvar = await gravarTurma(sala)
        return sala
    }
}

export const deletarDataChamada = async (data, sala) => {
    const tempDelCham = sala.removerChamada(data)
    if ('erro' in tempDelCham) {
        return tempDelCham
    } else {
        await gravarTurma(sala)
        return sala
    }
}

export const deleteDataAluno = async (numero, sala) => {
    const remAlunTemp = sala.removerAluno(numero)
    if ('erro' in remAlunTemp) {
        return remAlunTemp
    } else {
        await gravarTurma(sala)
        return sala
    }
}

export const editarDataAluno = async (numero, numeroNovo, nomeNovo, sala) => {
    const edtAlnTmp = sala.editarAluno(numero, numeroNovo, nomeNovo)
    if ('msg' in edtAlnTmp) {
        await gravarTurma(sala)
        return sala
    } else {
        return edtAlnTmp
    }
}
