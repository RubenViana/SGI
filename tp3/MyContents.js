import * as THREE from 'three';
import { MyAxis } from './MyAxis.js';
import { MyFileReader } from './parser/MyFileReader.js';
import { MyGraph } from './builder/MyGraph.js';
import {InitState} from './states/InitState.js';
import {MainMenuState} from './states/MainMenuState.js';
import {GamePlayState} from './states/GamePlayState.js';
import {GameSettingsState} from './states/GameSettingsState.js';

/**
 *  This class contains the contents of out application
 */
class MyContents  {

    /**
       constructs the object
       @param {MyApp} app The application object
    */ 
    constructor(app) {
        this.app = app
        this.axis = null

    }

    /**
     * initializes the contents
     */
    init() {
        // create once 
        if (this.axis === null) {
            // create and attach the axis to the scene
            this.axis = new MyAxis(this)
            this.app.scene.add(this.axis)
        }

        // Init states
        this.state = new InitState(this.app)
    }

    
    update() {
        this.state.update()
        // console.log(this.state.name)
    }
    
}

export { MyContents };