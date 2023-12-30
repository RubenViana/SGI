import { State } from "./State.js";
import { GameSettingsState } from "./GameSettingsState.js";
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { MapControls } from 'three/addons/controls/MapControls.js';

class MainMenuState extends State {
    constructor(app) {
        super(app);
        this.name = "MainMenuState";
        

        this.buttons = [
            this.buildButton("Play", "#0000ff", 20, 6, 1, 0, 12, 0),
            this.buildButton("Settings", "#ff0000", 20, 6, 1, 0, 4, 0),
        ];

        this.buttonsGroup = new THREE.Group();
        this.buttonsGroup.add(this.buttons[0], this.buttons[1]); 
        
        // add race track to scene
        this.app.scene.add(this.app.track);
        this.app.scene.add(this.app.plane);
        this.app.scene.add(this.app.powerUps);
        this.app.scene.add(this.app.car);
        this.app.scene.add(this.app.obstacles);

        this.app.scene.add(this.buttonsGroup);

        // create menu camera
        this.menuCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        this.menuCamera.position.set(-10, 20, -30);
        this.menuCamera.lookAt(this.buttonsGroup.position);
        this.app.cameras["Menu"] = this.menuCamera;

        this.app.setActiveCamera("Menu");

        this.app.controls = new MapControls(this.app.activeCamera, this.app.renderer.domElement);
    }

    update() {
        this.display();
    }

    display() {
        //display the main menu
    }

    onPointerMove(event) {
        this.pointer = new THREE.Vector2();

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components

        //of the screen is the origin
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //console.log("Position x: " + this.pointer.x + " y: " + this.pointer.y);

        //2. set the picking ray from the camera position and mouse coordinates
        this.raycaster.setFromCamera(this.pointer, this.app.activeCamera);

        //3. compute intersections
        var intersects = this.raycaster.intersectObjects(this.buttons);

        //4. highlight the picked object
        this.pickingHelper(intersects)
    }   

    onPointerDown(event) {
        this.pointer = new THREE.Vector2();

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components

        //of the screen is the origin
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //console.log("Position x: " + this.pointer.x + " y: " + this.pointer.y);

        //2. set the picking ray from the camera position and mouse coordinates
        this.raycaster.setFromCamera(this.pointer, this.app.activeCamera);

        //3. compute intersections
        var intersects = this.raycaster.intersectObjects(this.buttons);

        //4. highlight the picked object
        this.pickingHelper(intersects)

        if (intersects.length > 0) {
            switch (intersects[0].object.name) {
                case "Play":
                    this.app.scene.remove(this.buttons);
                    this.setState(new GameSettingsState(this.app));
                    break;
                case "Settings":
                    console.log("Settings");
                    break;
            }
        }
    }
}

export { MainMenuState };