import { State } from "./State.js";

class GamePauseState extends State {
    constructor(app, previousState) {
        super(app);
        this.name = "GamePauseState";
        this.previousState = previousState;

    }

    update() {
        document.getElementById("pauseHUD").style.display = "flex";
    }

    onKeyPress(event) {
        switch (event.keyCode) {
            case 112: // p
                document.getElementById("pauseHUD").style.display = "none";
                this.setState(this.previousState); // if the keys were pressed, they will still be pressed!!!
                this.previousState.clock.start(); // quick fix for stopping the clock
                break;
        }
    }
}

export { GamePauseState };