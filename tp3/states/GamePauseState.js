import { State } from "./State.js";
import { PauseMenu } from "../Pause.js";

class GamePauseState extends State {
    constructor(app, previousState) {
        super(app);
        this.name = "GamePauseState";
        this.previousState = previousState;

        this.pauseMenu = new PauseMenu();
        this.pauseMenu.scale.set(100, 80, 1);
        this.pauseMenu.position.set(window.innerWidth / 40, window.innerHeight / 30, 0);
        this.app.HUDscene.add(this.pauseMenu);
        this.pauseMenu.visible = false;
    }

    update() {
        //document.getElementById("pauseHUD").style.display = "flex";
        this.pauseMenu.updateText();
        this.pauseMenu.visible = true;
    }

    onKeyPress(event) {
        switch (event.keyCode) {
            case 112: // p
                // document.getElementById("pauseHUD").style.display = "none";
                this.pauseMenu.visible = false;
                this.setState(this.previousState); // if the keys were pressed, they will still be pressed!!!
                this.previousState.clock.start(); // quick fix for stopping the clock
                this.previousState.enemyClock.start(); // quick fix for stopping the clock
                break;
        }
    }
}

export { GamePauseState };