import '../public/css/index.css'
import { NavPage } from './modules/nav.ts';
import { MainContainer } from './modules/container.ts';
import { Footer } from './modules/Footer.ts';
import { getEvents as NavEvents } from './modules/events/_nav.ts';

const root = document.querySelector<HTMLDivElement>("#root") as HTMLDivElement;
root.innerHTML = `
  ${NavPage().outerHTML}
  ${MainContainer().outerHTML}
  ${Footer().outerHTML}
`;
NavEvents(root)