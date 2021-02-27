
import { EventEmitter } from './eventEmitter.js';

// Converts string to dom elements
function strToHtml(str) {
    let parser = new DOMParser();
    str = parser.parseFromString(str, "text/html").body.firstElementChild;

    return str;
}


// sets the initial view
const InitializeView = (function () {

    const Content = document.querySelector("#Content");

    const header = strToHtml(`
                                <header>
                                <span>Just</span> <span>F*cking</span> <span>Do</span> <span>It</span>
                                </header>
                            `);


    const projectHolder = strToHtml(`
                                        <div id="projectHolder" class="subdiv">
                                            <div class="topBar">
                                                <h1 class="title">Projects</h1>
                                                <div id="addProjectBtn" class="notTxt">+</div>
                                            </div>
                                            <hr>
                                        </div>
                                    `);



    const projectMonitor = strToHtml(`
                                        <div id="projectMonitor" class="subdiv">
                                            <h1 class="title">--proj name--</h1>
                                            <hr>
                                        </div>`
                                    );


    const mainHolder = strToHtml(`<div id="mainHolder"></div>`);
    mainHolder.appendChild(projectHolder);
    mainHolder.appendChild(projectMonitor);



    Content.appendChild(header);
    Content.appendChild(mainHolder);

    return {
        projectHolder,
        projectMonitor
    }

})();


// 
const App = (function () {

    let eventEmitter = new EventEmitter("CombineHolderAndDisplayer");

    //new project is created
    eventEmitter.on("CREATE_PROJECKT",() => {
        InitializeView.projectHolder.appendChild(new Project().dom);
    });

    //a project is selected to be displayed
    eventEmitter.on("LOAD",(project) => {
        console.log(project.name + " is loaded!");
    });

    class List {
        constructor() {
            this.name;
            this.components = [];

        }

        getTaskAmount = () => {
            let amount = 0;
            this.components.forEach(component => {

                    switch (component.constructor) {
                        case Task:
                            amount++;
                            break;
                        case Section:
                            amount += component.getTaskAmount();
                            break;
                        default:
                            console.error(`invalid component!: ${component}`);
                    }

            });
            return amount;
        }

        addComponent = (component) => {
            this.components.push(component);
        }
    }

    class Project extends List {
        constructor() {
            super();

            this.dom = this._createProjectDom();
            this.dom.addEventListener("click",this.loadProject);
        }

        // returns a project representation div.
        _createProjectDom= () => {
            let main = strToHtml(`<div class="project"></div>`);
        

            let projectName = strToHtml(`<input type="text" placeholder="Choose a name"></input>`);
            //The name is changable 
            projectName.addEventListener("blur",(e)=>{
                this.name = e.target.value;
            });


            let tasksInside = strToHtml(`<div class="tasksInside"></div>`);
    
            main.appendChild(projectName);
            main.appendChild(tasksInside);
                
            return main;
        }

        setTaskAmount = () => {
            let tasksInside = this.dom.querySelector(".tasksInside");
            tasksInside.innerText = this.getTaskAmount();
        }

        loadProject = () => {
            eventEmitter.emit("LOAD",this);
        }
    }

    class Section extends List {
        constructor() {
            super();
        }
    }

    class Task {
        constructor(title,description,project,deadline) {
            this.title = title;
            this.description = description;
            this.project = project;
            this.deadline = deadline;
            this.isDone = false;
        }
    }


    const addProjectBtn = document.querySelector("#addProjectBtn");
    console.log(addProjectBtn)
    addProjectBtn.addEventListener("click",()=>eventEmitter.emit("CREATE_PROJECKT"))
    

})();