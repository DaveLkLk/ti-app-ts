
import { ALERT_TYPE, MESSAGE_TYPE, createAlert } from "../../components/alert";
import { LabelBtnToggle } from "../../components/btnToggle";
import { managerShowApp, setDefaultStorageItem, titleList, MenuConfig, clickedToggleContainer } from "../settings/@configOLD";

const settingsStorage = {
    module: 'module-active',
}
export function createTitleComponent(str:string){
    const div = document.createElement('div')
    div.classList.add('mc-content-title')
    div.innerHTML = `
        <h3>${str}</h3>
    `;
    return div;
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
export const modulePagesManager = {
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
function filterModuleConfig(param: string){
    return (Object.values(modulePagesManager).filter( i => i.name === param))[0]
}
function actionClicked(iselement: boolean){

}
function menuConfigClicked(obj: MenuConfig){
    const listMenu = obj.e.target as HTMLLIElement
    const isLIElement = listMenu.tagName === "LI"
    const elements = Array.from(obj.ulMenu.querySelectorAll<HTMLLIElement>(`.${listMenu.dataset.class}`))
    const dataAction = listMenu.getAttribute('data-action') as string
    const listModulesPages = filterModuleConfig(dataAction)

    if(isLIElement && listMenu.dataset.show === 'active'){
        const { html } = listModulesPages
        obj.content.innerHTML = html()
        // AQUI SE LLAMA LA FUNCION QUE ESTABLECE A LOS BTN TOGGLE LA CLASE ACTIVO
        managerShowApp(true, dataAction, {container: obj.content, nav: obj.nav})

        // QUITAR LA CLASE ACTIVO A TODOS MENOS AL TARGET
        elements.forEach(element => element.classList.remove(`${element.dataset.class}--active`))
        listMenu.classList.add(`${listMenu.dataset.class}--active`)
        localStorage.setItem(settingsStorage.module, listModulesPages.name)
        
        return
    }
    else if(isLIElement && listMenu.dataset.show === 'hidden'){
        createAlert(obj.alert, MESSAGE_TYPE.IN_PROCESS, ALERT_TYPE.TEMP.info, [], 2500)
        return
    }
}

function contentLoaded(navUL: HTMLUListElement, configPanel: HTMLUListElement, configContent: HTMLElement){
    const itemModule = localStorage.getItem(settingsStorage.module)
    // ESTABLECE LA CLASE ACTIVA DE LA OPCION DE MODULO DEL MENU Y RENDERIZA EL HTML DEL MISMO 
    const classActive = function(){
        if(itemModule === null){
            localStorage.setItem(settingsStorage.module, modulePagesManager.home.name)
            return configPanel.querySelector(`li[data-action="${modulePagesManager.home.name}"]`) as HTMLLIElement
        }
        else{
            return configPanel.querySelector(`li[data-action="${itemModule}"]`) as HTMLLIElement
        }
    } 
    const dataAction = classActive().dataset.action as string
    const { html} = filterModuleConfig(dataAction)
    configContent.innerHTML = html()
    classActive().classList.add(`${classActive().dataset.class}--active`)
    // *************************************************************************************
    managerShowApp(true, dataAction, {container: configContent, nav: navUL})
    return
}


export function getEvents(section: HTMLElement){
    const divAlert = document.querySelector('.alert') as HTMLDivElement
    const listPanelUL = section.querySelector('.config_panel-ul') as HTMLUListElement
    const configContent = section.querySelector('.main-config-content') as HTMLElement
    const navApplications = document.querySelector('.dropdown_ul.dropdown_app') as HTMLUListElement

    listPanelUL.addEventListener('click', (e)=> menuConfigClicked(
        {e, ulMenu: listPanelUL, content:configContent, nav: navApplications, alert:divAlert}
    ))
    clickedToggleContainer(configContent, navApplications)
    contentLoaded(navApplications, listPanelUL, configContent)
}