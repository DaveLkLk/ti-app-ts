import '../../public/css/modules/config.css'
import { svgChevronDown, svgConfig } from '../components/Icons';
import { titleList, createTitleComponent, getEvents } from './events/_config';

function pageConfigPanel(){
    const main = document.createElement('main');
    main.classList.add('main-config-panel')
    main.innerHTML = `
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
    return main;
}
function pageConfigContent(){
    const section = document.createElement('section')
    section.classList.add('main-config-content')
    section.appendChild(createTitleComponent(titleList.DEFAULT))
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