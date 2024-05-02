import '../../public/css/modules/config.css'
import '../../public/css/components/label-toggle.css'
import { svgChevronDown, svgConfig } from '../components/Icons';
import { getEvents, createHomeModule } from './events/_config';

function pageConfigPanel(){
    const main = document.createElement('main');
    main.classList.add('main-config-panel')
    main.innerHTML = `
        <h2 class="config_panel-title">
        <icon class="btn_icon">${svgConfig()}</icon>
        Settings</h2>
        <ul class="config_panel-ul">
            <li class="config_panel-li" data-class="config_panel-li" data-show="active" data-action="module-home">
                <span>Inicio<icon class="btn_icon">${svgChevronDown()}</icon></span>
            </li>
            <li class="config_panel-li" data-class="config_panel-li" data-show="active" data-action="module-pages">
                <span>Pages<icon class="btn_icon">${svgChevronDown()}</icon></span>
            </li>
            <li class="config_panel-li" data-class="config_panel-li" data-show="hidden" data-action="module-ui">
                <span>UI<icon class="btn_icon">${svgChevronDown()}</icon></span>
            </li>
            <li class="config_panel-li" data-class="config_panel-li" data-show="hidden" data-action="module-api">
                <span>APIs<icon class="btn_icon">${svgChevronDown()}</icon></span>
            </li>
        </ul>
    `;
    return main;
}
function pageConfigContent(){
    const section = document.createElement('section')
    section.classList.add('main-config-content')
    section.innerHTML = createHomeModule()
    return section;
}

export function sectionPageConfiguration(){
    const section = document.createElement('section')
    section.classList.add('main_content')
    section.classList.add('main_config-container')
    section.appendChild(pageConfigPanel())
    section.appendChild(pageConfigContent())
    getEvents(section)
    return section;
} 