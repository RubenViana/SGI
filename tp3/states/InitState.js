import { State } from "./State.js";
import { MainMenuState } from "./MainMenuState.js";

class InitState extends State {
  constructor(app) {
    super(app);
    this.name = "InitState";

    // myTrack = new MyTrack(this.app);
    // this.app.contents.myTrack = myTrack;

    // document.getElementById("HUD").innerHTML = this.name;
  }

  update() {
    //load all the assets needed for the application

    this.setState(new MainMenuState(this.app));
  }
}

export { InitState };