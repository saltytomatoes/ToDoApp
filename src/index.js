

const InitialContent = (function () {

    const Content = document.querySelector("#Content");

    const header = `<header>
                        <span>J</span>
                        <span>u</span>
                        <span>s</span>
                        <span>t</span>&nbsp&nbsp
                        <span>F</span>
                        <span>*</span>
                        <span>c</span>
                        <span>k</span>
                        <span>i</span>
                        <span>n</span>
                        <span>g</span>&nbsp&nbsp
                        <span>D</span>
                        <span>o</span>&nbsp&nbsp
                        <span>I</span>
                        <span>t</span>
                    </header>`;
                    
    const projectHolder = `<div id="projectHolder">
                            
                          </div>`;

    const mainHolder = `<div id="mainHolder">
                          ${projectHolder}
                        </div>`;


    Content.innerHTML = `
                        ${header}
                        ${mainHolder}
                        `;

})();