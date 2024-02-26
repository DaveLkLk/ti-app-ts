import '../../public/css/modules/404.css'

function pageNotFound(){
    const div = document.createElement('div');
    div.classList.add('not--found')
    div.innerHTML = `
        <div class="error_description">
            <h1 class="error_type">404|Error </h1>
            <div class="error_content">
                <h2>The section you are looking for was not found</h2>
                <p>We're sorry, the page you are looking for is not available. It's possible that the address has changed, the page has been deleted, or there has been a temporary error. Please check the URL and try again. If you believe this is an error, please <a href="#">contact us</a> so we can resolve it. Thank you for your understanding.</p>
            </div>
            <div class="error_actions">
                <button class="error_btn error_btn-back" id="error-action-back">Go Back</button>
                <button class="error_btn error_btn-home" id="error-action-home">Go Home</button>
            </div>
        </div>
        <div class="error_image">
            <div class="support">
            </div>
        </div>
    `;
    return div;
}
export function sectionNotFound(){
    const section = document.createElement('section')
    section.classList.add('main_content')
    section.classList.add('main_not-found')
    section.appendChild(pageNotFound())
    return section;
}