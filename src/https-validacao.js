import chalk from 'chalk';
import fetch from 'node-fetch';

function extraiLinks(arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join())
}

async function checaStatus (listaURLs) {
    const arrStatus = await Promise
    .all(
      listaURLs.map(async (url) => {
        try {
          const response = await fetch(url)
          return `${response.status} - ${response.statusText}`;
        } catch (erro) {
          return manejaErros(erro);
        }
      })
    )
    return arrStatus;
}

function manejaErros (erro) {
    console.log(chalk.red('Algo deu errado'))
}

export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links)

    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}