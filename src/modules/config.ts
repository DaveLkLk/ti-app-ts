import '../../public/css/modules/config.css'
import { svgChevronDown, svgConfig } from '../components/Icons';


function pageConfigPanel(){
    const div = document.createElement('div');
    div.classList.add('main-config-panel')
    div.innerHTML = `
        <h2 class="config_panel-title">
        <icon class="btn_icon">${svgConfig()}</icon>
        Settings</h2>
        <ul class="config_panel-ul">
            <li class="config_panel-li" data-action="process">
                <span>Pages<icon class="btn_icon">${svgChevronDown()}</icon></span>
            </li>
            <li class="config_panel-li" data-action="process">
                <span>UI<icon class="btn_icon">${svgChevronDown()}</icon></span>
            </li>
            <li class="config_panel-li" data-action="process">
                <span>APIs<icon class="btn_icon">${svgChevronDown()}</icon></span>
            </li>
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