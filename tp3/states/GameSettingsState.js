import { State } from "./State.js";
import { GamePlayState } from "./GamePlayState.js";
import { MainMenuState } from "./MainMenuState.js";
import * as THREE from 'three';
import { MapControls } from 'three/addons/controls/MapControls.js';

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
            powerUps: this.app.powerUps,
            obstacles: this.app.obstacles,
            players: [
                {
                    name: "Player 1",
                    car: null,
                    time: 0,
                    laps: 0,
                    place: 0,
                },
                {
                    name: "Player 2",
                    car: null,
                    time: 0,
                    laps: 0,
                    place: 0,
                }
            ]
        }; 

        this.buttons = [
            this.buildButton("Start", "#0000ff", 8, 3, 0.5, 0, 8, -10),
            this.buildButton("Back", "#ff0000", 8, 3, 0.5, 0, 4, -10),
        ];

        // add difficulty buttons !!!

        this.buttonsGroup = new THREE.Group();
        this.buttonsGroup.add(this.buttons[0], this.buttons[1]);

        this.app.scene.add(this.buttonsGroup);

        // create menu camera
        this.menuCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        this.menuCamera.position.set(-10, 20, -30);
        this.menuCamera.lookAt(this.buttonsGroup.position);
        this.app.cameras["Menu"] = this.menuCamera;

        this.app.setActiveCamera("Menu");

        this.app.controls = new MapControls(this.app.activeCamera, this.app.renderer.domElement);

        this.playerCarsGroup = new THREE.Group();

        for (let i = 0; i < this.app.playerCars.length; i++) {
            this.app.playerCars[i].position.set(0, 0, i * 8);
            this.playerCarsGroup.add(this.app.playerCars[i]);
        }

        this.cpuCarsGroup = new THREE.Group();
        for (let i = 0; i < this.app.cpuCars.length; i++) {
            this.app.cpuCars[i].position.set(0, 0, -i * 8);
            this.cpuCarsGroup.add(this.app.cpuCars[i]);
        }

        this.playerCarsGroup.position.set(10, 0, -10);
        this.playerCarsGroup.rotateY(Math.PI / 2);

        this.cpuCarsGroup.position.set(-10, 0, -10);
        this.cpuCarsGroup.rotateY(Math.PI / 2);

        this.app.scene.add(this.playerCarsGroup, this.cpuCarsGroup);

        this.gameSettings.players[0].car = this.app.playerCars[0];
        this.gameSettings.players[1].car = this.app.cpuCars[0];
    }

    update() {
        this.gameSettings.players[0].car.scale.set(0.6, 0.6, 0.6);
        this.gameSettings.players[1].car.scale.set(0.6, 0.6, 0.6);
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

        const intersects2 = this.raycaster.intersectObjects(this.playerCarsGroup.children.concat(this.cpuCarsGroup.children));
        this.pickingCarHelper(intersects2);
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

        if (intersects.length > 0) {
            switch (intersects[0].object.name) {
                case "Start":
                    this.app.scene.remove(this.buttons);
                    this.gameSettings.players[0].car.scale.set(0.5, 0.5, 0.5);
                    this.gameSettings.players[1].car.scale.set(0.5, 0.5, 0.5);
                    this.setState(new GamePlayState(this.app, this.gameSettings));
                    break;
                case "Back":
                    this.app.scene.remove(this.buttonsGroup);
                    this.setState(new MainMenuState(this.app));
                    break;
            }
        }

        const intersects2 = this.raycaster.intersectObjects(this.playerCarsGroup.children);

        if (intersects2.length > 0) {
            this.gameSettings.players[0].car.scale.set(0.5, 0.5, 0.5);
            this.gameSettings.players[0].car = intersects2[0].object.parent;
        }

        const intersects3 = this.raycaster.intersectObjects(this.cpuCarsGroup.children);

        if (intersects3.length > 0) {
            this.gameSettings.players[1].car.scale.set(0.5, 0.5, 0.5);
            this.gameSettings.players[1].car = intersects3[0].object.parent;
        }

    }

}

export { GameSettingsState };