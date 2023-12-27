import { State } from "./State.js";
import { MainMenuState } from "./MainMenuState.js";
import { MyVehicle } from "../objects/MyVehicle.js";
import * as THREE from 'three';

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

    // this.spriteLoader(); // load sprite to HUD
  }

  update() {
    //load all the assets needed for the application

    this.setState(new MainMenuState(this.app));
  }

  spriteLoader() {
    // Create a texture loader
    const textureLoader = new THREE.TextureLoader();

    // Load your spritesheet texture
    textureLoader.load('../tp1/textures/roni.jpg', (spritesheetTexture) => {
        // Define the sprite dimensions in the spritesheet
        spritesheetTexture.colorSpace = THREE.SRGBColorSpace;

        // Create a material using the spritesheet texture
        const material = new THREE.SpriteMaterial({ map: spritesheetTexture });

        let width = material.map.image.width;
        let height = material.map.image.height;

        // Create a sprite using the material
        this.sprite = new THREE.Sprite(material);

        // Set the scale of the sprite to match the dimensions of a single frame in the spritesheet
        this.sprite.scale.set(width, height, 1);

        this.sprite.center.set(0, 0);

        // Add the sprite to the scene
        this.app.HUDscene.add(this.sprite);

        width = window.innerWidth / 2;
        height = window.innerHeight / 2;

        this.sprite.position.set( 0, 0, 1 ); // top left
    });
  }
}

export { InitState };