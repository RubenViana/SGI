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
    const powerUps = new THREE.Group();
    const pu1 = new MyPowerUp();
    pu1.position.set(0, 3, 100);
    pu1.update();
    const pu2 = new MyPowerUp();
    pu2.position.set(0, 3, 200);
    pu2.update();
    const pu3 = new MyPowerUp();
    pu3.position.set(5, 3, 130);
    pu3.update();

    powerUps.add(
      pu1,
      pu2,
      pu3
    );

    this.app.powerUps = powerUps;

    // Add Car to Scene
    this.app.car = new MyVehicle(1.5, -0.5, 0.06, 0.03, Math.PI / 4, Math.PI / 90);
    this.app.car.scale.set(0.5, 0.5, 0.5);
    this.app.car.position.set(0, 0.4, 0);

    // Add Obstacles to Scene   !!! -> this is not the correct 'obstacles' object, this is the delimitation of the track that needs to be in the plane object

    this.obstacles = new THREE.Group();
    this.app.obstacles = this.obstacles;

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

    const obstacles10 = new MyObstacle();
    obstacles10.position.set(330, 0, 340);
    const obstacles11 = new MyObstacle();
    obstacles11.position.set(361, 0, 340);
    obstacles11.rotateY(-Math.PI / 5);
    const obstacles12 = new MyObstacle();
    obstacles12.position.set(304, 0, 355);
    obstacles12.rotateY(Math.PI / 5);

    // Fifth Curve
    const obstacles13 = new MyObstacle();
    obstacles13.position.set(400, 0, 605);
    const obstacles14 = new MyObstacle();
    obstacles14.position.set(374, 0, 590);
    obstacles14.rotateY(-Math.PI / 5);
    const obstacles15 = new MyObstacle();
    obstacles15.position.set(431, 0, 605);

    // Sixth Curve
    const obstacles16 = new MyObstacle();
    obstacles16.position.set(573, 0, 564);
    obstacles16.rotateY(Math.PI / 5);
    const obstacles17 = new MyObstacle();
    obstacles17.position.set(596, 0, 544);
    obstacles17.rotateY(Math.PI / 2);
    const obstacles18 = new MyObstacle();
    obstacles18.position.set(596, 0, 513);
    obstacles18.rotateY(Math.PI / 2);

    // Seventh Curve
    const obstacles19 = new MyObstacle();
    obstacles19.position.set(580, 0, 300);
    obstacles19.rotateY(-Math.PI / 3);
    const obstacles20 = new MyObstacle();
    obstacles20.position.set(555, 0, 282);
    obstacles20.rotateY(-Math.PI / 5);
    const obstacles21 = new MyObstacle();
    obstacles21.position.set(528, 0, 267);
    obstacles21.rotateY(-Math.PI / 7);

    // Eighth Curve
    const obstacles22 = new MyObstacle();
    obstacles22.position.set(370, 0, 260);
    obstacles22.rotateY(Math.PI / 2);
    const obstacles23 = new MyObstacle();
    obstacles23.position.set(370, 0, 229);
    obstacles23.rotateY(Math.PI / 3);
    const obstacles24 = new MyObstacle();
    obstacles24.position.set(370, 0, 267);
    obstacles24.rotateY(-Math.PI / 3);

    // Ninth Curve
    const obstacles25 = new MyObstacle();
    obstacles25.position.set(548, 0, 245);
    obstacles25.rotateY(Math.PI / 7);
    const obstacles26 = new MyObstacle();
    obstacles26.position.set(575, 0, 230);
    obstacles26.rotateY(Math.PI / 3);
    const obstacles27 = new MyObstacle();
    obstacles27.position.set(589, 0, 203);
    obstacles27.rotateY(Math.PI / 2);

    // Tenth Curve
    const obstacles28 = new MyObstacle();
    obstacles28.position.set(345, 0, -18);
    const obstacles29 = new MyObstacle();  
    obstacles29.position.set(319, 0, -3);
    obstacles29.rotateY(Math.PI / 5);
    const obstacles30 = new MyObstacle();
    obstacles30.position.set(316, 0, 2);
    obstacles30.rotateY(-Math.PI / 1.5);

    // Eleventh Curve
    const obstacles31 = new MyObstacle();
    obstacles31.position.set(260, 0, 300);
    const obstacles32 = new MyObstacle();
    obstacles32.position.set(234, 0, 285);
    obstacles32.rotateY(-Math.PI / 5);
    const obstacles33 = new MyObstacle();
    obstacles33.position.set(291, 0, 300);
    obstacles33.rotateY(Math.PI / 5);

    // Twelfth Curve
    const obstacles34 = new MyObstacle();
    obstacles34.position.set(150, 0, -18);
    const obstacles35 = new MyObstacle();
    obstacles35.position.set(180, 0, -15);
    obstacles35.rotateY(-Math.PI / 5);
    const obstacles36 = new MyObstacle();
    obstacles36.position.set(205, 0, 3);
    obstacles36.rotateY(-Math.PI / 4);

    // Thirteenth Curve
    const obstacles37 = new MyObstacle();
    obstacles37.position.set(40, 0, -5);
    obstacles37.rotateY(Math.PI / 7);
    const obstacles38 = new MyObstacle();
    obstacles38.position.set(14, 0, 12);
    obstacles38.rotateY(Math.PI / 5);
    const obstacles39 = new MyObstacle();
    obstacles39.position.set(-2, 0, 38);
    obstacles39.rotateY(Math.PI / 3);

    const obstacles = new THREE.Group();
    obstacles.add(obstacles1, obstacles2, obstacles3, obstacles4, obstacles5, obstacles6, obstacles7, obstacles8, obstacles9, obstacles10, obstacles11, obstacles12, obstacles13, obstacles14, obstacles15, obstacles16, obstacles17, obstacles18,
      obstacles19, obstacles20, obstacles21, obstacles22, obstacles23, obstacles24, obstacles25, obstacles26, obstacles27,
      obstacles28, obstacles29, obstacles30, obstacles31, obstacles32, obstacles33, obstacles34, obstacles35, obstacles36,
      obstacles37, obstacles38, obstacles39);

    this.app.obstacles = obstacles;

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