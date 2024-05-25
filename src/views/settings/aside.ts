import { svgConfig, svgChevronDown } from "../../components/Icons";

export function pageConfigPanel(){
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