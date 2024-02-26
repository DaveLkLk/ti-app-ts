import { svgDarkTheme, svgDefaultTheme, svgLightTheme } from "../../components/Icons.ts";
import { pageManagerApp } from "../../controllers/main.ts";
import { sectionNotFound } from "../../modules/404.ts";
import { addLocalStorage } from "../../rules/functions.ts";

enum themeClass {
  dark = 'dark',
  light = 'light',
  system = 'system'
}
interface ThemeUser {
  isDarkActive: boolean;
  class: string
}

const itemslocalStorage = {
  theme: 'theme-user',
  THEME_OPTIONS: {
    system: {
      value: 'system',
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
  THEME_POSITION: 'theme-position',
  body: {
    dark: 'body_theme-dark',
    light: 'body_theme-light',
    system: 'body_theme-system'
  }
}
const getLocalStorage = {
  THEME: localStorage.getItem(itemslocalStorage.theme) as string,
  THEME_POSITION: localStorage.getItem(itemslocalStorage.THEME_POSITION) as string
}
function changeIconWindow(isDarkTheme: boolean){
  const pathIconDark = '../../../public/assets/astro-dark.png'
  const pathIconLight = '../../../public/assets/astro-light.png'
  const favicon = document.querySelector('link[rel="icon"]')
  isDarkTheme
  ? favicon?.setAttribute('href', pathIconLight)
  : favicon?.setAttribute('href', pathIconDark)
  console.log(isDarkTheme);
}
const changeClassActive = (container: HTMLUListElement, target: HTMLElement) => {
    const elements = Array.from(container.querySelectorAll<HTMLElement>(`.${target.dataset.class}`))
    elements.forEach(element => {
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
  return container.children[position]
}
// RETORNA UN OBJETO CON LA CLASE Y LA PREFERENCIA DEL TEMA SEGUN EL TEMA DE COLOR SELECCIONADO
function findClassThemeBody(theme:string){
  const themeOption = Object.keys(itemslocalStorage.THEME_OPTIONS).find(value => value === theme) as themeClass
  const themeUser = itemslocalStorage.body[themeOption]
  if(!themeOption || !themeUser){
    console.error(`ERROR: no se reconoce <${theme}> como preferencia de color del usuario `);
    return
  }
  const THEME_SYSTEM:ThemeUser = {
    isDarkActive: false,
    class: themeUser
  }
  const isSystemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if(themeOption === itemslocalStorage.THEME_OPTIONS.dark.value || isSystemThemeDark){
    THEME_SYSTEM.isDarkActive = true
  }
  return THEME_SYSTEM;
}
// QUITA TODAS LAS CLASES DEL TEMA DE COLOR Y AÑADE LA CLASE SELECCIONADA
export function setThemeClass(themeClass:string){
  document.body.classList.remove(...document.body.classList)
  document.body.classList.add(themeClass)
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
      const classBody = findClassThemeBody(themeSelected) as ThemeUser
      setThemeClass(classBody.class)
        setIconThemeNav(navIconThemeDefault, themeSelected)
        changeClassActive(containerThemeBtn, etarget);
        addLocalStorage(itemslocalStorage.theme, themeSelected)
    }

  })
  const preferenceThemeUser = window.matchMedia('(prefers-color-scheme: dark)')
  preferenceThemeUser.addEventListener('change', (event) => {
    if(getLocalStorage.THEME === itemslocalStorage.THEME_OPTIONS.system.value){
      const classBody = findClassThemeBody(getLocalStorage.THEME) as ThemeUser
      event.matches
      ? (setThemeClass(classBody.class), changeIconWindow(true))
      : changeIconWindow(false)
    }
    return
  });
  document.addEventListener('click', (e:MouseEvent) =>{
    const target = e.target as HTMLElement
    const themeClicked = !navThemeBtn?.contains(target) && !containerThemeBtn?.contains(target);
    if(themeClicked){
      navThemeBtn?.classList.remove(`${navThemeBtn.dataset.class}--active`)
    }
  })
  document.addEventListener('DOMContentLoaded', ()=>{
    const itemTheme = getLocalStorage.THEME as string
    const positionTheme = getLocalStorage.THEME_POSITION as string
    if(itemTheme){
      setIconThemeNav(navIconThemeDefault, itemTheme)
      const target = setTargetTheme(containerThemeBtn, Number(positionTheme)) as HTMLElement
      positionTheme ? changeClassActive(containerThemeBtn, target) : null
      const classBody = findClassThemeBody(itemTheme) as ThemeUser
      setThemeClass(classBody.class)
    }
    if(!itemTheme){
      addLocalStorage(itemslocalStorage.theme, itemslocalStorage.THEME_OPTIONS.system.value)
      addLocalStorage(itemslocalStorage.THEME_POSITION, '0')
      const classBody = findClassThemeBody('system') as ThemeUser
      setThemeClass(classBody.class)
      changeClassActive(containerThemeBtn, (containerThemeBtn.children[0] as HTMLElement))
    }
  })
  // window.addEventListener('resize', (evt) => {
  //   console.log(evt);

  // })
    
  console.log(navigator.userAgent);
  return;
}