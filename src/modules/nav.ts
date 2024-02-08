import '../../public/css/modules/nav.css'
import { svgMenu } from "../components/Icons.ts";

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
            <span class="dropdown_li-clr"></span>
            <span class="dropdown_li-name">Tranform Text App</button>
        </li>
        <li class="dropdown_li" data-page="text-crud">
            <span class="dropdown_li-clr"></span>
            <span class="dropdown_li-name">CRUD Text App</button>
        </li>
        <li class="dropdown_li" data-page="anexo-untels">
            <span class="dropdown_li-clr"></span>
            <span class="dropdown_li-name">Anexos UNTELS</button>
        </li>
        <li class="dropdown_li" data-page="directivo-untels">
            <span class="dropdown_li-clr"></span>
            <span class="dropdown_li-name">Directivos UNTELS</button>
        </li>
    `;
    return ul;
}
const NavList = ()=>{
    const nav = document.createElement('nav');
    nav.classList.add('navigation_list');
    nav.innerHTML = `
        <ul class="navigation_ul navigation_app">
            <li class="navigation_li navigation_li-app" data-page="not-found">
                <span class="navigation_li-name">About Us</span>
            </li>
            <li class="navigation_li navigation_li-app" data-page="not-found">
                <span class="navigation_li-name">Documents</span>
            </li>
            <li class="navigation_li">
            <span class="navigation_li-name">Applications</span>
            ${ListApplication().outerHTML}
            </li>
            <li class="navigation_li navigation_li-app" data-page="not-found">
                <span class="navigation_li-name">Questions</span>
            </li>
            <li class="navigation_li navigation_li-app" data-page="not-found">
                <span class="navigation_li-name">Forum</span>
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