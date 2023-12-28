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

    this.plane = new MyPlane();
    this.app.plane = this.plane;

    // Add Track to Scene

    this.app.track = new MyTrack();

    // Add PowerUp to Scene

    this.app.powerUp = new MyPowerUp();

    // Add Car to Scene

    this.app.car = new MyVehicle();
    this.app.car.scale.set(0.5, 0.5, 0.5);
    this.app.car.position.set(0, 0.4, 0);

    // Add Obstacles to Scene

    this.obstacles = new THREE.Group();
    this.app.obstacles = this.obstacles;

    // First Curve
    this.obstacles4 = new MyObstacle();
    this.obstacles4.position.set(80, 0, 605);
    this.obstacles5 = new MyObstacle();
    this.obstacles5.position.set(54, 0, 590);
    this.obstacles5.rotateY(-Math.PI / 5);
    this.obstacles6 = new MyObstacle();
    this.obstacles6.position.set(111, 0, 605);
    this.obstacles6.rotateY(Math.PI / 5);

    // Second Curve
    this.obstacles1 = new MyObstacle();
    this.obstacles1.position.set(120, 0, 160);
    this.obstacles2 = new MyObstacle();
    this.obstacles2.position.set(94, 0, 175);
    this.obstacles2.rotateY(Math.PI / 5);
    this.obstacles3 = new MyObstacle();
    this.obstacles3.position.set(151, 0, 160);
    this.obstacles3.rotateY(-Math.PI / 5);

    // Third Curve
    this.obstacles7 = new MyObstacle();
    this.obstacles7.position.set(265, 0, 615);
    this.obstacles8 = new MyObstacle();
    this.obstacles8.position.set(296, 0, 615);
    this.obstacles8.rotateY(Math.PI / 5);
    this.obstacles9 = new MyObstacle();
    this.obstacles9.position.set(238, 0, 600);
    this.obstacles9.rotateY(-Math.PI / 5);

    // Fourth Curve
    this.obstacles10 = new MyObstacle();
    this.obstacles10.position.set(330, 0, 340);
    this.obstacles11 = new MyObstacle();
    this.obstacles11.position.set(361, 0, 340);
    this.obstacles11.rotateY(-Math.PI / 5);
    this.obstacles12 = new MyObstacle();
    this.obstacles12.position.set(304, 0, 355);
    this.obstacles12.rotateY(Math.PI / 5);

    // Fifth Curve
    this.obstacles13 = new MyObstacle();
    this.obstacles13.position.set(400, 0, 605);
    this.obstacles14 = new MyObstacle();
    this.obstacles14.position.set(374, 0, 590);
    this.obstacles14.rotateY(-Math.PI / 5);
    this.obstacles15 = new MyObstacle();
    this.obstacles15.position.set(431, 0, 605);

    // Sixth Curve
    this.obstacles16 = new MyObstacle();
    this.obstacles16.position.set(573, 0, 564);
    this.obstacles16.rotateY(Math.PI / 5);
    this.obstacles17 = new MyObstacle();
    this.obstacles17.position.set(596, 0, 544);
    this.obstacles17.rotateY(Math.PI / 2);
    this.obstacles18 = new MyObstacle();
    this.obstacles18.position.set(596, 0, 513);
    this.obstacles18.rotateY(Math.PI / 2);

    // Seventh Curve
    this.obstacles19 = new MyObstacle();
    this.obstacles19.position.set(580, 0, 300);
    this.obstacles19.rotateY(-Math.PI / 3);
    this.obstacles20 = new MyObstacle();
    this.obstacles20.position.set(555, 0, 282);
    this.obstacles20.rotateY(-Math.PI / 5);
    this.obstacles21 = new MyObstacle();
    this.obstacles21.position.set(528, 0, 267);
    this.obstacles21.rotateY(-Math.PI / 7);

    // Eighth Curve
    this.obstacles22 = new MyObstacle();
    this.obstacles22.position.set(370, 0, 260);
    this.obstacles22.rotateY(Math.PI / 2);
    this.obstacles23 = new MyObstacle();
    this.obstacles23.position.set(370, 0, 229);
    this.obstacles23.rotateY(Math.PI / 3);
    this.obstacles24 = new MyObstacle();
    this.obstacles24.position.set(370, 0, 267);
    this.obstacles24.rotateY(-Math.PI / 3);

    // Ninth Curve
    this.obstacles25 = new MyObstacle();
    this.obstacles25.position.set(548, 0, 245);
    this.obstacles25.rotateY(Math.PI / 7);
    this.obstacles26 = new MyObstacle();
    this.obstacles26.position.set(575, 0, 230);
    this.obstacles26.rotateY(Math.PI / 3);
    this.obstacles27 = new MyObstacle();
    this.obstacles27.position.set(589, 0, 203);
    this.obstacles27.rotateY(Math.PI / 2);

    // Tenth Curve
    this.obstacles28 = new MyObstacle();
    this.obstacles28.position.set(345, 0, -18);
    this.obstacles29 = new MyObstacle();  
    this.obstacles29.position.set(319, 0, -3);
    this.obstacles29.rotateY(Math.PI / 5);
    this.obstacles30 = new MyObstacle();
    this.obstacles30.position.set(316, 0, 2);
    this.obstacles30.rotateY(-Math.PI / 1.5);

    // Eleventh Curve
    this.obstacles31 = new MyObstacle();
    this.obstacles31.position.set(260, 0, 300);
    this.obstacles32 = new MyObstacle();
    this.obstacles32.position.set(234, 0, 285);
    this.obstacles32.rotateY(-Math.PI / 5);
    this.obstacles33 = new MyObstacle();
    this.obstacles33.position.set(291, 0, 300);
    this.obstacles33.rotateY(Math.PI / 5);

    // Twelfth Curve
    this.obstacles34 = new MyObstacle();
    this.obstacles34.position.set(150, 0, -18);
    this.obstacles35 = new MyObstacle();
    this.obstacles35.position.set(180, 0, -15);
    this.obstacles35.rotateY(-Math.PI / 5);
    this.obstacles36 = new MyObstacle();
    this.obstacles36.position.set(205, 0, 3);
    this.obstacles36.rotateY(-Math.PI / 4);

    // Thirteenth Curve
    this.obstacles37 = new MyObstacle();
    this.obstacles37.position.set(40, 0, -5);
    this.obstacles37.rotateY(Math.PI / 7);
    this.obstacles38 = new MyObstacle();
    this.obstacles38.position.set(14, 0, 12);
    this.obstacles38.rotateY(Math.PI / 5);
    this.obstacles39 = new MyObstacle();
    this.obstacles39.position.set(-2, 0, 38);
    this.obstacles39.rotateY(Math.PI / 3);

    this.obstacles.add(this.obstacles1, this.obstacles2, this.obstacles3, this.obstacles4, this.obstacles5, this.obstacles6, this.obstacles7, this.obstacles8, this.obstacles9,
                   this.obstacles10, this.obstacles11, this.obstacles12, this.obstacles13, this.obstacles14, this.obstacles15, this.obstacles16, this.obstacles17, this.obstacles18,
                   this.obstacles19, this.obstacles20, this.obstacles21, this.obstacles22, this.obstacles23, this.obstacles24, this.obstacles25, this.obstacles26, this.obstacles27,
                   this.obstacles28, this.obstacles29, this.obstacles30, this.obstacles31, this.obstacles32, this.obstacles33, this.obstacles34, this.obstacles35, this.obstacles36,
                   this.obstacles37, this.obstacles38, this.obstacles39);


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