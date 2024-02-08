import { getEvents } from "./events/_directivos.ts";
import { svgLupa } from "../components/Icons.ts";
import { LabelBtnToggle } from "../components/btnToggle.ts";

function pageTitle(){
    const div = document.createElement("div");
    div.classList.add('content_title')
    div.innerHTML = `
        <h1 class="text_title">Directorio UNTELS</h1>
    `;
    return div;
}
function pageContentDirectivo(){
    const div = document.createElement('div');
    div.classList.add('content_directivos')
    div.innerHTML = `
        <!-- BUSQUEDA DE OFICINAS -->
        <div class="office_item office_group-search">
        <div class="box_search-config">
            ${LabelBtnToggle({btnId:'search-dinamyc',span:'Búsqueda dinámica'}).outerHTML}
            ${LabelBtnToggle({btnId:'search-directivo',span:'Buscar por dependencia'}).outerHTML}
        </div>
        <form class="form_search form-panel" id="office-form-search" data-class="form_search">
            <div class="form_group">
            <div class="form_group-row">
                <input type="search" id="office-inp-search" placeholder="buscar.." class="form_input" autocomplete="off" title="escribe aqui..">
                <button class="btn_icon btn_fixed" type="submit" id="office-btn-search" title="buscar.." data-class="btn_fixed">
                ${svgLupa()}
                </button>
            </div>
            </div>
        </form>
        <div class="office_search-indicator">
            <h2 id="office-result-indicator" class="indicator_count" title="número de resultados">-</h2>
            <p>resultados</p>
        </div>
        </div>
    `;
    return div
}
export function sectionDirectivoUNTELS(){
    const section = document.createElement('section')
    section.classList.add('main_content')
    section.classList.add('main_directivo-container')
    section.appendChild(pageTitle())
    section.appendChild(pageContentDirectivo())
    getEvents(section)
    return section
}