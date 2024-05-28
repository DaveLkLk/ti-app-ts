import '../../public/css/modules/directivo.css'
import '../../public/css/components/layouts.css';
import { getEvents } from "../modules/events/_directivos.ts";
import { svgEyes, svgLupa } from "../components/Icons.ts";
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
        <div class="box_item directivo_group-search">
            <div class="box_search-config">
                ${LabelBtnToggle({btnId:'search-drt-dynamic',span:'Búsqueda dinámica'}).outerHTML}
                ${LabelBtnToggle({btnId:'search-dependency',span:'Buscar por dependencia'}).outerHTML}
            </div>
            <form class="form_search form-panel" id="directivo-form-search" data-class="form_search">
            <div class="form_group">
                <button type="button" class="btn-view-data btn-view-directivos" title="Mostrar todos los directivos">
                    <icon class="btn_icon">${svgEyes()}</icon>
                </button>
                <div class="form_group">
                    <div class="form_group-row">
                        <input type="search" id="directivo-inp-search" placeholder="buscar funcionario.." class="form_input" autocomplete="off" title="escribe aqui..">
                        <button class="btn_icon btn_fixed" type="submit" id="directivo-btn-search" title="buscar.." data-class="btn_fixed">
                        ${svgLupa()}
                        </button>
                    </div>
                </div>
            </div>
            </form>
            <div class="box_search-indicator">
                <h2 id="directivo-result-indicator" class="indicator_count" title="número de resultados">-</h2>
                <p>resultados</p>
            </div>
        </div>
        <div class="directivo_item directivo_group-result">
            <div class="directivo_result"></div>
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