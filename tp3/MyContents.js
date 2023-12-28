import * as THREE from 'three';
import { MyAxis } from './MyAxis.js';
import { MyFileReader } from './parser/MyFileReader.js';
import { MyGraph } from './builder/MyGraph.js';
import {InitState} from './states/InitState.js';
import {MainMenuState} from './states/MainMenuState.js';
import {GamePlayState} from './states/GamePlayState.js';

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

        // add an ambient light
        const ambientLight = new THREE.AmbientLight( 0x555555, 4 );
        this.app.scene.add( ambientLight );
        
        // add a sun light
        this.directionalLight = new THREE.DirectionalLight(0xf8e45c, 10);
        this.directionalLight.castShadow = true;
        this.app.scene.add(this.directionalLight);
        this.directionalLight.position.set(-0, 30, 0); // Adjust the position of the light source
        this.directionalLightHelper = new THREE.DirectionalLightHelper( this.directionalLight );
        this.app.scene.add( this.directionalLightHelper );


        document.addEventListener(
            "pointermove",
            this.onPointerMove.bind(this)
        );

        document.addEventListener("pointerdown", this.onPointerDown.bind(this));

        // Init states
        this.state = new InitState(this.app)

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

        document.addEventListener("keydown", this.onKeyDown, false);
        document.addEventListener("keyup", this.onKeyUp, false);
        document.addEventListener("keypress", this.onKeyPress, false);
    }

    
    update() {
        this.state.update()
        // console.log(this.state.name)
    }

    onKeyDown(event) {
        this.state.onKeyDown(event)
    }

    onKeyUp(event) {
        this.state.onKeyUp(event)
    }

    onKeyPress(event) {
        this.state.onKeyPress(event)
    }

    onPointerMove(event) {
        this.state.onPointerMove(event)
    }  
    
    onPointerDown(event) {
        this.state.onPointerDown(event)
    }
}

export { MyContents };