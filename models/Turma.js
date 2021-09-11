    export class Turma {

    constructor(siglaTurma, nomeTurma, nomes={}, chamadas={}) {
        this.nomes = { ...nomes };
        this.chamadas = { ...chamadas };
        this.nomeTurma = nomeTurma;
        this.siglaTurma = siglaTurma.toUpperCase()
    }

    //Retorna o objeto da data pedida
    getData(data) {
        if (data in this.chamadas) {
            return this.chamadas[data];
        } else {
            throw new Error('Não existe essa data '+data)
        }
    }

    getNome(){
        return this.nomeTurma
    }

    getListaNomes(){
        return Object.keys(this.nomes)
            .map(numero=>{
                return this.nomes[numero]
            })
    }

    getListaNumeros(){
        return Object.keys(this.nomes)
    }

    getNumerosComNomesLista(){
        return Object.keys(this.nomes)
            .map(numero=>{
                return [numero , this.nomes[numero]]
            })
    }

    getSigla(){
        return this.siglaTurma
    }

    //Retorna uma lista de datas
    getDatas() {
        return Object.keys(this.chamadas)
    }

    //retorna uma lista de listas no formato [numeroDoAluno, nomeDoAluno, se ele esta presente]
    getNomesNaChamada(data) {
        const dataTemp = this.getData(data)
        return Object.keys(dataTemp).map(numeroAluno => {
            return [numeroAluno, this.nomes[numeroAluno], dataTemp[numeroAluno]]
        })
    }

    adicionarAluno(numero, nomeAluno){
        if (numero in this.nomes){
            return {erro:'Numero ja existente'}
        }else{
            this.nomes[numero]=nomeAluno
            return {msg:'aluno adicionado ào objeto'}
        }
    }

    removerAluno(numero){
        if (numero in this.nomes){
            delete this.nomes[numero]
            Object.keys(this.chamadas).forEach(chamada=>{
                if (numero in this.chamadas[chamada]){
                    delete this.chamadas[chamada][numero]
                }
            })
            return {msg:'Sucesso'}
        }else{
            return {erro:'não existe esse aluno'}
        }
    }

    adicionarChamada(chamada,data, sobreescrever=false){
        if (data in this.chamadas && !sobreescrever){
            return {erro:'Chamada já existente'}
        }else{
            this.chamadas[data]=chamada
            return {msg:'chamadaCriada', obj:this.chamadas[data]}
        }
    }

    removerChamada(data){
        if (data in this.chamadas){
            delete this.chamadas[data]
            return {msg:'Removido'}
        }else{
            return {erro:'Não existe essa data'}
        }
    }

    editarAluno(numero, numeroNovo, nomeNovo){
        if (numero!==numeroNovo){
            if (numeroNovo in this.nomes){
                return {erro:'Já existe esse número'}
            }else{
                this.adicionarAluno(numeroNovo, nomeNovo)
                this.getDatas().forEach(data=>{
                    this.chamadas[data][numeroNovo]=this.chamadas[data][numero]
                })
                this.removerAluno(numero)
                return {msg:`Número alterado para ${numeroNovo}`}
            }
        }else{
            this.nomes[numero]=nomeNovo
            return {msg:`Nome alterado para ${nomeNovo}`}
        }
    }

    trocarNomeSigla(nomeNovo, siglaNova){
        this.nomeTurma = nomeNovo;
        this.siglaTurma = siglaNova.toUpperCase()
    }


    //Metodos estaticos para salvar nos dados e recuperar
    static parseToString(turma) {
        return JSON.stringify(turma)
    }


    static parseToTurma(stringTurma) {
        const {siglaTurma, nomeTurma, nomes, chamadas } = JSON.parse(stringTurma)
        return new Turma(siglaTurma, nomeTurma, nomes, chamadas)
    }
}