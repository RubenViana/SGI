import { State } from "./State.js";
import { GamePauseState } from "./GamePauseState.js";
import * as THREE from "three";

class GamePlayState extends State {
    constructor(app, gameSettings) {
        super(app);
        this.name = "GamePlayState";
        this.gameSettings = gameSettings;
        
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
        };

        // add car to the scene
        this.app.scene.add(this.gameSettings.players[0].car);

        // clock
        this.elapsedTime = 0;
        this.clock = new THREE.Clock();

        // create car camera
        this.carCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.carCamera.position.set(0, 5, -10); // adjust the position relative to the car
        this.carCamera.lookAt(this.gameSettings.players[0].car.position);
        this.app.cameras["CarThirdPerson"] = this.carCamera;
    }

    update() {
        // update clock
        this.elapsedTime += this.clock.getDelta();


        // game logic

        // check if car crosses the finish line -> lap++
        // if laps == gameSettings.laps -> time = clock.getTime
        // when both players laps == gameSettings.laps -> game over
        // check which player has the best time -> determine winner
        // got to game over state

        // check if car is out of bounds -> decrease car v_max
        // check car collision with other car -> decrease car insta velocity

        // check car collision with power up -> add power up to car
        // check car collision with obstacle -> delay car


        this.updateCarCamera();

        this.updateHUD();

        this.updateCar();
        // add a change camera option

    }

    updateCarCamera() {
        // Set the car camera's position to follow the car
        const car = this.gameSettings.players[0].car;
        const distance = 10; // Distance from the car
        const yOffset = 5; // Vertical offset from the car

        const angle = car.rotation.y;
        const offsetX = distance * Math.cos(-angle);
        const offsetZ = distance * Math.sin(-angle);

        this.carCamera.position.x = car.position.x - offsetX;
        this.carCamera.position.y = car.position.y + yOffset;
        this.carCamera.position.z = car.position.z - offsetZ;

        this.app.controls.target = car.position;
    }

    onKeyPress(event) {
        switch (event.keyCode) {
            case 112: // p
                // document.getElementById("gameHUD").style.display = "none";
                this.clock.stop(); // quick fix for stopping the clock
                this.setState(new GamePauseState(this.app, this));
                break;
            case 99: // c
                this.app.setActiveCamera("CarThirdPerson");
                break;
        }
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case 87: // w
                this.keys.forward = true;
                break;
            case 65: // a
                this.keys.left = true;
                break;
            case 83: // s
                this.keys.backward = true;
                break;
            case 68: // d
                this.keys.right = true;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case 87: // w
                this.keys.forward = false;
                break;
            case 65: // a
                this.keys.left = false;
                break;
            case 83: // s
                this.keys.backward = false;
                break;
            case 68: // d
                this.keys.right = false;
                break;
        }
    }

    updateCar() {
        // update car position
        if (this.keys.forward) {
            this.app.car.accelerate_forward();
        }

        if (this.keys.backward) {
            this.app.car.accelerate_backward();
        }

        if (!this.keys.forward && !this.keys.backward){
            this.app.car.decelerate();
        }

        if (this.keys.left) {
            this.app.car.turnLeft();
        }

        if (this.keys.right) {
            this.app.car.turnRight();
        }

        if (!this.keys.left && !this.keys.right){
            this.app.car.unTurn();
        }

        // update car position
        this.app.car.update();
    }

    updateHUD() {
        document.getElementById("gameHUD").style.display = "flex";
        document.getElementById("laps").innerHTML = "Lap: " + this.gameSettings.players[0].laps + "/" + this.gameSettings.laps;
        document.getElementById("time").innerHTML = "Time: " + this.elapsedTime.toFixed(2) + "s";
    }

}

export { GamePlayState };