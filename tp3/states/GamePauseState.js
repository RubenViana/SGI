import { State } from "./State.js";
import { Sprite } from "../sprites/Sprite.js";

class GamePauseState extends State {
    constructor(app, previousState) {
        super(app);
        this.name = "GamePauseState";
        this.previousState = previousState;

        this.pauseMenu = new Sprite("Pause")
        this.pauseMenu.scale.set(200, 160, 1);
        this.pauseMenu.position.set(window.innerWidth / 40, window.innerHeight/4, 0);
        this.app.HUDscene.add(this.pauseMenu);
        this.pauseMenu.visible = false;
    }

    update() {
        this.pauseMenu.visible = true;
    }

    onKeyPress(event) {
        switch (event.keyCode) {
            case 112: // p
                // document.getElementById("pauseHUD").style.display = "none";
                this.pauseMenu.visible = false;
                this.setState(this.previousState); // if the keys were pressed, they will still be pressed!!!
                this.previousState.clock.start(); // quick fix for stopping the clock
                this.previousState.resetKeys();
                this.previousState.enemyClock.start();
                break;
        }
    }
}

export { GamePauseState };