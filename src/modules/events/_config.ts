import { ALERT_TYPE, MESSAGE_TYPE, createAlert } from "../../components/alert";

// DICTIONARY
export const titleList = {
    DEFAULT: {
        1: "En esta sección puedes modificar los ajustes predeterminados que ofrece la aplicación"
    },
    PAGES: {
        1: "Mostrar/Ocultar páginas",
        2: "Seguridad de página"
    },
    UI: {
        1: "Personalizar colores de página"
    },
    API: {
        1: "Integrar API de terceros"
    }
}

export function createHomeModule(){
    const div = document.createElement('div')
    div.innerHTML = createTitleComponent(titleList.DEFAULT[1]).innerHTML
    return div.innerHTML
}
function createPagesModule(){
    const div = document.createElement('div')
    div.textContent = ' HOLA PAGES'
    return div.innerHTML
}
function createUIModule(){
    const div = document.createElement('div')
    div.textContent = ' HOLA UI'
    return div.innerHTML
}
function createAPIModule(){
    const div = document.createElement('div')
    div.textContent = ' HOLA API'
    return div.innerHTML
}

const modulePages = {
    home: {
        name: 'module-home',
        html: createHomeModule
    },
    pages: {
        name: 'module-pages',
        html: createPagesModule
    },
    ui: {
        name: 'module-ui',
        html: createUIModule
    },
    api: {
        name: 'module-api',
        html: createAPIModule
    }
}

// COMPONENETES
export function createTitleComponent(str:string){
    const div = document.createElement('div')
    div.classList.add('mc-content-title')
    div.innerHTML = `
        <h3>${str}</h3>
    `;
    return div;
}
function updatePageConfigContent(element:HTMLDivElement){
    element.innerHTML = "hola"
}

function modulesConfigPanel(e:MouseEvent, menuUL:HTMLUListElement, container:HTMLElement){
    const isLIElement = (e.target as HTMLElement).tagName === "LI"
    const listMenu = e.target
    console.log(listMenu);
    // AQUI RECORRER LOS ELEMENTOS LI PARA AÑADIR LA CLASE ACTIVO SOLO A LA LI SELECCIONADA
    // 
    // 
    // 
    const dataAction = (e.target as HTMLLIElement).getAttribute('data-action')
    const listModulesPages = Object.values(modulePages).filter( i => i.name === dataAction)
    // console.log(listModulesPages);
    if(isLIElement){
        const { html } = listModulesPages[0]
        container.innerHTML = html()
        return
    }
}
export function getEvents(section: HTMLElement){
    const divAlert = document.querySelector('.alert') as HTMLDivElement
    
    const listPanelUL = section.querySelector('.config_panel-ul') as HTMLUListElement
    const configContent = section.querySelector('.main-config-content') as HTMLElement
    listPanelUL.addEventListener('click', (e)=> modulesConfigPanel(e, listPanelUL, configContent))


    document.addEventListener('DOMContentLoaded', ()=>{
    })
}