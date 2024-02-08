import { createAlert, ALERT_TYPE, MESSAGE_TYPE } from "../../components/alert.ts";
import { getTextPaste, setClipboard } from "../../rules/functions.ts";
import { clearText, typeStyleText, validateResponse, formElements } from "../../rules/functions.ts";
import { elementAnimation, clearSpaceActive, clearStyles, addLocalStorage } from "../../rules/functions.ts";
import { TypeOption } from "../../rules/types.ts";

const divAlert = document.querySelector('.alert') as HTMLElement;

export const stylesLocalStorage = {
  STYLES_BLOQUED: 'style-bloqued',
  BTN_CLEAR: 'btn-clear'
}




function pasteText(btn:HTMLButtonElement, element:(HTMLInputElement | HTMLTextAreaElement), section:HTMLElement){
  btn.addEventListener('click', async () => {
    try {
      const textPaste = await getTextPaste()

      if(textPaste.err && textPaste?.err?.length > 0){
        createAlert(divAlert, textPaste.err, ALERT_TYPE.ERROR, formElements(section).formData,2500);
        return
      }
      if(textPaste.msg && textPaste?.msg?.length > 0){
        element.value = textPaste.msg;
      }
    } catch (error:any) {
      createAlert(divAlert, error.error, ALERT_TYPE.ERROR, [],2500);
      console.log(error)
    }
  })
}

export function getEvents(section:HTMLElement){
  const formText = section.querySelector('#form_text') as HTMLFormElement;
  const textOutput = section.querySelector('#text_output') as (HTMLTextAreaElement | HTMLInputElement);
  const btnCopy = section.querySelector('#btn_copy') as HTMLButtonElement;
  const btnPaste = section.querySelector('#btn_paste') as HTMLButtonElement;
  
  const btnLockStyles = section.querySelector('#btn_lock_styles') as HTMLButtonElement;
  const btnStyleAction = section.querySelector('#btn_styles') as HTMLButtonElement;
  const containerCfgStyle = section.querySelector('#cfg-styles') as HTMLButtonElement;
  const btnClearSpace = section.querySelector('#btn_clear-space') as HTMLButtonElement;

  pasteText(btnPaste, formElements(section).input, section)

  const lockActive = window.localStorage.getItem(stylesLocalStorage.STYLES_BLOQUED)
  if(lockActive === 'true'){
    const clearActive = window.localStorage.getItem(stylesLocalStorage.BTN_CLEAR)
    clearActive === 'true' ? btnClearSpace.classList.add(`${btnClearSpace.dataset.class}--active`) : null
    btnLockStyles.classList.add(`${btnLockStyles.dataset.class}--active`)
  }

  function validateElementActive(element:HTMLElement, msg:string, showAlert:boolean = true){
    const classActive = `${element.dataset.class}--active`;
    element.classList.toggle(classActive);

    const isActive = element.classList.contains(`${element.dataset.class}--active`);
    if(isActive){
      element.setAttribute('title', 'bloqueado')
      showAlert ? createAlert(divAlert, msg, ALERT_TYPE.TEMP.success, [], 1100) : null;
    }
    else if(isActive === false){
      element.setAttribute('title', 'desbloqueado')
    }
    return isActive
  }

  
  formText.addEventListener('submit', e =>{
    e.preventDefault();
    if(formElements(section).inputValue === ''){
      createAlert(divAlert, MESSAGE_TYPE.INFO_VACIO, ALERT_TYPE.INFO, formElements(section).formData); // ???????????????????????????
      elementAnimation(formElements(section).input, 'text_input--active', 900)
      return
    }
    const text = formElements(section).inputValue as string;
    const option = formElements(section).optionValue as string;
    const Output = new OutputText(text, option);
    const result = Output.validateOption();
    textOutput.value = result;
    clearSpaceActive(btnClearSpace, textOutput);
    // estilos al textarea de salida
    textOutput.style.height = 'auto';
    textOutput.style.height = (textOutput.scrollHeight) + 'px';
  })
  
  formText.addEventListener('reset', () =>{
    textOutput.value = '';
    textOutput.style.height = '32px';
  
    const dataClassLock = btnLockStyles.dataset.class;
    const isBtnLockActive = btnLockStyles.classList.contains(`${dataClassLock}--active`);
    !isBtnLockActive ? clearStyles(containerCfgStyle, textOutput) : null
    
    if(formElements(section).inputValue === ''){
      elementAnimation(formElements(section).input, 'text_input--active', 900)
      createAlert(divAlert, MESSAGE_TYPE.CLEAR_NULL, ALERT_TYPE.TEMP.info, formElements(section).formData, 1000)
    }else{
      createAlert(divAlert, MESSAGE_TYPE.FORM_CLEAR, ALERT_TYPE.TEMP.default, formElements(section).formData, 700)
      }
  })
   // mejorar aqui
   btnCopy.addEventListener('click', async() =>{
    if(textOutput.value === ''){
      createAlert(divAlert, MESSAGE_TYPE.COPY_NULL, ALERT_TYPE.TEMP.info, [], 1100)
      return
    }
    const stateRes = await setClipboard(textOutput.value);
    validateResponse(stateRes);
    createAlert(divAlert, MESSAGE_TYPE.COPY, ALERT_TYPE.TEMP.success, [], 1000);
  })
  
  btnStyleAction.addEventListener('click', () =>{
    btnStyleAction.classList.toggle(`${btnStyleAction.dataset.class}--active`);
  })
  // ESTILOS AL TEXTO DE RESULTADO
  typeStyleText(containerCfgStyle, textOutput)
  
  btnLockStyles.addEventListener('click', ()=>{
    const isActive = validateElementActive(btnLockStyles, MESSAGE_TYPE.LOCK_STYLES);
    addLocalStorage(stylesLocalStorage.STYLES_BLOQUED, String(isActive))
  })
  btnClearSpace.addEventListener('click', e => {
    // e.target.classList.toggle(`${e.target.dataset.class}--active`)
    const clearActive = validateElementActive(e.target as HTMLElement, '', false)
    clearSpaceActive(e.target as HTMLElement, textOutput as HTMLTextAreaElement);
    addLocalStorage(stylesLocalStorage.BTN_CLEAR, String(clearActive))
  })
  document.addEventListener('click', e =>{
    const target = e.target as (HTMLElement | HTMLInputElement | HTMLButtonElement)
    if(!containerCfgStyle.contains(target) && !btnStyleAction.contains(target)){
      btnStyleAction.classList.remove(`${btnStyleAction.dataset.class}--active`);
    }
  })
}
  class OutputText {
    text:string;
    option:string;
    constructor(txt:string, opt:string){
      this.text = txt,
      this.option = opt
    }
    textNormal():string {
      const txtCleared = clearText(this.text).SPACES;
      const textResult = txtCleared.toLowerCase().replace(/^\w/, match => match.toUpperCase());
      return textResult+"."
    }
    textCapitalize():string{
      return this.text.toLowerCase().replace(/\b\w/g, function(match) {
        return match.toUpperCase();
      });
    }
    validateOption(): string{
      const txtValue = this.text;
      const optValue = this.option;
      const typeOptions:TypeOption = {
        text_upper: (txt) => txt.toUpperCase(),
        text_lower: (txt) => txt.toLowerCase(),
        text_capital: () => this.textCapitalize(),
        text_normal: () => this.textNormal()
      };

      const selectedOption = typeOptions[optValue];

    if (typeof selectedOption === 'function') {
      const result = selectedOption(txtValue);
      return result;
    } else {
      throw new Error("Invalid text type");
    }
    }
  }