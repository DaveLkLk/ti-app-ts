import { pageManagerApp } from "../../controllers/main.ts";
import { sectionNotFound } from "../../modules/404.ts";

export function getEvents(root: HTMLElement){
    const mainContainer = root.querySelector('.main_container') as HTMLElement

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
  })
  return;
}