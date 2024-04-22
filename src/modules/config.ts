import '../../public/css/modules/config.css'


function pageConfigPanel(){
    const div = document.createElement('div');
    div.classList.add('main-config-panel')
    div.innerHTML = `
        <ul class="config_panel-ul">
            <li class="config_panel-li" data-action="process">Pages</li>
            <li class="config_panel-li" data-action="process">UI</li>
            <li class="config_panel-li" data-action="process">APIs</li>
        </ul>
    `;
    return div;
}
function pageConfigContent(){
    const div = document.createElement('div')
    div.classList.add('main-config-content')
    div.innerHTML = `
        <h4>loremm ipsum dolor sit consectetur ad abismal imploree</h4>
    `;
    return div;
}

export function sectionPageConfiguration(){
    const section = document.createElement('section')
    section.classList.add('main_content')
    section.classList.add('main_config-container')
    section.appendChild(pageConfigPanel())
    section.appendChild(pageConfigContent())
    return section;
} 