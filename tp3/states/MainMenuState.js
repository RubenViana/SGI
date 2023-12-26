import { State } from "./State.js";
import { GameSettingsState } from "./GameSettingsState.js";

class MainMenuState extends State {
    constructor(app) {
        super(app);
        this.name = "MainMenuState";
        
        // document.getElementById("HUD").innerHTML = this.name;

        document.getElementById("playButton").addEventListener("click", () => {
            document.getElementById("initalMenuHUD").style.display = "none";
            this.setState(new GameSettingsState(this.app));
        });
    }

    update() {
        //display the main menu
        document.getElementById("initalMenuHUD").style.display = "flex";
    }

}

export { MainMenuState };