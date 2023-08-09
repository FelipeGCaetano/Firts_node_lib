import fs from 'fs';
import chalk from 'chalk';


function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const result = capturas.map(captura => ({[captura[1]]: captura[2]}))

    return result.length !== 0 ? result : 'Não há link no arquivo'
}


function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'));
}

// async e await
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto)
    } catch (erro){
        trataErro(erro)
    }
}


export default pegaArquivo;
