export const MainContainer = ()=> {
    const main = document.createElement('main') as HTMLElement;
    main.classList.add('main_container');
    main.innerHTML = `
        <section class="main_content main_home-container"></section>
    `;
    return main;
}