import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        const res = await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log(e)
        return {erro:'não foi possivel salvar', obj:e}
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value
        } else {
            console.log('não existe essa chave')
        }
    } catch (e) {
        console.log(e)
    }
}

export const removeItem =  async (key)=>{
    try {
        await AsyncStorage.removeItem(key)
        return {msg:`Chave ${key} removida com sucesso`}
    } catch (error) {
        return error
    }
}

export const pegarChaves = async () =>{
    try {
        const chaves = await AsyncStorage.getAllKeys()
        return chaves
    } catch (error) {
        console.log(error)
    }
}