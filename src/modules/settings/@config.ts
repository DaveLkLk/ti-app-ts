import { DefaultAPP, ModulePages } from "../interface/interface";
import { createHomeModule, 
        createPagesModule, 
        createUIModule, 
        createAPIModule } from "../../views/settings/header";
import { Config_Panel } from "../interface/interface";

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

export const CONFIG_PANEL_NAV:Config_Panel = {
    HOME: {
        dataclass: 'config_panel-li',
        datashow: 'active',
        dataaction: 'module-home',
        html: createHomeModule,
        li: (container: HTMLUListElement) => container.querySelector<HTMLLIElement>('li[data-action="module-home"]') as HTMLLIElement,  
    },
    PAGES: {
        dataclass: 'config_panel-li',
        datashow: 'active',
        dataaction: 'module-pages',
        html: createPagesModule,
        li: (container: HTMLUListElement) => container.querySelector('li[data-action="module-pages"]') as HTMLLIElement,  
    },
    UI: {
        dataclass: 'config_panel-li',
        datashow: 'hidden',
        dataaction: 'module-ui',
        html: createUIModule,
        li: (container: HTMLUListElement) => container.querySelector('li[data-action="module-ui"]') as HTMLLIElement,  
    },
    API: {
        dataclass: 'config_panel-li',
        datashow: 'hidden',
        dataaction: 'module-api',
        html: createAPIModule,
        li: (container: HTMLUListElement) => container.querySelector('li[data-action="module-api"]') as HTMLLIElement,  
    }
};

export const CONFIG_PAGES_MODULE: ModulePages = {
    TEXT_APP: {
        btn_id: 'toggle-text-style',
        btn_element: (container:HTMLDivElement)=> container.querySelector(`#toggle-text-style`) as HTMLDivElement,
        btn_class: 'box-toggle',
        div_btn_active: 'false',
        app_element: (nav:HTMLUListElement) => nav.querySelector('li[data-page="text-style"]') as HTMLLIElement,
        app_class: 'dropdown_li',
        app_active: (nav:HTMLUListElement)=> nav.querySelector<HTMLLIElement>('li[data-page="text-style"]')?.dataset.active as string,
        item: 'text-style'
    },
    TEXT_CRUD: {
        btn_id: 'toggle-text-crud',
        btn_element: (container:HTMLDivElement)=> container.querySelector(`#toggle-text-crud`) as HTMLDivElement,
        btn_class: 'box-toggle',
        div_btn_active: 'false',
        app_element: (nav:HTMLUListElement) => nav.querySelector('li[data-page="text-crud"]') as HTMLLIElement,
        app_class: 'dropdown_li',
        app_active: (nav:HTMLUListElement)=> nav.querySelector<HTMLLIElement>('li[data-page="text-crud"]')?.dataset.active as string,
        item: 'text-crud'
    },
    ANEXOS: {
        btn_id: 'toggle-anexo-untels',
        btn_element: (container:HTMLDivElement)=> container.querySelector(`#toggle-anexo-untels`) as HTMLDivElement,
        btn_class: 'box-toggle',
        div_btn_active: 'true',
        app_element: (nav:HTMLUListElement) => nav.querySelector('li[data-page="anexo-untels"]') as HTMLLIElement,
        app_class: 'dropdown_li',
        app_active: (nav:HTMLUListElement)=> nav.querySelector<HTMLLIElement>('li[data-page="anexo-untels"]')?.dataset.active as string,
        item: 'anexo-untels',
    },
    DIRECTIVOS: {
        btn_id: 'toggle-directivo-untels',
        btn_element: (container:HTMLDivElement)=> container.querySelector(`#toggle-directivo-untels`) as HTMLDivElement,
        btn_class: 'box-toggle',
        div_btn_active: 'true',
        app_element: (nav:HTMLUListElement) => nav.querySelector('li[data-page="directivo-untels"]') as HTMLLIElement,
        app_class: 'dropdown_li',
        app_active: (nav:HTMLUListElement)=> nav.querySelector<HTMLLIElement>('li[data-page="directivo-untels"]')?.dataset.active as string,
        item: 'directivo-untels',
    }
}
export function ControlErrorModulePages(itemLS: string | null, isContentValid: boolean){
    let isERROR = false;
    let msg = ''
    if(itemLS === null && !isContentValid){
        isERROR = true;
        msg = 'ERROR no existe ningun elemento que rendereizar'
    }
    return {isERROR, msg};
}