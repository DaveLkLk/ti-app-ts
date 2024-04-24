const divAlert = document.querySelector('.alert') as HTMLDivElement

// DICTIONARY
export const titleList = {
    DEFAULT: "En esta sección puedes modificar los ajustes predeterminados que ofrece la aplicación ",
    PAGES: {
        1: "Mostrar/Ocultar páginas",
        2: "Seguridad de página"
    },
    UI: "Personalizar colores de página",
    API: "Integrar API de terceros"
}

// COMPONENETES
export function createTitleComponent(str:string){
    const div = document.createElement('div')
    div.classList.add('mc-content-title')
    div.innerHTML = `
        <h3>${str}</h3>
    `;
    return div;
}
function updatePageConfigContent(element:HTMLDivElement){
    element.innerHTML = "hola"
}

export function getEvents(section: HTMLElement){
    const divAlert = document.querySelector('.alert') as HTMLDivElement
    const container = section.querySelector('.main-config-content')
    
    document.addEventListener('DOMContentLoaded', ()=>{
        console.log(container);
    })
}