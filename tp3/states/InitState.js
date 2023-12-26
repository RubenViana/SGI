import { State } from "./State.js";
import { MainMenuState } from "./MainMenuState.js";
import { MyVehicle } from "../objects/MyVehicle.js";

class InitState extends State {
  constructor(app) {
    super(app);
    this.name = "InitState";

    // myTrack = new MyTrack(this.app);
    // this.app.contents.myTrack = myTrack;

    // var loader = new GLTFLoader();
    // var model;

    // loader.load(
    // './objects/porsche_911_930_turbo/scene.gltf',
    // function (object) {
    //     model = object;
    //     this.app.scene.add(model);
    // },
    // function (xhr) {
    //     console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    // },
    // function (error) {
    //     console.log('Error loading model', error);
    // }
    // );

    // Add Car to Scene
    this.app.car = new MyVehicle();
    
  }

  update() {
    //load all the assets needed for the application

    this.setState(new MainMenuState(this.app));
  }
}

export { InitState };