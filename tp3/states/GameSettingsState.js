import { State } from "./State.js";
import { GamePlayState } from "./GamePlayState.js";
import { MainMenuState } from "./MainMenuState.js";

class GameSettingsState extends State {
    constructor(app) {
        super(app);
        this.name = "GameSettingsState";

        document.getElementById("startButton").addEventListener("click", () => {
            document.getElementById("gameSettingsHUD").style.display = "none";
            this.setState(new GamePlayState(this.app, this.gameSettings));
        });

        document.getElementById("backButton").addEventListener("click", () => {
            document.getElementById("gameSettingsHUD").style.display = "none";
            this.setState(new MainMenuState(this.app));
        });

        // game settings
        this.gameSettings = {
            laps: 3,
            difficulty: 1,
            track: 1,
            players: [
                {
                    name: "Player 1",
                    car: this.app.car,
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
        document.getElementById("gameSettingsHUD").style.display = "flex";

        // make game settings configurable here
    }

}

export { GameSettingsState };