import '../../public/css/modules/config.css'
import '../../public/css/components/label-toggle.css'
import { pageConfigPanel } from '../views/settings/aside';
import { createHomeModule } from '../views/settings/header';
import { getEvents } from '../modules/events/_config';


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