import { sectionNotFound } from "../modules/404.ts";
import { sectionTextCRUD } from "../modules/text-crud.ts";
import { sectionStyleText } from "../modules/text-style.ts";
import { sectionAnexoUNTELS } from "../modules/untels.ts";
import { sectionDirectivoUNTELS } from "../modules/directivos.ts";
import { sectionPageConfiguration } from "../modules/config.ts";

import { anexoLocalStorage } from "../modules/events/_untels.ts";
import { stylesLocalStorage } from "../modules/events/_text-style.ts";
import { addLocalStorage } from "../rules/functions.ts";

import { PageApp } from "../rules/types.ts";

const pagesApp:PageApp = {
    TEXT_STYLE: {
        id: 'text-style',
        page: sectionStyleText
    },
    TEXT_CRUD: {
        id: 'text-crud',
        page: sectionTextCRUD
    },
    ANX: {
        id: 'anexo-untels',
        page: sectionAnexoUNTELS
    },
    DRCTV: {
        id: 'directivo-untels',
        page: sectionDirectivoUNTELS
    },
    NOT_FOUND: {
        id: 'not-found',
        page: sectionNotFound
    },
    CONFIG: {
        id: 'config-page',
        page: sectionPageConfiguration
    }
}
export function pageManagerApp(dataset:string){
    const dataPage = dataset
    const pageFound = Object.values(pagesApp).find(entry => entry.id === dataPage);
    if(pageFound){
        // guardamos el id de la seccion en localstorage
        // el id se recupera en _nav
        addLocalStorage('section-app', dataPage)
        const showPage = {
            page: pageFound.page,
            state: true
        }
        return showPage
    }
    else{
        return undefined;
    }
}
export function managerLocalStorage(){
    const itemsLocalStorage = {
        anexos: anexoLocalStorage,
        styles: stylesLocalStorage
    }
    return itemsLocalStorage;
}