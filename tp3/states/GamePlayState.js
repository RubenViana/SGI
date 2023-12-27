import { State } from "./State.js";
import { GamePauseState } from "./GamePauseState.js";

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

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

        document.addEventListener("keydown", this.onKeyDown, false);
        document.addEventListener("keyup", this.onKeyUp, false);
        document.addEventListener("keypress", this.onKeyPress, false); //Not working properly!


        // add car to the scene
        this.app.scene.add(this.app.car);
    }

    update() {
        //display the main menu
        document.getElementById("gameHUD").style.display = "flex";


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

    onKeyPress(event) {
        switch (event.keyCode) {
            case 112: // p
                console.log("pause");
                // this.setState(new GamePauseState(this.app, this)); //TODO: implement pause state, need to save the current state
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

}

export { GamePlayState };