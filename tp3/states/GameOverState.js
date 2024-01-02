import {State} from "./State.js";

class GameOverState extends State {
    constructor(app,) {
        super(app);
        this.name = "GameOverState";
    }

    update() {
        // display the final results and make celebration !
    }

    
}