import { ObjectBtnToggle } from "../rules/types";

export const LabelBtnToggle = (params:ObjectBtnToggle) => {
    const div = document.createElement('div');
    div.classList.add('label_toggle')
    div.dataset.active = params.dataActive ? params.dataActive : 'label-toggle'
    div.innerHTML = `
        <span>${params.span}</span>
        <div class="box-toggle" id="${params.btnId}" data-class="box-toggle" title="desactivar / activar">
            <div class="circle-toggle"></div>
        </div>
    `;
    return div;
}
export const BtnToggle = (params:ObjectBtnToggle) => {
    const div = document.createElement('div');
    div.classList.add('box-toggle')
    div.id = params.btnId
    div.innerHTML = `<div class="circle-toggle"></div>`;
    return div;
}