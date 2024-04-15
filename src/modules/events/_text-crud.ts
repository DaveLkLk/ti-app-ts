import {createAlert, ALERT_TYPE, MESSAGE_TYPE} from "../../components/alert.ts";
import { setCountIndicator, getTextPaste, clearText, deleteCardTxt } from "../../rules/functions.ts";
import { createCardText } from "../../layouts/Layout.ts";
import { setClipboard, setFixCard, validateResponse, formElements } from "../../rules/functions.ts";
import { ObjectParam } from "../../rules/types.ts";


export function getEvents(section:HTMLElement){
  const divAlert = document.querySelector('.alert') as HTMLElement;
  const formCrud = section.querySelector('.form_text-crud') as HTMLFormElement;
  const groupCardText = section.querySelector('.group_data-content') as HTMLElement;
  const indicatorCount = section.querySelector('#indicator-count') as HTMLElement;
//   const indicatorGroup = section.querySelector('#indicator-title') as HTMLElement;
  const updateIndicators: ObjectParam = {
    arr: groupCardText,
    setcount: {element: indicatorCount},
    childrens: () => Array.from(groupCardText.querySelectorAll('.group_data-txt'))
  }
  const crudContent = formCrud.querySelector('#txt_content') as HTMLInputElement;
  const btnCrudPaste = section.querySelector('#btn-form_crud-paste') as HTMLButtonElement;
  const crudTitle = formCrud.querySelector('#txt_title') as HTMLInputElement;
  const crudGroup = formCrud.querySelector('#txt_group') as HTMLInputElement;
  crudGroup.addEventListener('input', ()=>{
    let inpvalue = crudGroup.value;
    let maxCharacter = 18
    if(inpvalue.length > maxCharacter){
      crudGroup.value = inpvalue.slice(0, maxCharacter);
    }
  })
    btnCrudPaste.addEventListener('click', async () =>{
    const text = await getTextPaste()
    if(text.err && text?.err?.length > 0){
        createAlert(divAlert, text.err, ALERT_TYPE.ERROR, formElements(section).formData,2500);
        return
    }else{
        crudContent.value = String(text.msg);
    }
    })

    formCrud.addEventListener('submit', (e)=>{
    e.preventDefault();
    const txtTitle = crudTitle.value;
    const txtContent = crudContent.value;
    const txtGroup = crudGroup.value;

    // SANITIZACION DE LOS DATOS
    const clearTitle = clearText(txtTitle).SPACES;
    const clearContent = clearText(txtContent).SPACES;
    const cleaGroup = clearText(txtGroup).SPACES;
    if(clearTitle === '' || clearContent === '' || cleaGroup === ''){
        createAlert(divAlert, MESSAGE_TYPE.INFO_VACIO, ALERT_TYPE.INFO, []);
    }
    else{
        const objForm = {
        title: clearText(txtTitle).SPACES,
        content: txtContent,
        group: clearText(txtGroup).LOWER_NO_SPACES,
        cardLenght: Array.from(groupCardText.children).length + 1
        }
        groupCardText.innerHTML += createCardText(objForm).outerHTML;
        console.log(updateIndicators);
        setCountIndicator(updateIndicators)
        formCrud.reset();
    }
    })

    groupCardText.addEventListener('click', async (e:MouseEvent) =>{
        const targetElement = e.target as HTMLElement
        const isLabel = targetElement && targetElement.classList.contains('label-btn')
        if(isLabel){
            const containerLabel = targetElement && (targetElement.parentNode?.parentNode as HTMLElement);
            const parentClass = containerLabel.dataset.class;
            const listCardsGroup = updateIndicators.childrens && updateIndicators.childrens()
            if(containerLabel.classList.contains(`${parentClass}--active`)){
            containerLabel.classList.toggle(`${parentClass}--active`, false);
            return
            }
            listCardsGroup.forEach((card: HTMLElement) => card.classList.remove(`${parentClass}--active`))
            containerLabel.classList.toggle(`${parentClass}--active`)
            return
        }
        const isBtnDelete = targetElement.tagName === 'BUTTON' && targetElement.getAttribute('data-for') === 'deleteCard';
        if(isBtnDelete){
            deleteCardTxt(groupCardText, targetElement.id)
            setCountIndicator(updateIndicators)
            return
        }
        const isBtnCopy = targetElement.tagName === 'BUTTON' && targetElement.getAttribute('data-for') === 'copyContent'
        if(isBtnCopy){
            const parent = targetElement.parentNode?.parentNode as HTMLElement
            const content = (parent.querySelector('.tooltip-content')?.textContent as string)
            const stateCopy = await setClipboard(content)
            validateResponse(stateCopy)
            return
        }
        const isBtnFixed = targetElement && targetElement.tagName === 'BUTTON' && targetElement.getAttribute('data-for') === 'pinCard'
        if(isBtnFixed){
            const parent = targetElement && targetElement.parentNode?.parentNode as HTMLElement
            const objFix:ObjectParam = {
            title: {element: parent.querySelector('.tooltip-title') as HTMLElement},
            content: {element: parent.querySelector('.tooltip-content') as HTMLElement},
            group: {element: targetElement && targetElement.closest('.card_group') as HTMLElement},
            fixTitle: {element: targetElement && targetElement.closest('.card_group')?.querySelector('#fix-data-title') as HTMLElement},
            fixContent: {element: targetElement && targetElement.closest('.card_group')?.querySelector('#fix-data-text') as HTMLElement},
            }
            setFixCard(objFix)
            createAlert(divAlert, MESSAGE_TYPE.PIN_SUCCESS, ALERT_TYPE.TEMP.success, [], 900)
        }
    })
    
    document.addEventListener('click', (e:MouseEvent) =>{
    // Ocultar el modal style si pierde el focus
    const targetElement = e.target as HTMLElement
    const isLabelBtn = targetElement.classList.contains('label-btn')
    if(!isLabelBtn){
        const parentsLabelBtn = updateIndicators.childrens && updateIndicators.childrens();
        parentsLabelBtn.forEach((parent:HTMLElement) =>{
        parent.classList.remove(`${parent.dataset.class}--active`);
        })
    }
    })
    document.addEventListener('DOMContentLoaded', ()=>{
    setCountIndicator(updateIndicators)
    console.log("dom content loaded");
    })
}