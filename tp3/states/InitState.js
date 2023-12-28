import { State } from "./State.js";
import { MainMenuState } from "./MainMenuState.js";
import { MyPlane } from "../objects/MyPlane.js";
import { MyTrack } from "../objects/MyTrack.js";
import { MyVehicle } from "../objects/MyVehicle.js";
import { MyPowerUp } from "../objects/MyPowerUp.js";
import { MyObstacle } from "../objects/MyObstacle.js";
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

    // Add Plane to Scene
    this.app.plane = new MyPlane();

    // Add Track to Scene
    this.app.track = new MyTrack();

    // Add PowerUp to Scene
    this.app.powerUp = new MyPowerUp();

    // Add Car to Scene
    this.app.car = new MyVehicle(1.5, -0.5, 0.06, 0.03, Math.PI / 4, Math.PI / 90);
    this.app.car.scale.set(0.5, 0.5, 0.5);
    this.app.car.position.set(0, 0.4, 0);

    // Add Obstacles to Scene

    // First Curve
    const obstacles4 = new MyObstacle();
    obstacles4.position.set(80, 0, 605);
    const obstacles5 = new MyObstacle();
    obstacles5.position.set(54, 0, 590);
    obstacles5.rotateY(-Math.PI / 5);
    const obstacles6 = new MyObstacle();
    obstacles6.position.set(111, 0, 605);
    obstacles6.rotateY(Math.PI / 5);

    // Second Curve
    const obstacles1 = new MyObstacle();
    obstacles1.position.set(120, 0, 160);
    const obstacles2 = new MyObstacle();
    obstacles2.position.set(94, 0, 175);
    obstacles2.rotateY(Math.PI / 5);
    const obstacles3 = new MyObstacle();
    obstacles3.position.set(151, 0, 160);
    obstacles3.rotateY(-Math.PI / 5);

    // Third Curve
    const obstacles7 = new MyObstacle();
    obstacles7.position.set(265, 0, 615);
    const obstacles8 = new MyObstacle();
    obstacles8.position.set(296, 0, 615);
    obstacles8.rotateY(Math.PI / 5);
    const obstacles9 = new MyObstacle();
    obstacles9.position.set(238, 0, 600);
    obstacles9.rotateY(-Math.PI / 5);

    // Fourth Curve
    const obstacles10 = new MyObstacle();
    obstacles10.position.set(300, 0, 300);
    const obstacles11 = new MyObstacle();
    obstacles11.position.set(300, 0, 325);
    obstacles11.rotateY(-Math.PI / 5);
    const obstacles12 = new MyObstacle();
    obstacles12.position.set(300, 0, 300);
    obstacles12.rotateY(Math.PI / 5);

    this.app.obstacles = new THREE.Group();
    this.app.obstacles.add(obstacles1, obstacles2, obstacles3, obstacles4, obstacles5, obstacles6, obstacles7, obstacles8, obstacles9,
                   obstacles10, obstacles11, obstacles12);
  
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