function EventEmitter (name) {

    this.name = name;
    let _eventList = [];
    

    let _hasEvent = function( event ) {
        for(let i = 0; i < _eventList.length; i++) {
            if( JSON.stringify(event) == JSON.stringify(_eventList[i]) )
                return true;
        }
        return false;
    }

    //defining new event
    this.on = function(keyWord,f) {

        if(typeof keyWord == "string" && typeof f == "function") {
            if( !_hasEvent( {keyWord,f} ) )
                _eventList.push( {keyWord,f} ); //Add event
            else {
                console.error(`${keyWord} Event allready exist!`);
            }
        } else {
            console.error("Invocation invalid!");
        }
    }

    //triggering an event 
    this.emit = function(keyWord) {
        for(let i = 0; i < _eventList.length; i++) {
            if(_eventList[i].keyWord == keyWord) {
                _eventList[i].f();
                return;
            }
            console.error(`There is no ${keyWord} event!`);
        }
    }
}

export {EventEmitter};