import * as THREE from 'three';


class State {
    constructor(app) {
        this.app = app
    }
    
    update() {}

    setState(state) {
        this.app.contents.state = state
    }

    onKeyDown(event) {}

    onKeyUp(event) {}

    onKeyPress(event) {}
}

export { State };