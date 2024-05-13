import { ALERT_TYPE, MESSAGE_TYPE, createAlert } from "../../components/alert";
import { LabelBtnToggle } from "../../components/btnToggle";
import { managerShowApp, setDefaultStorageItem, titleList, MenuConfig, clickedToggleContainer } from "../settings/@config";

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
                ${LabelBtnToggle({span: "Mostrar Text-app", btnId: "toggle-text-style"}).outerHTML}
            </div>
            <div class="content-grid-item">
                ${LabelBtnToggle({span: "Mostrar Text-crud", btnId: "toggle-text-crud"}).outerHTML}
            </div>
            <div class="content-grid-item">
                ${LabelBtnToggle({span: "Mostrar Anexos", btnId: "toggle-anexo-untels"}).outerHTML}
            </div>
            <div class="content-grid-item">
                ${LabelBtnToggle({span: "Mostrar Directivos", btnId: "toggle-directivo-untels"}).outerHTML}
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

// INTERFACE PARA CONTROLAR LOS MODULOS
interface ParamsModuleConfig {
    menu: HTMLUListElement;
    section: HTMLElement;
    target?: HTMLLIElement;
    alert?: HTMLDivElement;
}
interface ParamItemModule {
    element: HTMLLIElement;
    action: string;
    show: string;
    class: string;
    item: string;
    html: Function;
}
interface TypeModuleConfig {
    home: ParamItemModule;
    pages: ParamItemModule;
    ui: ParamItemModule;
    api: ParamItemModule;
}
// INTERFACE PARA CONTROLAR LOS BTN TOGGLE
interface AppProperties {
    isactive: boolean;
    id: string;
    list: string;
    item_storage: string;
}
interface ParamPagesModule {
    btn_id: string;
    btn_class: string;
    btn_element: HTMLDivElement;
    li_page: string;
    li_element: HTMLLIElement;
    isActive: boolean;
    item: string;
}
interface TypePageModule {
    TEXT_APP: ParamPagesModule;
    TEXT_CRUD: ParamPagesModule;
    ANEXOS: ParamPagesModule;
    DIRECTIVOS: ParamPagesModule;
}


const ITEMS_CONFIG = {
    module: 'module-active',
    classLI: 'config_panel-li',
    pageContainer: 'div.mc-content-grid',
    boxToggle: 'box-toggle'
}
export function ModuleConfigController(menuUL: HTMLUListElement){
    // LISTA DE LOS MODULOS EN EL PANEL DE CONFIGURACION
    const moduleHome = menuUL.querySelector(`[data-action="module-home"]`) as HTMLLIElement
    const modulePages = menuUL.querySelector(`[data-action="module-pages"]`) as HTMLLIElement
    const moduleUI = menuUL.querySelector(`[data-action="module-ui"]`) as HTMLLIElement
    const moduleAPI = menuUL.querySelector(`[data-action="module-api"]`) as HTMLLIElement
    const objModulesConfig: TypeModuleConfig = {
        home: {
            element: moduleHome,
            action: moduleHome.dataset.action as string,
            show: moduleHome.dataset.show as string,
            class: moduleHome.dataset.class as string,
            item: 'module-home',
            html: createHomeModule,
        },
        pages: {
            element: modulePages,
            action: modulePages.dataset.action as string,
            show: modulePages.dataset.show as string,
            class: modulePages.dataset.class as string,
            item: 'module-pages',
            html: createPagesModule,
        },
        ui: {
            element: moduleUI,
            action: moduleUI.dataset.action as string,
            show: moduleUI.dataset.show as string,
            class: moduleUI.dataset.class as string,
            item: 'module-ui',
            html: createUIModule,
        },
        api: {
            element: moduleAPI,
            action: moduleAPI.dataset.action as string,
            show: moduleAPI.dataset.show as string,
            class: moduleAPI.dataset.class as string,
            item: 'module-api',
            html: createAPIModule,
        },
    };
    return objModulesConfig;
}
function searchModuleActive(param: string, menuUL: HTMLUListElement){
    return Object.values(ModuleConfigController(menuUL)).find((item: ParamItemModule) => item.item === param)
}
function setClassActiveModule(isClicked: boolean, inLocalStorage: boolean, objModules: ParamsModuleConfig){
    const menuUL = objModules.menu
    const arrModules = Array.from(menuUL.querySelectorAll<HTMLLIElement>(`.${ITEMS_CONFIG.classLI}`))
    if(!isClicked){
        if(!inLocalStorage){
            const moduleApp = ModuleConfigController(menuUL).home
            localStorage.setItem(ITEMS_CONFIG.module, moduleApp.item)
            moduleApp.element.classList.add(`${moduleApp.class}--active`)
            const homeHTML = ModuleConfigController(menuUL).home.html
            objModules.section.innerHTML = homeHTML()
            return moduleApp.class
        }
        if(inLocalStorage){
            const isSavedStorage = localStorage.getItem(ITEMS_CONFIG.module) as string
            // console.log(isSavedStorage);
            const elementLI = searchModuleActive(isSavedStorage, menuUL) as ParamItemModule
            console.log(elementLI);
            elementLI?.element.classList.add(`${elementLI.class}--active`)
            objModules.section.innerHTML = elementLI.html()
        }
        return
    }
    if(isClicked){
        const targetLI = objModules.target as HTMLLIElement
        const actionLI = targetLI.dataset.action as string
        const isShowLi = searchModuleActive(actionLI, menuUL)?.show
        if(isShowLi === 'active'){
            arrModules.forEach(element => element.classList.remove(`${element.dataset.class}--active`))
            const elementLI = searchModuleActive(actionLI, menuUL) as ParamItemModule
            elementLI?.element.classList.add(`${elementLI.element.dataset.class}--active`)
            objModules.section.innerHTML = elementLI.html()
            localStorage.setItem(ITEMS_CONFIG.module, actionLI)
            return
        }
        if(isShowLi === 'hidden'){
            const alert = objModules.alert as HTMLDivElement
            createAlert(alert, MESSAGE_TYPE.IN_PROCESS, ALERT_TYPE.TEMP.info, [], 2500)
            return
        }
    }
}

function ManagerEventModule(isClicked: boolean, isSavedStorage: boolean, obj: ParamsModuleConfig){
    if(!isClicked){
        isSavedStorage 
            ? setClassActiveModule(false, true, obj)
            : setClassActiveModule(false, false, obj)
        return
    }
    if(isClicked) setClassActiveModule(true, true, obj); return
}

function ManagerPagesModule(isClicked: boolean, isSavedStorage: boolean, obj: ParamPagesModule){
    if(!isClicked){
        if(!isSavedStorage){
            // console.log("no existe en local storage");
            localStorage.setItem(obj.item, String(obj.isActive))
            console.log(obj.isActive);
            if(obj.isActive){
                obj.btn_element.classList.add(`${obj.btn_class}--active`)
                obj.li_element.style.display = "flex"
                // console.log(obj.li_element);
                return
            }
            if(!(obj.isActive)){
                // console.log(obj.isActive);
                obj.btn_element.classList.remove(`${obj.btn_class}--active`)
                obj.li_element.style.display = "none"
                // console.log(obj.li_element.style);
                return
            }
        }
        if(isSavedStorage){
            console.log("existe en local storage");
            const itemPage = localStorage.getItem(obj.item) as string
            console.log(obj.btn_element);
            console.log(obj.li_element);
            
            if(itemPage === 'true'){
                obj.btn_element.classList.add(`${obj.btn_class}--active`)
                // console.log(obj.li_element);
                // console.log(obj.btn_element);
                obj.li_element.style.display = "flex"
                return
            }
            if(itemPage === 'false'){
                obj.btn_element.classList.remove(`${obj.btn_class}--active`)
                // console.log("elemento deberia tener display: none: ");
                // console.log(obj.btn_element);
                // console.log(obj.li_element);
                obj.li_element.style.display = "none"
                return
            }
        }
        return
    }
    if(isClicked){
        console.log("viene del evento click");
        const btnElement = obj.btn_element.classList.contains(`${obj.btn_class}--active`)
        if(btnElement){
            obj.btn_element.classList.remove(`${obj.btn_class}--active`)
            obj.li_element.style.display = 'none'
            localStorage.setItem(obj.item, 'false')
            return
        }
        if(!btnElement){
            obj.btn_element.classList.add(`${obj.btn_class}--active`)
            obj.li_element.style.display = 'flex'
            localStorage.setItem(obj.item, 'true')
        }
        return
    }
}
function searchAppPages(param: string, content: HTMLElement, nav: HTMLUListElement){
    return Object.values(ControllerPagesModule(content, nav)).find((i: ParamPagesModule)=>i.btn_id === param) as ParamPagesModule
}
function ControllerPagesModule(content: HTMLElement, nav: HTMLUListElement){
    const objIDItems = {
        text_app: {
            btn_id: 'toggle-text-style',
            btn_class: 'box-toggle',
            li_page: 'text-style',
            isActive: false,
            item: 'show-text-style'
        },
        text_crud: {
            btn_id: 'toggle-text-crud',
            btn_class: 'box-toggle',
            li_page: 'text-crud',
            isActive: false,
            item: 'show-text-crud'
        },
        anexos: {
            btn_id: 'toggle-anexo-untels',
            btn_class: 'box-toggle',
            li_page: 'anexo-untels',
            isActive: true,
            item: 'show-anexo-untels'
        },
        directivos: {
            btn_id: 'toggle-directivo-untels',
            btn_class: 'box-toggle',
            li_page: 'directivo-untels',
            isActive: true,
            item: 'show-directivo-untels'
        },
    }
    console.log(content);
    const pageContainer = content.querySelector(`${ITEMS_CONFIG.pageContainer}`) as HTMLDivElement
    console.log(pageContainer);
    const btnTEXT_APP = pageContainer.querySelector(`#${objIDItems.text_app.btn_id}`) as HTMLDivElement
    const btnTEXT_CRUD = pageContainer.querySelector(`#${objIDItems.text_crud.btn_id}`) as HTMLDivElement
    const btnANEXOS = pageContainer.querySelector(`#${objIDItems.anexos.btn_id}`) as HTMLDivElement
    const btnDIRECTIVOS = pageContainer.querySelector(`#${objIDItems.directivos.btn_id}`) as HTMLDivElement
    const liTEXT_APP = nav.querySelector(`li[data-page="${objIDItems.directivos.li_page}"]`) as HTMLLIElement
    const liTEXT_CRUD = nav.querySelector(`li[data-page="${objIDItems.directivos.li_page}"]`) as HTMLLIElement
    const liANEXOS = nav.querySelector(`li[data-page="${objIDItems.directivos.li_page}"]`) as HTMLLIElement
    const liDIRECTIVOS = nav.querySelector(`li[data-page="${objIDItems.directivos.li_page}"]`) as HTMLLIElement
    const objPageEvents: TypePageModule = {
        TEXT_APP: {
            btn_id: objIDItems.text_app.btn_id,
            btn_class: objIDItems.text_app.btn_class,
            btn_element: btnTEXT_APP,
            li_page: objIDItems.text_app.li_page,
            li_element: liTEXT_APP,
            isActive: objIDItems.text_app.isActive,
            item: objIDItems.text_app.item
        },
        TEXT_CRUD: {
            btn_id: objIDItems.text_crud.btn_id,
            btn_class: objIDItems.text_crud.btn_class,
            btn_element: btnTEXT_CRUD,
            li_page: objIDItems.text_crud.li_page,
            li_element: liTEXT_CRUD,
            isActive: objIDItems.text_crud.isActive,
            item: objIDItems.text_crud.item
        },
        ANEXOS: {
            btn_id: objIDItems.anexos.btn_id,
            btn_class: objIDItems.anexos.btn_class,
            btn_element: btnANEXOS,
            li_page: objIDItems.anexos.li_page,
            li_element: liANEXOS,
            isActive: objIDItems.anexos.isActive,
            item: objIDItems.anexos.item
        },
        DIRECTIVOS: {
            btn_id: objIDItems.directivos.btn_id,
            btn_class: objIDItems.directivos.btn_class,
            btn_element: btnDIRECTIVOS,
            li_page: objIDItems.directivos.li_page,
            li_element: liDIRECTIVOS,
            isActive: objIDItems.directivos.isActive,
            item: objIDItems.directivos.item
        },
    };
    return objPageEvents;
}


export function getEvents(section: HTMLElement){
    const divAlert = document.querySelector('.alert') as HTMLDivElement
    const configModuleslUL = section.querySelector('.config_panel-ul') as HTMLUListElement
    const configContentSection = section.querySelector('.main-config-content') as HTMLElement
    const navPageApp = document.querySelector('.dropdown_ul.dropdown_app') as HTMLUListElement

    // EVENTOS DE LA LISTA DE MODULOS
    const isSavedStorage = window.localStorage.getItem(ITEMS_CONFIG.module)
        isSavedStorage === null 
            ? ManagerEventModule(false, false, {menu: configModuleslUL, section: configContentSection})
            : ManagerEventModule(false, true, {menu: configModuleslUL, section: configContentSection})
    configModuleslUL.addEventListener('click', (e:MouseEvent)=> {
        const isLIElement = (e.target as HTMLLIElement).classList.contains('config_panel-li')
        if(isLIElement){
            const targetLI = (e.target as HTMLLIElement)
            ManagerEventModule(true, true, {menu: configModuleslUL, target: targetLI, alert: divAlert, section: configContentSection})
        }
    })
    // EVENTOS EN MODULO PAGES
    const ITEMS_PAGE = ControllerPagesModule(configContentSection, navPageApp)
    Object.values(ITEMS_PAGE).forEach((i:ParamPagesModule)=>{
        const inLocalStorage = localStorage.getItem(i.item)
        inLocalStorage === null
            ? ManagerPagesModule(false, false, i)
            : ManagerPagesModule(false, true, i)
    })
    configContentSection.querySelector(ITEMS_CONFIG.pageContainer)?.addEventListener('click', e =>{
        const targetToggle = e.target as HTMLDivElement
        const isBoxToggle = targetToggle.classList.contains(ITEMS_CONFIG.boxToggle)
        const isMatchItem = searchAppPages(targetToggle.id, configContentSection,navPageApp) as ParamPagesModule
        if(isBoxToggle){
            console.log(targetToggle);
            ManagerPagesModule(true, true, isMatchItem)
        }
    })
    
}
