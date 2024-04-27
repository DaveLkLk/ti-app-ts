import '../../public/css/modules/nav.css'
import { svgAnexos, svgDarkTheme, svgDefaultTheme, svgDirectivos, svgLightTheme, svgMenu, svgTextCRUD, svgTextTransform } from "../components/Icons.ts";

const NavTitle = () => {
    const div = document.createElement('div');
    div.classList.add('navigation_title');
    div.innerHTML = `
        <button class="title_page" type="submit">
            <span>TI</span>
        </button>
        <button class="btn_menu btn_show" type="button" id="btn-show-menu">
            ${svgMenu()}
        </button>
    `;
    return div;
}
// ------------------------------------
const ListApplication = ()=>{
    const ul = document.createElement('ul');
    ul.classList.add('dropdown_ul');
    ul.classList.add('dropdown_app');
    ul.innerHTML = `
        <li class="dropdown_li" data-page="text-style">
            <span class="dropdown_li-clr btn_menu">${svgTextTransform()}</span>
            <span class="dropdown_li-name">Tranform Text App</button>
        </li>
        <li class="dropdown_li" data-page="text-crud">
            <span class="dropdown_li-clr btn_menu">${svgTextCRUD()}</span>
            <span class="dropdown_li-name">CRUD Text App</button>
        </li>
        <li class="dropdown_li" data-page="anexo-untels">
            <span class="dropdown_li-clr btn_menu">${svgAnexos()}</span>
            <span class="dropdown_li-name">Anexos UNTELS</button>
        </li>
        <li class="dropdown_li" data-page="directivo-untels">
            <span class="dropdown_li-clr btn_menu">${svgDirectivos()}</span>
            <span class="dropdown_li-name">Directivos UNTELS</button>
        </li>
    `;
    return ul;
}
const ListTheme= () => {
    const ul = document.createElement('ul')
    ul.classList.add('dropdown_li-theme')
    ul.classList.add('dropdown_theme')
    ul.id = 'dropdown-theme-select'
    ul.innerHTML = `
        <div class="dropdown_theme-item" data-class="dropdown_theme-item" id="theme-default" data-theme="system">
            <span class="btn_icon">${svgDefaultTheme()}</span>
            <span class="dropdown_btn-name">Sistema</span>
        </div>
        <div class="dropdown_theme-item" data-class="dropdown_theme-item" id="theme-light" data-theme="light">
            <span class="btn_icon">${svgLightTheme()}</span>
            <span class="dropdown_btn-name">Light</span>
        </div>
        <div class="dropdown_theme-item" data-class="dropdown_theme-item" id="theme-dark" data-theme="dark">
            <span class="btn_icon">${svgDarkTheme()}</span>
            <span class="dropdown_btn-name">Dark</span>
        </div>
    `;
    return ul;
}
const NavList = ()=>{
    const nav = document.createElement('nav');
    nav.classList.add('navigation_list');
    nav.innerHTML = `
        <ul class="navigation_ul navigation_app">
            <li class="navigation_li-btn navigation_li-theme" data-class="navigation_li-theme">
                <div class="navigation_theme-btn">
                    <span class="btn_icon" id="navigation-li-icon">${svgDefaultTheme()}</span>
                    <span class="navigation_li-name">Tema</span>
                </div>
                ${ListTheme().outerHTML}
            </li>
            <li class="navigation_li navigation_li-app" data-page="not-found">
                <span class="navigation_li-name">About Us</span>
            </li>
            <li class="navigation_li navigation_li-app" data-page="not-found">
                <span class="navigation_li-name">Docs</span>
            </li>
            <li class="navigation_li">
            <span class="navigation_li-name">Applications</span>
            ${ListApplication().outerHTML}
            </li>
            <li class="navigation_li navigation_li-app" data-page="not-found">
                <span class="navigation_li-name">FAQ</span>
            </li>
            <li class="navigation_li navigation_li-app" data-page="config-page">
                <span class="navigation_li-name">Settings</span>
            </li>
        </ul>
    `;
    return nav;
}

export const NavPage = () => {
    const Header = document.createElement('header');
    Header.classList.add('navigation_container');
    Header.innerHTML = `
        ${NavTitle().outerHTML}
        ${NavList().outerHTML}
    `;
    return Header 
} 