import { svgBuilding, svgConfig, svgCopy, svgDelete, svgEmail, svgPin, svgUser } from '../components/Icons.ts';
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
      <button class="btn_icon btn_copy-paste" type="button" data-for="copyContent" title="copiar contenido">
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
  const email1 = obj.correo?.general;
  const email2 = obj.correo?.personal === null 
    ? '<span class="null">vacio</span>'
    : `<a target="_blank" href="mailto:${obj.correo?.personal}">${obj.correo?.personal}</a>`;
  const div = document.createElement('div');
  div.classList.add('directivo_result-card')
  div.title = 'id: '+obj.id
  div.id = `directivo-card-${tagId}`;
  div.innerHTML = `
    <div class="card_animate">
      <div class="directivo_data">
        <span class="directivo_tag directivo-name">
          <icon class="btn_icon">${svgUser()}</icon> ${obj.nombre}</span>
        <span class="directivo_tag directivo-cargo">
          <icon class="btn_icon">${svgConfig()}</icon> ${obj.cargo}</span>
        <hr/>
        <span class="directivo_tag directivo-dependencia">
          <icon class="btn_icon">${svgBuilding()}</icon>
          ${obj.dependencia}</span>
      </div>
      <div class="directivo_email">
        <span class="directivo_tag directivo-correo-general" title="clic para copiar">
          <icon class="btn_icon">${svgEmail()}</icon>
          <a target="_blank" href="mailto:${email1}">${email1}</a>
        </span>
        <span class="directivo_tag directivo-correo-personal" title="clic para copiar">
          <icon class="btn_icon">${svgEmail()}</icon>
          ${email2}
        </span>
      </div>
    </div>
  `;
// DEFINIR LA SALIDA QUE TENDRA ESTE OBJETO 
  return div;
}