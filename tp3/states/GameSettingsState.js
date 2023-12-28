import { State } from "./State.js";
import { GamePlayState } from "./GamePlayState.js";
import { MainMenuState } from "./MainMenuState.js";
import * as THREE from 'three';

class GameSettingsState extends State {
    constructor(app) {
        super(app);
        this.name = "GameSettingsState";

        // game settings
        this.gameSettings = {
            laps: 3,
            difficulty: 1,
            track: this.app.track,
            plane: this.app.plane,
            powerUp: this.app.powerUp,
            obstacles: this.app.obstacles,
            players: [
                {
                    name: "Player 1",
                    car: this.app.car,
                    time: 0,
                    laps: 0,
                    place: 0,
                },
                {
                    name: "Player 2",
                    car: 2,
                    time: 0,
                    laps: 0,
                    place: 0,
                }
            ]
        }; 

        this.buttons = [
            this.buildButton("Start", "#00ff00", 20, 6, 1, 0, 12, 0),
            this.buildButton("Back", "#ffff00", 20, 6, 1, 0, 4, 0),
        ];

        // add car picking here

        this.buttonsGroup = new THREE.Group();
        this.buttonsGroup.add(this.buttons[0], this.buttons[1]);

        this.app.scene.add(this.buttonsGroup);
    }

    update() {

        // make game settings configurable here
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
                case "Start":
                    this.app.scene.remove(this.buttons);
                    this.setState(new GamePlayState(this.app, this.gameSettings));
                    break;
                case "Back":
                    this.app.scene.remove(this.buttons);
                    this.setState(new MainMenuState(this.app));
                    break;
            }
        }
    }

}

export { GameSettingsState };