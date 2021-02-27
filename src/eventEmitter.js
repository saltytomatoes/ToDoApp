class EventEmitter {

    #_eventlist = [];

    constructor(name) {
        this.name = name;
    }
    

    #_hasEvent = (event) => {
        for(let i = 0; i < this.#_eventlist.length; i++) {
            if( JSON.stringify(event) == JSON.stringify(this.#_eventlist[i]) )
                return true;
        }
        return false;
    }

    //defining new event
    on = (keyWord,f) => {

        if(typeof keyWord == "string" && typeof f == "function") {
            if( !this.#_hasEvent( {keyWord,f} ) )
                this.#_eventlist.push( {keyWord,f} ); //Add event
            else {
                console.error(`${keyWord} Event allready exist!`);
            }
        } else {
            console.error("Invocation invalid!");
        }
    }


    
    //triggering an event 
    emit = (keyWord,...args) => {
        for(let i = 0; i < this.#_eventlist.length; i++) {
            if(this.#_eventlist[i].keyWord == keyWord) {
                this.#_eventlist[i].f(...args);
                return;
            }
        }
        console.error(`There is no ${keyWord} event!`);
    }

    
}

export {EventEmitter};