import '../../public/css/modules/footer.css'
import { svgTypeScript } from "../components/Icons";

export const Footer = () => {
    const footer = document.createElement('footer')
    footer.innerHTML = `
    <div class="footer_container">
        <span class="ts_overlay" title="Desarrollado en TypeScript">${svgTypeScript()}</span>
    </div>
    `;
    return footer
}