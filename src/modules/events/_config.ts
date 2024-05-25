import { ALERT_TYPE, MESSAGE_TYPE, createAlert } from "../../components/alert";
import { AttrConfigPanel, Config_Panel, ItemsModulePages } from "../interface/interface";
import { CONFIG_PAGES_MODULE, CONFIG_PANEL_NAV, ControlErrorModulePages } from "../settings/@config";

// **************** AJUSTES PARA EL PANEL ****************
function getDataActionListPanel(objData: Config_Panel, value: string){
    const result:AttrConfigPanel = Object.values(objData).find((item)=>{
        return item.dataaction === value
    })
    return result;
}
function setClassActiveListPanel(container: HTMLUListElement, element: HTMLLIElement){
    container.querySelectorAll<HTMLLIElement>(`li.${element.dataset.class}`).forEach(elm => {
        elm.classList.remove(`${elm.dataset.class}--active`)
    })
    element.classList.add(`${element.dataset.class}--active`)
    return
}
function setLocalStorageLi(item:string){
    localStorage.setItem('config-module', item)
    return
}
function setFocusLi(isClicked: boolean, 
                    panel: HTMLUListElement, 
                    container:HTMLElement, 
                    data: (AttrConfigPanel | null))
{
    if(isClicked){
        const element = (data as AttrConfigPanel).li(panel)
        setLocalStorageLi((data as AttrConfigPanel).dataaction)
        setClassActiveListPanel(panel, element)
        container.innerHTML = (data as AttrConfigPanel).html()
        // ESTABLECER LOS CAMBIOS EN PAGES CUANDO SE NAVEGA CON CLICK EN EL PANEL
        loadEventsPages(container)
        const nav = document.querySelector('.dropdown_ul.dropdown_app') as HTMLUListElement
        const pages:HTMLDivElement = document.querySelector('.content-grid-pages') as HTMLDivElement
        pages !== null ? setClassActiveBtnPagesDefault(pages, nav) : null
        return
    }
    if(!isClicked){
        const item = localStorage.getItem('config-module');
        if(item === null || item === undefined){
            setLocalStorageLi(CONFIG_PANEL_NAV.HOME.dataaction)
            setClassActiveListPanel(panel, CONFIG_PANEL_NAV.HOME.li(panel))
            return container.innerHTML = CONFIG_PANEL_NAV.HOME.html()
        }
        if(typeof item === 'string'){
            const dataAction = getDataActionListPanel(CONFIG_PANEL_NAV, item)
            setClassActiveListPanel(panel, dataAction.li(panel))
            return container.innerHTML = dataAction.html()
        }
    }
}

// **************** AJUSTES PARA EL CONTENIDO PAGES ********************************
function setClassActiveBtnPagesDefault(container:HTMLDivElement, nav: HTMLUListElement){
    const storeModulesPages = JSON.parse(localStorage.getItem('show-modules-page') || '[]') as string[];
    const arrBtnPagesApp = Object.values(CONFIG_PAGES_MODULE);
    const initialModulePages: string[] = [] //INICIALIZAMOS EL ARRAY PARA ALMACENAR LOS ITEMS POR DEFAULT A LS
    arrBtnPagesApp.forEach((btnApp:ItemsModulePages) => {
        const btn = btnApp.btn_element(container) as HTMLDivElement
        const stateDefaultBtn  = (btn?.parentElement?.parentElement as HTMLDivElement).dataset.active as string
        const isModuleShow = storeModulesPages.includes(btnApp.item)
        // SI INICIALMENTE NO EXISTEN ITEMS EN LOCALSTORAGE
        if(storeModulesPages.length === 0){
            if(stateDefaultBtn === 'true'){
                btn.classList.add(`${btnApp.btn_class}--active`)
                initialModulePages.push(btnApp.item)
                setShowApplication(true, btnApp, nav)
            }else{
                btn.classList.remove(`${btnApp.btn_class}--active`)
                setShowApplication(false, btnApp, nav)
            }
            localStorage.setItem('show-modules-page', JSON.stringify(initialModulePages))
            return
        }
        // YA EXISTEN LOS ITEMS EN LOCALSTORAGE, ENTONCES SE MUESTRAN LOS ITEMS QUE EXISTEN
        else{
            if(isModuleShow){
                btn.classList.add(`${btnApp.btn_class}--active`)
                setShowApplication(true, btnApp, nav)
            }
            else{
                btn.classList.remove(`${btnApp.btn_class}--active`)
                setShowApplication(false, btnApp, nav)
            }
            return
        }
    })
}
function setShowApplication(isactive: boolean, itemObj: ItemsModulePages, nav:HTMLUListElement){
    const liAppp = itemObj.app_element(nav) as HTMLLIElement;
    isactive
        ? liAppp.dataset.hidden = 'false'
        : liAppp.dataset.hidden = 'true';
}
function loadEventsPages(container: HTMLElement){
    // Encuentra el container de los btnToggle y llama a otra funcion para el evento click
    const containerPagesModule = container.querySelector('.mc-content-grid.content-grid-pages') as HTMLDivElement
    containerPagesModule === null || containerPagesModule === undefined
        ? console.log("ERROR: No se pudo cargar los eventos para este modulo, el container PAGES no existe o no se identifica")
        : containerPagesModule.addEventListener('click', btnClickedPages)
}
function btnClickedPages(e: MouseEvent){
    const nav = document.querySelector('.dropdown_ul.dropdown_app') as HTMLUListElement
    const target = e.target as HTMLDivElement
    const isBtnToggle = target.classList.contains('box-toggle')
    const storeModulesPages = JSON.parse(localStorage.getItem('show-modules-page') || '[]') as string[]
    const arrPagesApp = Object.values(CONFIG_PAGES_MODULE)
    if(isBtnToggle){
        const toggleID:ItemsModulePages = arrPagesApp.find((module:ItemsModulePages) => module.btn_id === target.id)
        const indexStoreModulePages = storeModulesPages.indexOf(toggleID.item)
        if(indexStoreModulePages === -1){
            storeModulesPages.push(toggleID.item)
            target.classList.add(`${toggleID.btn_class}--active`)
            setShowApplication(true, toggleID, nav)
        }
        else{
            storeModulesPages.splice(indexStoreModulePages, 1)
            target.classList.remove(`${toggleID.btn_class}--active`)
            setShowApplication(false, toggleID, nav)
        }
        localStorage.setItem('show-modules-page', JSON.stringify(storeModulesPages))
        return
    }
}

// *************** INCIALIZANDO CONTENIDO LA PAGINA ****************
export function getEvents(section: HTMLElement){
    const divAlert = document.querySelector('.alert') as HTMLDivElement
    const configModuleslUL = section.querySelector('.config_panel-ul') as HTMLUListElement
    const configContentSection = section.querySelector('.main-config-content') as HTMLElement
    const navPageApp = document.querySelector('.dropdown_ul.dropdown_app') as HTMLUListElement

    setFocusLi(false, configModuleslUL, configContentSection, null)
    configModuleslUL.addEventListener('click', (e:MouseEvent) => {
        const isLiElement = (e.target as HTMLLIElement) && 
                            (e.target as HTMLLIElement).dataset.class === 'config_panel-li';
        const isHideLiElement = isLiElement && 
                                (e.target as HTMLLIElement).dataset.show === 'hidden';
                                
        if(isLiElement && !isHideLiElement){
            const dataActionLi = (e.target as HTMLLIElement).dataset.action as string;
            const searchContentModule:AttrConfigPanel = getDataActionListPanel(CONFIG_PANEL_NAV, dataActionLi)
            return setFocusLi(true, configModuleslUL, configContentSection, searchContentModule);
        }
        if(isLiElement && isHideLiElement){
            return createAlert(divAlert, MESSAGE_TYPE.NO_DISPONIBLE, ALERT_TYPE.TEMP.info, [], 2500)
        }
    })

    const configModuleStorage = localStorage.getItem('config-module')
    const isContentPagesRender = configContentSection.querySelector('div.content-grid-pages') !== null
    // CONTROLAR LOS ERRORES SI NO SE RENDERIZA LA VISTA
    const errorRender = ControlErrorModulePages(configModuleStorage,isContentPagesRender);
    if(errorRender.isERROR){
        createAlert(divAlert, errorRender.msg, ALERT_TYPE.FATAL,[],2900)
        return
    }
    // SE CARGAN LAS FUNCIONES AL INICIAR LA PAGINA CONFIG
    if(configModuleStorage === 'module-home'){
        console.log("No action for this module");
        return
    }
    if(configModuleStorage === 'module-pages' && isContentPagesRender){
        const containerPagesModule = configContentSection.querySelector('.mc-content-grid.content-grid-pages') as HTMLDivElement
        containerPagesModule !== null 
            ? (setClassActiveBtnPagesDefault(containerPagesModule, navPageApp),
                loadEventsPages(configContentSection))
            : null
        return
    }
}
