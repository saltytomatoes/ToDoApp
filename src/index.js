
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

    class List {
        constructor(name) {
            this.name = name;
            this.components = [];

        }

        getTaskAmount = () => {
            let amount = 0;
            this.components.forEach(component => {
                //in case the component is of type section
                if(component.constructor == Section) 
                    amount += component.getTaskAmount();
                
                if(component.constructor == Task)
                    amount++;
            });
            return amount;
        }

        addComponent = (component) => {
            this.components.push(component);
        }
    }////////////////


    class Project extends List {
        constructor(name) {
            super(name);
            this.dom = this._createProjectDom();
        }

        // returns a project representation div.
        _createProjectDom= () => {
            let main = strToHtml(`<div class="project"></div>`);
        
            let projectName = strToHtml(`<h2>${this.name}</h2>`);
            let tasksInside = strToHtml(`<div class="tasksInside"></div>`);
    
            main.appendChild(projectName);
            main.appendChild(tasksInside);
                
            return main;
        }
    }


    class Section extends List {
        constructor(name) {
            super(name);
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

    
    
    
    
    
    
    
    
    InitializeView.projectHolder.appendChild(new Project("jack").dom);

})();