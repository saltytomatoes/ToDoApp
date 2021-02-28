
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
                                        <div class="topBar">
                                            <h1 class="title">--proj name--</h1>
                                            <div id="buttonHolder">
                                                <div class="button" id="newTask">+Task</div>
                                                <div class="button" id="newSection">+Section</div>
                                            </div>
                                        </div>
                                            
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

    let projectMonitor = {
        currDisplay: undefined,

        clear: function() {
            if(this.currDisplay != undefined)
                InitializeView.projectMonitor.removeChild(InitializeView.projectMonitor.lastElementChild);
        },

        renameTitle: function(str) {
            let monitorTitle = document.querySelector("#projectMonitor .title");
            monitorTitle.innerText = str;
        }
    }


    let eventEmitter = new EventEmitter("CombineHolderAndDisplayer");

    //new project is created
    eventEmitter.on("CREATE_PROJECKT",() => {
        InitializeView.projectHolder.appendChild(new Project().dom);
    });

    //a project is selected to be displayed
    eventEmitter.on("LOAD",(project) => {
        projectMonitor.clear();
        projectMonitor.currDisplay = project;
        projectMonitor.renameTitle(project.name);
        InitializeView.projectMonitor.appendChild(project.getMonitorDom());
    });

    eventEmitter.on("RENAMED",(project) => {
        if(projectMonitor.currDisplay == project || projectMonitor.currDisplay == undefined) {
            projectMonitor.renameTitle(project.name);
        }
    });

    eventEmitter.on("ADD_TASK",() => {
        if(projectMonitor.currDisplay != undefined) {
            projectMonitor.currDisplay.addComponent( new Task() );
            eventEmitter.emit("LOAD",projectMonitor.currDisplay);
        }
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
            this.dom = this._getHolderDom();
            this.dom.addEventListener("click",this.loadProject);
            this._setInitialTask();
            this.setTaskAmount();
        }

        // returns a project representation div.
        _getHolderDom = () => {
            let main = strToHtml(`<div class="projectHolder"></div>`);
        

            let projectName = strToHtml(`<input type="text" placeholder="Choose a name"></input>`);
            //The name is changable 
            projectName.addEventListener("blur",(e)=>{
                this.name = e.target.value;
                eventEmitter.emit("RENAMED",this);
            });


            let tasksInside = strToHtml(`<div class="tasksInside">${this.getTaskAmount()}</div>`);
    
            main.appendChild(projectName);
            main.appendChild(tasksInside);
                
            return main;
        }

        //updates tasks amount monitor in holder
        setTaskAmount = () => {
            let tasksInside = this.dom.querySelector(".tasksInside");
            tasksInside.innerText = this.getTaskAmount();
        }

        //fires when a project is clicked to be monitored
        loadProject = () => {
            eventEmitter.emit("LOAD",this);
        }

        getMonitorDom = () => {
            let dom = strToHtml(`<div class="projectMonitor"></div>`);
            this.components.forEach(component => {
                dom.appendChild(component.getMonitorDom());
            });
            
           return dom; 
        }

        _setInitialTask = () => {
            this.components.push( new Task() )
        }
    }


    class Section extends List {
        constructor() {
            super();
        }

        getMonitorDom = () => {
            let dom = strToHtml(`<div class="sectionMonitor">
                                <div class="title">${this.name}</div>
                                <hr>
                                </div>`);
            this.components.forEach(component => {
                dom.appendChild(component.getMonitorDom());
            });
            
           return dom; 
        }
    }

    
    class Task {
        constructor(title,description,project,deadline) {
            this.title = title;
            this.description = description;
            this.project = project;
            this.deadline = deadline;
        }

        getMonitorDom = () => {
            let div = strToHtml(`<div class="task">
                                    <div class=flexStart>
                                        <input type="checkbox"></input>
                                        <div class="title">${this.title}</div>
                                    </div>
                                    <div class="date">${this.deadline}</div>
                                    <div class="operations">
                                        <div class="edit"></div>
                                        <div class="delete"></div>
                                    </div>
                                 </div>`);

            return div;
        }
    }


    const addProjectBtn = document.querySelector("#addProjectBtn")
                        .addEventListener("click",( ) => eventEmitter.emit("CREATE_PROJECKT"));
    
    const addTask = document.querySelector("#newTask")
                        .addEventListener("click",() => eventEmitter.emit("ADD_TASK"));

})();