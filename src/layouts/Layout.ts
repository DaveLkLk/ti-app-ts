import { svgCopy, svgDelete, svgPin } from '../components/Icons.ts';
import { generateId } from '../rules/functions.ts'
import { CardTextParam, DirectivoCard, OfficeCardParam } from '../rules/types.ts';

export function createCardText(obj:CardTextParam) {
  const tagId = generateId();
  const cardId = `card_groupname:${obj.group}:${tagId}`;
  const cardText = document.createElement('div');
  cardText.id = cardId;
  cardText.classList.add('group_data-txt')
  cardText.setAttribute('data-class', 'group_data-txt')
  // ESTABLECER LOS DATOS
  cardText.innerHTML = `
    <div class="form_group-col4">
      <span class="label-line label-btn" data-for="button" title="click para mostrar contenido">${obj.title}</span>
      <button class="btn_icon btn_fixed" id="${cardId}-fix" data-for="pinCard" title="fijar elemento">
        ${svgPin()}
      </button>
      <button class="btn_icon btn_copy" type="button" data-for="copyContent" title="copiar contenido">
        ${svgCopy()}
      </button>
      <button class="btn_icon btn_delete" id="${cardId}" data-for="deleteCard" title="eliminar título">
        ${svgDelete()}
      </button>
    </div>
    <div class="data_txt-tooltip">
      <div class="tooltip_container">
        <h3 class="tooltip-title">${obj.title}</h3>
        <p class="tooltip-content">${obj.content}</p>
      </div>
    </div>
  `;
  return cardText;
}
export function createOfficeCard(obj:OfficeCardParam){
  const tagId = generateId();
  const div = document.createElement('div')
  div.classList.add('office_result-card')
  div.title = `id: ${obj.id}`
  div.id = `office-card-${tagId}`;
  div.innerHTML = `
    <div class="anexo_container">
      <span class="anexo" title="anexo">${obj.anexo}</span>
    </div>
    <div class="oficina_container">
      <span class="oficina" title="oficina">${obj.office}</span>
    </div>
  `;
  return div
}
export function createDirectiveCard(obj:DirectivoCard){
  const tagId = generateId();
  const div = document.createElement('div');
  div.classList.add('directivo_result-card')
  div.title = 'id: '+obj.id
  div.id = `directivo-card-${tagId}`;
  div.innerHTML = `
    <div class="directivo_container">
      <span id="directivo-name">${obj.nombre}</span>
      <span id="directivo-cargo">${obj.cargo}</span>
      <span id="directivo-dependencia">${obj.dependencia}</span>
    </div>
    <div>
      <span id="directivo-correo-general">${obj.correo?.general}</span>
      <span id="directivo-correo-personal">${obj.correo?.personal == null ? 'vacio' : obj.correo.personal}</span>
    </div>
  `;
// DEFINIR LA SALIDA QUE TENDRA ESTE OBJETO 
  return div;
}