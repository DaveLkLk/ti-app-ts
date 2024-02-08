import { sectionNotFound } from "../modules/404.ts";
import { sectionTextCRUD } from "../modules/text-crud.ts";
import { sectionStyleText } from "../modules/text-style.ts";
import { sectionAnexoUNTELS } from "../modules/untels.ts";
import { sectionDirectivoUNTELS } from "../modules/directivos.ts";

import { anexoLocalStorage } from "../modules/events/_untels.ts";
import { stylesLocalStorage } from "../modules/events/_text-style.ts";

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
    }
}
export function pageManagerApp(dataset:string){
    const dataPage = dataset
    const pageFound = Object.values(pagesApp).find(entry => entry.id === dataPage);
    if(pageFound){
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