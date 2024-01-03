import { State } from "./State.js";
import { GamePlayState } from "./GamePlayState.js";
import { MainMenuState } from "./MainMenuState.js";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
                    name: this.app.playerName,
                    car: null,
                    time: 0,
                    addedTime: 0,
                    laps: 0,
                    place: 0,
                },
                {
                    name: "CPU",
                    car: null,
                    time: 0,
                    addedTime: 0,
                    laps: 0,
                    place: 0,
                }
            ]
        }; 

        this.animationTime = 0;

        // add difficulty buttons !!!

        this.buttonsGroup = new THREE.Group();
        this.buildButton("Start", "#0000ff", 2, 0.6, 0, 7.5, 0);
        this.buildButton("Easy", "#00ff00", 2, 0.6, 0, 4.5, 0);
        this.buildButton("Back", "#ff0000", 2, 0.6, 0, 1.5, 0);

        this.buttonsGroup.position.set(72, 0, 400);
        this.buttonsGroup.rotateY(-Math.PI / 2);

        this.app.scene.add(this.buttonsGroup);

        // create menu camera
        this.menuCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        this.menuCamera.position.set(50, 14, 400);
        this.menuCamera.lookAt(this.buttonsGroup.position);
        this.app.cameras["Menu"] = this.menuCamera;

        this.app.setActiveCamera("Menu");

        this.app.controls = new OrbitControls(this.app.activeCamera, this.app.renderer.domElement);
        this.app.controls.target.set(74, 0, 400);

        this.playerCarsGroup = new THREE.Group();

        for (let i = 0; i < this.app.playerCars.length; i++) {
            this.app.playerCars[i].position.set(0, 0, i * 6);
            this.playerCarsGroup.add(this.app.playerCars[i]);
        }

        this.cpuCarsGroup = new THREE.Group();
        for (let i = 0; i < this.app.cpuCars.length; i++) {
            this.app.cpuCars[i].position.set(0, 0, -i * 6);
            this.cpuCarsGroup.add(this.app.cpuCars[i]);
        }

        this.playerCarsGroup.position.set(82, 0, 390);
        this.playerCarsGroup.rotateY(Math.PI);

        this.cpuCarsGroup.position.set(82, 0, 410);
        this.cpuCarsGroup.rotateY(Math.PI);


        this.app.scene.add(this.playerCarsGroup, this.cpuCarsGroup);

        this.gameSettings.players[0].car = this.app.playerCars[0];
        this.gameSettings.players[1].car = this.app.cpuCars[0];

        this.playersName = new THREE.Group();
        this.createText(this.gameSettings.players[0].name, 0x404040, 3, 1, -15, 0, 0, this.playersName);
        this.createText(this.gameSettings.players[1].name, 0x404040, 3, 1, 15, 0, 0, this.playersName);

        this.playersName.position.set(72, 13, 400);
        this.playersName.rotateY(-Math.PI / 2);

        this.app.scene.add(this.playersName);
    }

    update() {
        this.gameSettings.players[0].car.position.y = Math.sin(this.animationTime * 0.1)*0.5 + 0.5;
        this.gameSettings.players[0].car.scale.set(0.6, 0.6, 0.6);
        this.gameSettings.players[1].car.position.y = Math.sin(this.animationTime * 0.1)*0.5 + 0.5;
        this.gameSettings.players[1].car.scale.set(0.6, 0.6, 0.6);
        // make game settings configurable here

        this.animationTime += 1;
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
        var intersects = this.raycaster.intersectObjects(this.buttonsGroup.children);

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
        var intersects = this.raycaster.intersectObjects(this.buttonsGroup.children);

        if (intersects.length > 0) {
            switch (intersects[0].object.name) {
                case "Start":
                    this.gameSettings.players[0].car.scale.set(0.5, 0.5, 0.5);
                    this.gameSettings.players[1].car.scale.set(0.5, 0.5, 0.5);
                    this.setState(new GamePlayState(this.app, this.gameSettings));
                    break;
                case "Easy":
                    this.gameSettings.difficulty = 5;
                    this.buttonsGroup.remove(this.buttonsGroup.getObjectByName("Easy"));
                    this.buildButton("Hard", "#00ff00", 2, 0.6, 0, 4.5, 0);
                    break;
                case "Hard":
                    this.gameSettings.difficulty = 7;
                    this.buttonsGroup.remove(this.buttonsGroup.getObjectByName("Hard"));
                    this.buildButton("Easy", "#00ff00", 2, 0.6, 0, 4.5, 0);
                    break;
                case "Back":
                    this.app.scene.remove(this.playersName);
                    this.setState(new MainMenuState(this.app));
                    break;
            }
        }

        const intersects2 = this.raycaster.intersectObjects(this.playerCarsGroup.children);

        if (intersects2.length > 0) {
            this.gameSettings.players[0].car.scale.set(0.5, 0.5, 0.5);
            this.gameSettings.players[0].car.position.y = 0;
            this.gameSettings.players[0].car = intersects2[0].object.parent;
        }

        const intersects3 = this.raycaster.intersectObjects(this.cpuCarsGroup.children);

        if (intersects3.length > 0) {
            this.gameSettings.players[1].car.scale.set(0.5, 0.5, 0.5);
            this.gameSettings.players[1].car.position.y = 0;
            this.gameSettings.players[1].car = intersects3[0].object.parent;
        }

    }

}

export { GameSettingsState };