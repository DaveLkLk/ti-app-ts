

// INTERFACE DISPLAYeLEMENTS
export interface AttrElement {
    id: string;
    container: HTMLElement | HTMLUListElement;
    attr: string;
    typeattr: string;
}
export interface DisplayElementsApp {
    li: HTMLLIElement;
    navUL: HTMLUListElement;
}
export interface DisplayElementApp {
    idList?: string;
    nav: HTMLUListElement;
    container: HTMLElement;
}
interface AppProperties {
    isactive: boolean;
    id: string;
    list: string;
    item_storage: string;
}
interface DefaultAPP {
    TEXT_APP: AppProperties;
    TEXT_CRUD: AppProperties;
    ANEXOS: AppProperties;
    DIRECTIVOS: AppProperties;
}
export interface MenuConfig {
    e: MouseEvent;
    ulMenu: HTMLUListElement;
    content: HTMLElement;
    alert: HTMLDivElement;
    nav: HTMLUListElement;
}
export const defaultAPP: DefaultAPP = {
    TEXT_APP: {
        isactive: false,
        id: 'show-text-style',
        list: 'text-style',
        item_storage: 'txt-style-show'
    },
    TEXT_CRUD: {
        isactive: false,
        id: 'show-text-crud',
        list: 'text-crud',
        item_storage: 'txt-crud-show'
    },
    ANEXOS: {
        isactive: true,
        id: 'show-anexo-untels',
        list: 'anexo-untels',
        item_storage: 'anexos-show'
    },
    DIRECTIVOS: {
        isactive: true,
        id: 'show-directivo-untels',
        list: 'directivo-untels',
        item_storage: 'directivos-show'
    }
}

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

function searchAttrElement(obj: AttrElement){
    let targetMatch = null;
    const objSearch = {
        data: 'data',
        id: 'id'
    }
    if(obj.attr === objSearch.data){
        targetMatch = obj.container.querySelector(`[data-${obj.typeattr}="${obj.id}"]`) as HTMLElement
    } 
    if(obj.attr === objSearch.id){
        targetMatch = obj.container.querySelector(`#${obj.id}`) as HTMLElement
    }
    return targetMatch
}

export function managerShowApp(isLoaded: boolean, typeModule: string, obj: DisplayElementApp){
    
}
export function validateExistItemStorage(){
    const getItemStorage = Object.values(defaultAPP).map((item:AppProperties) =>{
        if(localStorage.getItem(item.item_storage) === null) return false;
        if(localStorage.getItem(item.item_storage) === undefined) return false;
        return true;
    })
    console.log(getItemStorage);
    return getItemStorage
}

export function clickedToggleContainer(toggleContainer: HTMLElement, nav: HTMLUListElement){
    toggleContainer.addEventListener('click', e => {
        const target = e.target as HTMLDivElement
        const toggleBTN = target.dataset.class !== undefined && target.classList.contains(`${target.dataset.class}`)
        toggleBTN ? changeClassTarget(target, nav) : null
        
    })
}
function changeClassTarget(target: HTMLDivElement, nav: HTMLUListElement){
    const appIDExist = Object.values(defaultAPP).find((i:AppProperties) =>i.id === target.id ? i : null) as AppProperties | undefined
    let toggleActive = `${target.dataset.class}--active`
    const isClassActive = ()=> target.classList.contains(toggleActive)

    console.log(appIDExist);
    if(appIDExist !== null && appIDExist !== undefined){
        const itemStorage = localStorage.getItem(appIDExist.item_storage)
        console.log(itemStorage);
        const isNullStorage = itemStorage === null
        if(isNullStorage) localStorage.setItem(appIDExist.item_storage, String(!isClassActive()))
        if(!isNullStorage && itemStorage === 'true') localStorage.setItem(appIDExist.item_storage, 'false')
        if(!isNullStorage && itemStorage === 'false') localStorage.setItem(appIDExist.item_storage, 'true')
        
        const navItem = searchAttrElement({id: appIDExist.list, container: nav, attr: 'data', typeattr:'page'}) as HTMLLIElement
        if(isClassActive() && typeof navItem === 'object'){
            target.classList.remove(toggleActive)
            navItem.style.display = 'none'
            return
        }
        if(!(isClassActive()) && typeof navItem === 'object'){
            target.classList.add(toggleActive)
            navItem.style.display = 'flex'
            return
        }
        return
    }

}

export function setDefaultStorageItem(){
    Object.values(defaultAPP).forEach((item: AppProperties) => {
        localStorage.setItem(item.item_storage, String(item.isactive))
    })
}
// AL PARECER AL RENDERIZAR SIN INFORMACION DE LA CLASE DEL DIV CONTAINER DLE CONTENT CONFIG, CAUSA UN ERROR DE NO RENDERIZACION DEL CONTENIDO DEL ELEMENTO 
function filterBoxToggle(id: string, container: HTMLElement){
    const btnToggleContainer = container.querySelector('div.mc-content-grid') as HTMLDivElement
    const btnToggle = btnToggleContainer.querySelector(`#${id}`) as HTMLDivElement
    return btnToggle
}
export function changeDisplayElementApp(isPreviewLoaded: boolean, obj: DisplayElementApp){
    if(isPreviewLoaded){
    Object.values(defaultAPP).find((item:AppProperties) =>{
        const btnToggle = filterBoxToggle(item.id, obj.container)
        if(item.isactive && item.id === btnToggle.id){
            btnToggle.classList.add(`${btnToggle.dataset.class}--active`)
        }
        // ACTUALIZA LOS CAMBIOS DESDE LOCALSTORAGE O DESDE LA CONFIGURACION POR DEFECTO
        setListApp(obj)
    })
    return
}
    
}

function setListApp(obj: DisplayElementApp){
    Object.values(defaultAPP).find((item: AppProperties) => {
        const itemStorage = localStorage.getItem(item.item_storage)
        const appUL = searchAttrElement({id: item.list, container: obj.nav, attr: 'data', typeattr:'page'})
        if(itemStorage === null || appUL === null) setDefaultStorageItem()
        if(itemStorage === 'true' && appUL !== null){
            appUL.style.display = 'flex';
            return
        }
        else if(itemStorage === 'false' && appUL !== null){
            appUL.style.display = 'none';
            return
        }
    })
    
    return
}