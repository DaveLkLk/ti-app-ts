export type Page = {
    id: string;
    page: Function;
}
export type PageApp = {
    TEXT_STYLE: Page;
    TEXT_CRUD: Page;
    ANX: Page;
    DRCTV: Page;
    NOT_FOUND: Page;
}

export interface AnyInputs {
    disabled?: boolean;
    dataset?: {
        type?:string;
    }
    style?: {
        cursor?: string;
        setProperty?: Function;
    };
    type?: string;
    section?: HTMLElement;
}
export interface ClipBoard {
    err?: (string | null);
    msg?: string;
    success?: (boolean | undefined);
}
export type TypeStyles = {
    bold: string;
    italic: string;
    strike: string;
    underline: string;
  }

  export interface ObjectParam {
    childrens?: Function;
    setcount?: { textContent?: string; element?: HTMLElement };
    fixTitle?: { textContent?: string; element: HTMLElement};
    fixContent?: { textContent?: string; element: HTMLElement};
    title?: { textContent?: string; element?: HTMLElement};
    content?: { textContent?: string; element?: HTMLElement};
    group?: { element?: HTMLElement;}
    success?: (boolean | undefined);
    msg?: string;
    arr?: HTMLElement;
  }
  export interface ObjectBtnToggle {
    span?: string;
    btnId: string;
  }
  export interface StorageParam {
    key?: string;
    value?: (string | null);
  }
  export interface CardTextParam {
    group?: string;
    title?: string;
    content?: string;
  }
  export interface OfficeCardParam {
    id?: string;
    anexo?: string;
    office?: string;
  }

  type TextTransformFunction = (txt: string) => string;
  type GeneralFunction = (TextTransformFunction | (() => string));
  export interface TypeOption {
    text_lower?: TextTransformFunction;
    text_upper?: TextTransformFunction;
    text_capital?: () => string;
    text_normal?: () => string;
    [key: string]: GeneralFunction | undefined;
  }

  export interface eEvent {
    target?: (HTMLDivElement | HTMLInputElement | HTMLLabelElement | HTMLButtonElement | HTMLTextAreaElement);
    tagName?: string;
  }