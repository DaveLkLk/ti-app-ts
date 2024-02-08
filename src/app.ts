import '../public/css/index.css'
import { NavPage } from './modules/nav.ts';
import { MainContainer } from './modules/container.ts';
import { getEvents as NavEvents } from './modules/events/_nav.ts';

const root = document.querySelector<HTMLDivElement>("#root") as HTMLDivElement;
root.innerHTML = `
  ${NavPage().outerHTML}
  ${MainContainer().outerHTML}
`;
NavEvents(root)