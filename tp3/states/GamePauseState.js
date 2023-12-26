import { State } from "./State.js";

class GamePauseState extends State {
    constructor(app, previousState) {
        super(app);
        this.name = "GamePauseState";
        this.previousState = previousState;

        this.onKeyPress = this.onKeyPress.bind(this);
        document.addEventListener("keypress", this.onKeyPress, false);
    }

    update() {
        document.getElementById("pauseHUD").style.display = "flex";
    }

    onKeyPress(event) {
        switch (event.keyCode) {
            case 112: // p
                console.log("unpause");
                this.setState(this.previousState); //TODO: implement pause state, need to save the current state
                break;
        }
    }
}

export { GamePauseState };