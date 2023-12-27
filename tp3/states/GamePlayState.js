import { State } from "./State.js";
import { GamePauseState } from "./GamePauseState.js";
import * as THREE from "three";

class GamePlayState extends State {
    constructor(app) {
        super(app);
        this.name = "GamePlayState";
        
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
        };

        // add car to the scene
        this.app.scene.add(this.app.car);

        // clock
        // this.elapsedTime = 0;
        // this.clock = new THREE.Clock();

        // game settings
        this.gameSettings = {
            laps: 3,
            difficulty: 1,
            track: 1,
            players: [
                {
                    name: "Player 1",
                    car: 1,
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
    }

    update() {
        // game logic

        // check if car crosses the finish line -> lap++
        // if laps == gameSettings.laps -> time = clock.getTime
        // when both players laps == gameSettings.laps -> game over
        // check which player has the best time -> determine winner
        // got to game over state



        //display the main menu
        document.getElementById("gameHUD").style.display = "flex";

        this.updateCar();
        // add a change camera option

        // this.elapsedTime += this.clock.getDelta();
        // console.log(this.elapsedTime);
    }

    onKeyPress(event) {
        switch (event.keyCode) {
            case 112: // p
                document.getElementById("gameHUD").style.display = "none";
                // this.clock.stop(); // quick fix for stopping the clock
                this.setState(new GamePauseState(this.app, this));
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

}

export { GamePlayState };