import { createAlert, ALERT_TYPE, MESSAGE_TYPE } from "../../components/alert";
import { getDependency, getName } from "../../data/directivos";
import { createDirectiveCard } from "../../layouts/Layout";
import { addLocalStorage, setClipboard } from "../../rules/functions";

export const anexoLocalStorage = {
    SEARCH_DINAMYC: 'search-drt-dinamyc',
    SEARCH_DEPENDENCY: 'search-dependency'
}
const typeRequest = {
    nm: 'name',
    dpd: 'dependency'
}
export function getEvents(section: HTMLElement){
    const divAlert = document.querySelector(".alert") as HTMLElement;
    const formSearch = section.querySelector('#directivo-form-search') as HTMLFormElement;
    const InpSearch = section.querySelector('#directivo-inp-search') as HTMLInputElement;
    const BtnSearch = section.querySelector('#directivo-btn-search') as HTMLButtonElement;
    const BtnDynamic = section.querySelector('#search-drt-dynamic') as HTMLDivElement;
    const BtnDpendency = section.querySelector('#search-dependency') as HTMLDivElement;
    const indicatorFound = section.querySelector('#directivo-result-indicator') as HTMLElement;
    const resultSearch = section.querySelector('.directivo_result') as HTMLDivElement;
    
    let switchDynamic = false;
    let switchDependency = false;

    function validateType(type:string, boolean:Boolean) {
        if(type === '') return
        if(boolean){
            if(type === typeRequest.nm) switchDynamic = true
            if(type === typeRequest.dpd) switchDependency = true
        }
        if(!boolean){
            if(type === typeRequest.nm) switchDynamic = false
            if(type === typeRequest.dpd) switchDependency = false
        }
    }
    function validateElementActive(element:HTMLElement, msg:string, type:string){
        const isActive = element.classList.contains(`${element.dataset.class}--active`)
        if(isActive){
            msg.length > 0 ? createAlert(divAlert, msg, ALERT_TYPE.TEMP.success, [], 1300) : null
        }
        validateType(type, isActive)
        return isActive
    }
    function searchActive(type:string){
        const targetInput = InpSearch.value.toLowerCase();
        resultSearch.innerHTML = '';
        if (targetInput === '') {
            indicatorFound.textContent = '-'
            return;
        }
        const matchingItems = type === typeRequest.nm ? getName(targetInput) : getDependency(InpSearch.value);
        if(matchingItems && matchingItems.length === 0){
            indicatorFound.textContent = '0'
            resultSearch.innerHTML = `
            <div class="office_result-card">
                <p class="not_found">No se econtraron resultados..</p>
            </div>
            `;
            return
        }
        indicatorFound.textContent = matchingItems ? matchingItems.length.toString() : null
        matchingItems && matchingItems.forEach((item:any) => {
            resultSearch.innerHTML += createDirectiveCard(item).outerHTML;
        });
        emailContext() /* AQUI SE LLAMA A LA FUNCION PARA DETECTAR LOS EMAILS MOSTRADOS POR EVENTO*/
    }

    const dynamicStorage = () => localStorage.getItem(anexoLocalStorage.SEARCH_DINAMYC)
    const dpdStorage = () => localStorage.getItem(anexoLocalStorage.SEARCH_DEPENDENCY)
    if(dynamicStorage() === 'true'){
        BtnDynamic.classList.toggle(`${BtnDynamic.dataset.class}--active`)
        switchDynamic = true
    }
    if(dpdStorage() === 'true'){
        BtnDpendency.classList.toggle(`${BtnDpendency.dataset.class}--active`)
        switchDependency = true
    }

    BtnDynamic.addEventListener('click', ()=>{
        BtnDynamic.classList.toggle(`${BtnDynamic.dataset.class}--active`)
        const isActive = validateElementActive(BtnDynamic, MESSAGE_TYPE.SEARCH_DINAMYC, typeRequest.nm)
        addLocalStorage(anexoLocalStorage.SEARCH_DINAMYC, String(isActive))
    })
    BtnDpendency.addEventListener('click', ()=>{
        BtnDpendency.classList.toggle(`${BtnDpendency.dataset.class}--active`)
        const isActive = validateElementActive(BtnDpendency, 'Búsqueda por dependencia activado', typeRequest.dpd)
        addLocalStorage(anexoLocalStorage.SEARCH_DEPENDENCY, String(isActive))
    })
    
    formSearch.addEventListener('submit', async (e:any)=>{
        e.preventDefault();
        if(InpSearch.value === ''){
            indicatorFound.textContent = '-'
            resultSearch.innerHTML = '';
            createAlert(divAlert, MESSAGE_TYPE.INFO_VACIO, ALERT_TYPE.TEMP.info, [], 1800)
            return
        }
        formSearch.classList.add(`${formSearch.dataset.class}--active`)
        BtnSearch.classList.add(`${BtnSearch.dataset.class}--active`)
        setTimeout(()=>{
            formSearch.classList.remove(`${formSearch.dataset.class}--active`)
            BtnSearch.classList.remove(`${BtnSearch.dataset.class}--active`)
        }, 200)

        if(switchDynamic === true) return
        if(switchDynamic === false){
            switchDependency 
                ? searchActive(typeRequest.dpd)
                : searchActive(typeRequest.nm)
        }
    })
    InpSearch.addEventListener('input', ()=>{
        if(switchDynamic === false){
            return
        }else{
            switchDependency ? searchActive(typeRequest.dpd) : searchActive(typeRequest.nm)
        }
    })
    // DETECTAR EL CLIC AL EMAIL PARA COPIARLO AL PORTAPAPELES
    async function emailClicked (e:MouseEvent){
        e.preventDefault()
        if((e.target as HTMLElement).tagName && (e.target as HTMLElement).tagName === 'A'){
            const textValue = (e.target as HTMLAnchorElement).textContent as string
            const resultClipBoard = await setClipboard(textValue)
            resultClipBoard.success 
                ? createAlert(divAlert, (resultClipBoard.msg as string), ALERT_TYPE.TEMP.success, [], 1100)
                : createAlert(divAlert, (resultClipBoard.err as string), ALERT_TYPE.TEMP.error, [], 1000)
        }
        else if((e.target as HTMLElement).tagName && (e.target as HTMLElement).tagName === 'SPAN'){
            createAlert(divAlert, "No se encontró email", ALERT_TYPE.TEMP.info, [], 1300)
        }
    }
    function emailContext(){
        const emailGroupContainer = Array.from(document.querySelectorAll<HTMLDivElement>('.directivo_email'))
        emailGroupContainer.forEach((emailContainer) => {
            emailContainer.addEventListener('click', emailClicked)
        })
    }
    return
}
