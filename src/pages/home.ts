import { getEvents } from "../modules/events/_home";

export function CreateHomePage(){
    const div = document.createElement('div');
    div.innerHTML = 'Home Page'
    return div
}

export function sectionHomePage(){
    const section = document.createElement('section')
    section.classList.add('main_content')
    section.classList.add('main_home-container')
    section.appendChild(CreateHomePage())
    getEvents(section)
    return section
}