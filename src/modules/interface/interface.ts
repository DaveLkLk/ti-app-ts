// ---------------PAGE CONFIG
// STRING EN CONFIG PANEL
export interface AttrConfigPanel {
    dataclass: string;
    datashow: string;
    dataaction: string;
    html: Function;
    li: Function;
}
export interface Config_Panel {
    HOME: AttrConfigPanel;
    PAGES: AttrConfigPanel;
    UI: AttrConfigPanel;
    API: AttrConfigPanel;
}
// MODELO PARA CONFIG MODULE PAGES
export interface ItemsModulePages {
    btn_id: string;
    btn_element: Function;
    btn_class: string;
    div_btn_active: string;
    app_element: Function;
    app_class: string;
    app_active: Function;
    item: string;
}
export interface ModulePages {
    TEXT_APP: ItemsModulePages;
    TEXT_CRUD: ItemsModulePages;
    ANEXOS: ItemsModulePages;
    DIRECTIVOS: ItemsModulePages;
}
export interface AppProperties {
    isactive: boolean;
    id: string;
    list: string;
    item_storage: string;
}
export interface DefaultAPP {
    TEXT_APP: AppProperties;
    TEXT_CRUD: AppProperties;
    ANEXOS: AppProperties;
    DIRECTIVOS: AppProperties;
}