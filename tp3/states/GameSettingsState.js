import { State } from "./State.js";
import { GamePlayState } from "./GamePlayState.js";
import { MainMenuState } from "./MainMenuState.js";

class GameSettingsState extends State {
    constructor(app) {
        super(app);
        this.name = "GameSettingsState";

        document.getElementById("startButton").addEventListener("click", () => {
            document.getElementById("gameSettingsHUD").style.display = "none";
            this.setState(new GamePlayState(this.app));
        });

        document.getElementById("backButton").addEventListener("click", () => {
            document.getElementById("gameSettingsHUD").style.display = "none";
            this.setState(new MainMenuState(this.app));
        });
    }

    update() {

        document.getElementById("gameSettingsHUD").style.display = "flex";
    }

}

export { GameSettingsState };