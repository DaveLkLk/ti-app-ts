import { svgDarkTheme, svgDefaultTheme, svgLightTheme } from "../../components/Icons.ts";
import { pageManagerApp } from "../../controllers/main.ts";
import { sectionNotFound } from "../../modules/404.ts";
import { addLocalStorage } from "../../rules/functions.ts";

const itemslocalStorage = {
  theme: 'theme-user',
  THEME_OPTIONS: {
    default: {
      value: 'default',
      svg: svgDefaultTheme
    },
    light: {
      value: 'light',
      svg: svgLightTheme
    },
    dark: {
      value: 'dark',
      svg: svgDarkTheme
    }  
  },
  THEME_POSITION: 'theme-position'
}
const changeClassActive = (container: HTMLUListElement, target: HTMLElement) => {
    const elements = Array.from(container.querySelectorAll<HTMLElement>(`.${target.dataset.class}`))
    elements.forEach((element) => {
      element.classList.remove(`${element.dataset.class}--active`)
    })
    target.classList.add(`${target.dataset.class}--active`)
    const indexTarget = elements.indexOf(target)
    addLocalStorage(itemslocalStorage.THEME_POSITION, String(indexTarget))
}
function setThemeUser(element:string){
    const findValue = Object.values(itemslocalStorage.THEME_OPTIONS)
    const themeOption = findValue.find(option => option.value === element)
    return themeOption ? themeOption.svg() : null
}
function setIconThemeNav(target: HTMLSpanElement, theme: string){
  const svgChange = setThemeUser(theme)
  svgChange ? target.innerHTML = svgChange : null
}
function setTargetTheme(container:HTMLUListElement, position:number){
  const target = container.children[position]
  return target
}

export function getEvents(root: HTMLElement){
  const mainContainer = root.querySelector('.main_container') as HTMLElement;
  // recuperar la seccion de localstorage
  const localPageFound = localStorage.getItem('section-app') as string;
  if(localPageFound){
    const prevPage = pageManagerApp(localPageFound);
    mainContainer.innerHTML = '';
    mainContainer.appendChild(prevPage?.page());
  }

  const containerThemeBtn = root.querySelector('#dropdown-theme-select') as HTMLUListElement;
  const navThemeBtn = root.querySelector('.navigation_li-theme') as HTMLLIElement;
  const navIconThemeDefault = root.querySelector('#navigation-li-icon') as HTMLDivElement
  const btnMenu = root.querySelector("#btn-show-menu") as HTMLButtonElement;
  const listMenu = root.querySelector('.navigation_list') as HTMLElement;
    btnMenu.addEventListener("click",()=>{
        console.log("click");
        listMenu.classList.toggle('navigation_list--active')
    })
    
    const pageApplication = root.querySelector('.navigation_app') as HTMLElement
    pageApplication.addEventListener('click', (e:MouseEvent) =>{
    const etarget = e.target as HTMLElement

    const isLiItem = etarget.tagName === 'LI' && etarget.classList.contains('dropdown_li')
    if(isLiItem){
      const dataset = (etarget.dataset.page) as string;
      const getPage = pageManagerApp(dataset);
      if(getPage === undefined){
        mainContainer.innerHTML = ''
        mainContainer.appendChild(sectionNotFound())
        return
      }
      mainContainer.innerHTML = ''
      mainContainer.appendChild(getPage.page())
    }
    const isListNav = etarget.tagName === 'LI' && etarget.classList.contains('navigation_li-app')
    if(isListNav){
      const dataset = etarget.dataset.page
      const getPage = pageManagerApp(dataset as string)
      if(getPage === undefined){
        mainContainer.innerHTML = ''
        mainContainer.appendChild(sectionNotFound())
        return
      }
      mainContainer.innerHTML = ''
      mainContainer.appendChild(getPage.page())
    }
    const userClickedTheme = etarget.tagName === 'LI' && etarget.classList.contains('navigation_li-theme')
    if(userClickedTheme){
      const classElement = etarget.dataset.class as string
      etarget.classList.toggle(`${classElement}--active`)
    }
    const clickedBtnTheme = etarget.tagName === 'DIV' && etarget.classList.contains('dropdown_theme-item')
    if(clickedBtnTheme){
      const themeSelected = etarget.dataset.theme as string
        addLocalStorage(itemslocalStorage.theme, themeSelected)
        changeClassActive(containerThemeBtn, etarget);
        setIconThemeNav(navIconThemeDefault, themeSelected)
    }

  })
  document.addEventListener('click', (e:MouseEvent) =>{
    const target = e.target as HTMLElement
    const themeClicked = !navThemeBtn?.contains(target) && !containerThemeBtn?.contains(target);
    if(themeClicked){
      navThemeBtn?.classList.remove(`${navThemeBtn.dataset.class}--active`)
    }
  })
  document.addEventListener('DOMContentLoaded', ()=>{
    const itemTheme = localStorage.getItem(itemslocalStorage.theme) as string
    const positionTheme = localStorage.getItem(itemslocalStorage.THEME_POSITION) as string
    if(itemTheme){
      setIconThemeNav(navIconThemeDefault, itemTheme)
      const target = setTargetTheme(containerThemeBtn, Number(positionTheme)) as HTMLElement
      positionTheme ? changeClassActive(containerThemeBtn, target) : null
    }
    if(!itemTheme){
      addLocalStorage(itemslocalStorage.theme, itemslocalStorage.THEME_OPTIONS.default.value)

    }
  })
  
  console.log(navigator.userAgent);
  return;
}