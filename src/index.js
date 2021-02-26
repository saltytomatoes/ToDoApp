

const InitialContent = (function () {

    const Content = document.querySelector("#Content");

    const header = `<header>
                        <span>Just</span> <span>F*cking</span> <span>Do</span> <span>It</span>
                    </header>`;
                    
    const projectHolder = `<div id="projectHolder" class="subdiv">
                            <h1 class="title">Projects</h1>
                            <hr>
                          </div>`;

    const projectMonitor = `<div id="projectMonitor" class="subdiv">
                                <h1 class="title">--proj name--</h1>
                                <hr>
                            </div>`;
    const mainHolder = `<div id="mainHolder">
                          ${projectHolder}
                          ${projectMonitor}
                        </div>`;


    Content.innerHTML = `
                        ${header}
                        ${mainHolder}
                        `;

})();