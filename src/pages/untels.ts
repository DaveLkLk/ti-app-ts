import '../../public/css/modules/untels.css';
import '../../public/css/components/layouts.css';
import { getEvents } from "../modules/events/_untels.ts";
import { svgEyes, svgLupa } from "../components/Icons.ts"
import { LabelBtnToggle } from '../components/btnToggle.ts';

function pageTitleAnexo(){
    const div = document.createElement("div");
    div.classList.add('content_title')
    div.innerHTML = `
        <h1 class="text_title">Anexos UNTELS</h1>
    `;
    return div;
}
function pageContentAnexo(){
    const div = document.createElement('div');
    div.classList.add('content_office')
    div.innerHTML = `
    <!-- BUSQUEDA DE OFICINAS -->
    <div class="box_item office_group-search">
      <div class="box_search-config">
        ${LabelBtnToggle({btnId:'search-anx-dinamyc',span:'Búsqueda dinámica'}).outerHTML}
        ${LabelBtnToggle({btnId:'search-anexo',span:'Búsqueda por Anexo'}).outerHTML}
      </div>
      <form class="form_search form-panel" id="office-form-search" data-class="form_search">
        <div class="form_group">
          <button type="button" class="btn-view-data btn-view-anexos" title="Mostrar todos los anexos">
            <icon class="btn_icon">${svgEyes()}</icon>
          </button>
          <div class="form_group-row">
            <input type="search" id="office-inp-search" placeholder="buscar.." class="form_input" autocomplete="off" title="escribe aqui..">
            <button class="btn_icon btn_fixed" type="submit" id="office-btn-search" title="buscar.." data-class="btn_fixed">
              ${svgLupa()}
            </button>
          </div>
        </div>
      </form>
      <div class="box_search-indicator">
        <h2 id="office-result-indicator" class="indicator_count" title="número de resultados">-</h2>
        <p>resultados</p>
      </div>
    </div>
    <!-- RESPUESTA DE BUSQUEDA DE OFICINAS -->
    <div class="office_item office_group-result">
      <div class="office_result">

      </div>
    </div>
    `;
    return div;
}
export function sectionAnexoUNTELS(){
    const section = document.createElement('section')
    section.classList.add('main_content')
    section.classList.add('main_office-container')
    section.appendChild(pageTitleAnexo())
    section.appendChild(pageContentAnexo())
    getEvents(section)
    return section
}