import { ALERT_TYPE, MESSAGE_TYPE, createAlert } from "../../components/alert";
import { LabelBtnToggle } from "../../components/btnToggle";

// DICTIONARY
export const titleList = {
    DEFAULT: {
        1: "Modifica los ajustes predeterminados en la aplicación"
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
export const showAppModule = {
    TEXT_STYLE: {
        toggle: 'show-text-style',
        element: 'text-style'
    },
    TEXT_CRUD: {
        toggle: 'show-text-crud',
        element: 'text-crud'
    },
    ANEXOS: {
        toggle: 'show-anexo-untels',
        element: 'anexo-untels',
    },
    DIRECTIVO: {
        toggle: 'show-directivo-untels',
        element: 'directivo-untels'
    },
}

export function createHomeModule(){
    const div = document.createElement('div')
    div.innerHTML = createTitleComponent(titleList.DEFAULT[1]).outerHTML
    return div.innerHTML
}
function createPagesModule(){
    const div = document.createElement('div')
    div.innerHTML = `
        ${createTitleComponent(titleList.PAGES[1]).outerHTML}
        <div class="mc-content-grid">
            <div class="content-grid-item">
                ${LabelBtnToggle({span: "Mostrar Text-app", btnId: "show-text-style"}).outerHTML}
            </div>
            <div class="content-grid-item">
                ${LabelBtnToggle({span: "Mostrar Text-crud", btnId: "show-text-crud"}).outerHTML}
            </div>
            <div class="content-grid-item">
                ${LabelBtnToggle({span: "Mostrar Anexos", btnId: "show-anexo-untels"}).outerHTML}
            </div>
            <div class="content-grid-item">
                ${LabelBtnToggle({span: "Mostrar Directivos", btnId: "show-directivo-untels"}).outerHTML}
            </div>
        </div>
    `;
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

const modulePagesManager = {
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

function modulesConfigPanel(e:MouseEvent, menuUL:HTMLUListElement, container:HTMLElement, alert: HTMLDivElement){
    const isLIElement = (e.target as HTMLElement).tagName === "LI"
    const listMenu = e.target as HTMLElement
    const elements = Array.from(menuUL.querySelectorAll<HTMLLIElement>(`.${listMenu.dataset.class}`))
    const dataAction = (e.target as HTMLLIElement).getAttribute('data-action')
    const listModulesPages = Object.values(modulePagesManager).filter( i => i.name === dataAction)
    if(isLIElement && (e.target as HTMLLIElement).dataset.show === 'active'){
        const { html } = listModulesPages[0]
        container.innerHTML = html()
        // QUITAR LA CLASE ACTIVO A TODOS MENOS AL TARGET
        elements.forEach(element => {
          element.classList.remove(`${element.dataset.class}--active`)
        })
        listMenu.classList.add(`${listMenu.dataset.class}--active`)
        managerClickedModule((e.target as HTMLElement), container)
        return
    }
    else if(isLIElement && (e.target as HTMLLIElement).dataset.show === 'hidden'){
        createAlert(alert, MESSAGE_TYPE.IN_PROCESS, ALERT_TYPE.TEMP.info, [], 2500)
        return
    }
}
function appClassDefault(container: HTMLElement){
    const defaultActive = {
        APP_1: 'show-anexos',
        APP_2: 'show-directivos'
    }
    const listLabelToggle = Array.from(container.querySelectorAll('.box-toggle'))
    console.log(listLabelToggle);
    // AQUI SE DEBERIA COMPROBAR LOS ID GUARDADOS EN LOCALSTORAGE PARA ESTABLECERLOS COMO DEFAULT
    const arrayClassDefaultActive = Object.values(defaultActive)
    listLabelToggle.forEach((element) => {
        arrayClassDefaultActive.includes(element.id)
            ? element.classList.add(`${(element as HTMLElement).dataset.class}--active`)
            : null
    })
    return
}
function managerClickedModule(target: HTMLElement, container: HTMLElement){
    appClassDefault(container)
    // ELEMENTO LI DE SELECCION DE MODULO
    // console.log(target);
    const navApplications = document.querySelector('.dropdown_ul.dropdown_app') as HTMLElement
    const btnToggleContainer = container.querySelector('div.mc-content-grid')
    btnToggleContainer?.addEventListener('click', e => {
        const target = e.target as HTMLDivElement
        // COMPROBAR SI EL ID EXISTE EN EL OBJETO DE VALORES PERMITIDOS
        const appIDExist = Object.values(showAppModule).find(i =>i.toggle === target.id ? i : null)
        if(appIDExist){
            console.log(target.id);
            let classToggle = `${target.dataset.class}--active`
            const isClassActive = target.classList.contains(classToggle)
            // AQUI SE DEBERIA GUARDAR EN LOCALSTORAGE EL ITEM CON LA CLASE ACTIVA
            // TAMBIEN SE DEBE OCULTAR O MOSTRAR LA APLICACION
            console.log(isClassActive);
            removeAppModule(isClassActive, navApplications, target)

            isClassActive 
            ? target.classList.remove(classToggle)
            : target.classList.add(classToggle)
            return
        }
    })
}
function removeAppModule(isactive: boolean, navcontainer:HTMLElement, target: HTMLDivElement){
    const idMatched = Object.values(showAppModule).find(i => {
        if(i.toggle === target.id) return i
    })
    const idElement = (idMatched?.element && idMatched.element) as string
    const elementMatched = searchIDElement(idElement, navcontainer, 'data', 'page')

    if(isactive && elementMatched){
        elementMatched.style.display = 'none'
        return idMatched
    }
    if(!isactive && elementMatched){
        elementMatched.style.display = 'flex'
    }
    else{
        console.log("ERROR, parámetros no definidos");
    }
}
function searchIDElement(id: string, container:HTMLElement, attr: string, typeattr: string){
    let targetMatch = null;
    const objSearch = {
        data: 'data',
        id: 'id'
    }
    if(attr === objSearch.data){
        targetMatch = container.querySelector(`[data-${typeattr}="${id}"]`) as HTMLElement
    } 
    if(attr === objSearch.id){
        targetMatch = container.querySelector(`#${id}`) as HTMLElement
    }
    return targetMatch
}
function contentLoaded(navUL: HTMLElement){
    const objPagesClass = {
        TEXT_STYLE: 'text-style',
        TEXT_CRUD: 'text-crud',
        ANEXOS: 'anexos',
        DIRECTIVOS: 'directivos',
    }
    const targetNav = Object.values(showAppModule).map(idpage => {
        const element = searchIDElement(idpage.element, navUL,'data', 'page')
        return element  
    })
    console.log(targetNav);
    const showTextStyle = localStorage.getItem(objPagesClass.TEXT_STYLE) as string
    const showTextCRUD = localStorage.getItem(objPagesClass.TEXT_CRUD) as string
    const showAnexos = localStorage.getItem(objPagesClass.ANEXOS) as string
    const showDirectivos = localStorage.getItem(objPagesClass.DIRECTIVOS) as string
    const arrPages = [showTextStyle, showTextCRUD, showAnexos, showDirectivos]
    arrPages.forEach((pages, i) =>{
        // pages === 'true'
        //     ? removeAppModule(true, navUL,'data', 'page')
        //     : removeAppModule(false, navUL,'data', 'page')
    })
}

export function getEvents(section: HTMLElement){
    const divAlert = document.querySelector('.alert') as HTMLDivElement
    const listPanelUL = section.querySelector('.config_panel-ul') as HTMLUListElement
    const configContent = section.querySelector('.main-config-content') as HTMLElement
    const navApplications = document.querySelector('.dropdown_ul.dropdown_app') as HTMLElement

    listPanelUL.addEventListener('click', (e)=> modulesConfigPanel(e, listPanelUL, configContent, divAlert))
    document.addEventListener('DOMContentLoaded', ()=> contentLoaded(navApplications))
}