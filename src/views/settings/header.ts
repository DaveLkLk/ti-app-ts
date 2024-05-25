import { titleList } from "../../modules/settings/@config";
import { LabelBtnToggle } from "../../components/btnToggle";

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
export function createPagesModule(){
    const div = document.createElement('div')
    div.innerHTML = `
        ${createTitleComponent(titleList.PAGES[1]).outerHTML}
        <div class="mc-content-grid content-grid-pages">
            <div class="content-grid-item" data-active="false">
                ${LabelBtnToggle({span: "Mostrar Text-app", btnId: "toggle-text-style"}).outerHTML}
            </div>
            <div class="content-grid-item" data-active="false">
                ${LabelBtnToggle({span: "Mostrar Text-crud", btnId: "toggle-text-crud"}).outerHTML}
            </div>
            <div class="content-grid-item" data-active="true">
                ${LabelBtnToggle({span: "Mostrar Anexos", btnId: "toggle-anexo-untels"}).outerHTML}
            </div>
            <div class="content-grid-item" data-active="true">
                ${LabelBtnToggle({span: "Mostrar Directivos", btnId: "toggle-directivo-untels"}).outerHTML}
            </div>
        </div>
    `;
    return div.innerHTML
}
export function createUIModule(){
    const div = document.createElement('div')
    div.innerHTML = ' HOLA UI'
    return div.innerHTML
}
export function createAPIModule(){
    const div = document.createElement('div')
    div.innerHTML = ' HOLA API'
    return div.innerHTML
}