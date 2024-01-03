import { State } from "./State.js";
import { MainMenuState } from "./MainMenuState.js";
import { MyPlane } from "../objects/MyPlane.js";
import { MyTrack } from "../objects/MyTrack.js";
import { MyVehicle } from "../objects/MyVehicle.js";
import { MyPowerUp } from "../objects/MyPowerUp.js";
import { MyObstacle } from "../objects/MyObstacle.js";
import { MyAdvertisement } from "../objects/MyAdvertisement.js";
import { MyBoxSeparator } from "../objects/MyBoxSeparator.js";
import { MyGoal } from "../objects/MyGoal.js";
import { MyLakes } from "../objects/MyLakes.js";
import { MyTrees } from "../objects/MyTrees.js";
import { MyRocks } from "../objects/MyRocks.js";
import { MyPitStop } from "../objects/MyPitStop.js";
import { MyRoad } from "../objects/MyRoad.js";
import { MySeparator } from "../objects/MySeparator.js";
import { MyLimiters } from "../objects/MyLimiters.js";
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

    // Add Track to Scene
    this.app.track = new MyTrack();

    // Add Obstacles to Scene
    const obstacles = new THREE.Group();

    // const obstacle1 = new MyObstacle("speed");
    // obstacle1.position.set(20, 3, 100);
    // obstacle1.update();
    // const obstacle2 = new MyObstacle("time");
    // obstacle2.position.set(20, 3, 200);
    // obstacle2.update();

    // obstacles.add(
    //   obstacle1,
    //   obstacle2
    // );

    const numberOfObstacles = 5;
    for (let i = 0; i < numberOfObstacles; i++) {
      for (let j = 0; j < numberOfObstacles; j++) {
        const obstacle = Math.random() < 0.5 ? new MyObstacle("speed") : new MyObstacle("time");
        obstacle.position.set(470 + i*4, 2, 440 + j*4);
        obstacle.update();
        obstacles.add(obstacle);
      }
    }

    this.app.obstacles = obstacles;


    // Add PowerUp to Scene
    const powerUps = new THREE.Group();
    const pu1 = new MyPowerUp("speed");
    pu1.position.set(0, 2, 100);
    pu1.update();
    const pu2 = new MyPowerUp("time");
    pu2.position.set(0, 2, 200);
    pu2.update();

    powerUps.add(
      pu1,
      pu2
    );

    this.app.powerUps = powerUps;

    this.app.playerCars = [
      new MyVehicle(1.5, -0.5, 0.06, 0.03, Math.PI / 4, Math.PI / 90, 0xff0000),
      new MyVehicle(1.5, -0.5, 0.06, 0.03, Math.PI / 4, Math.PI / 90, 0x00ff00),
      new MyVehicle(1.5, -0.5, 0.06, 0.03, Math.PI / 4, Math.PI / 90, 0x0000ff),
    ];

    this.app.cpuCars = [
      new MyVehicle(1.5, -0.5, 0.06, 0.03, Math.PI / 4, Math.PI / 90, 0xff0000),
      new MyVehicle(1.5, -0.5, 0.06, 0.03, Math.PI / 4, Math.PI / 90, 0x0000ff),
    ];

   
    // Add Advertisement to Scene

    this.advertisement = new MyAdvertisement();

    // Add Box Separator to Scene

    this.boxSeparator = new MyBoxSeparator();

    // Add Goal to Scene

    this.goal = new MyGoal();

    // Add Lakes to Scene

    this.lakes = new MyLakes();

    // Add Trees to Scene

    this.trees = new MyTrees();

    // Add Rocks to Scene

    this.rocks = new MyRocks();

    // Add PitStop to Scene

    this.pitStop = new MyPitStop();

    // Add Road to Scene

    this.road = new MyRoad();

    // Add Separator to Scene

    this.separator = new MySeparator();

    // Add limiters to Scene

    const limiters = new THREE.Group();

    // First Curve
    const limiters4 = new MyLimiters(83, 610, 0);
    limiters4.update();
    const limiters5 = new MyLimiters(55, 600, -Math.PI / 5);
    limiters5.update();
    const limiters6 = new MyLimiters(111, 600, Math.PI / 5);
    limiters6.update();

    // Second Curve
    const limiters1 = new MyLimiters(117, 155, 0);
    limiters1.update();
    const limiters2 = new MyLimiters(90, 166, Math.PI / 5);
    limiters2.update();
    const limiters3 = new MyLimiters(145, 165, -Math.PI / 5);
    limiters3.update();

    // Third Curve
    const limiters7 = new MyLimiters(265, 615, 0);
    limiters7.update();
    const limiters8 = new MyLimiters(293, 605, Math.PI / 5);
    limiters8.update();
    const limiters9 = new MyLimiters(237, 605, -Math.PI / 5);
    limiters9.update();

    // Fourth Curve
    const limiters10 = new MyLimiters(330, 340, 0);
    limiters10.update();
    const limiters11 = new MyLimiters(358, 349, -Math.PI / 5);
    limiters11.update();
    const limiters12 = new MyLimiters(302, 349, Math.PI / 5);
    limiters12.update();

    // Fifth Curve
    const limiters13 = new MyLimiters(400, 605, 0);
    limiters13.update();
    const limiters14 = new MyLimiters(372, 595, -Math.PI / 5);
    limiters14.update();
    const limiters15 = new MyLimiters(431, 605, 0);
    limiters15.update();

    // Sixth Curve
    const limiters16 = new MyLimiters(575, 569, Math.PI / 5);
    limiters16.update();
    const limiters17 = new MyLimiters(590, 544, Math.PI / 2);
    limiters17.update();
    const limiters18 = new MyLimiters(590, 513, Math.PI / 2);
    limiters18.update();

    // Seventh Curve
    const limiters19 = new MyLimiters(576, 310, -Math.PI / 3);
    limiters19.update();
    const limiters20 = new MyLimiters(555, 287, -Math.PI / 5);
    limiters20.update();
    const limiters21 = new MyLimiters(528, 272, -Math.PI / 7);
    limiters21.update();

    // Eighth Curve
    const limiters22 = new MyLimiters(355, 250, Math.PI / 2);
    limiters22.update();
    const limiters23 = new MyLimiters(365, 221, Math.PI / 3);
    limiters23.update();
    const limiters24 = new MyLimiters(365, 279, -Math.PI / 3);
    limiters24.update();

    // Ninth Curve
    const limiters25 = new MyLimiters(548, 240, Math.PI / 7);
    limiters25.update();
    const limiters26 = new MyLimiters(570, 220, Math.PI / 3);
    limiters26.update();
    const limiters27 = new MyLimiters(579, 192, Math.PI / 2);
    limiters27.update();

    // Tenth Curve
    const limiters28 = new MyLimiters(355, -18, 0);
    limiters28.update();
    const limiters29 = new MyLimiters(327, -9, Math.PI / 5);
    limiters29.update();
    const limiters30 = new MyLimiters(306, 12, -Math.PI / 1.5);
    limiters30.update();

    // Eleventh Curve
    const limiters31 = new MyLimiters(260, 300, 0);
    limiters31.update();
    const limiters32 = new MyLimiters(232, 290, -Math.PI / 5);
    limiters32.update();
    const limiters33 = new MyLimiters(289, 290, Math.PI / 5);
    limiters33.update();

    // Twelfth Curve
    const limiters34 = new MyLimiters(150, -18, 0);
    limiters34.update();
    const limiters35 = new MyLimiters(179, -10, -Math.PI / 5);
    limiters35.update();
    const limiters36 = new MyLimiters(202, 10, -Math.PI / 4);
    limiters36.update();

    // Thirteenth Curve
    const limiters37 = new MyLimiters(32, -3, Math.PI / 7);
    limiters37.update();
    const limiters38 = new MyLimiters(6, 12, Math.PI / 5);
    limiters38.update();
    const limiters39 = new MyLimiters(-14, 34, Math.PI / 3);
    limiters39.update();

    limiters.add(limiters4, limiters5, limiters6, limiters1, limiters2, limiters3, limiters7, limiters8, limiters9, limiters10, limiters11, limiters12, limiters13, limiters14, limiters15, limiters16, limiters17, limiters18, limiters19, limiters20, limiters21, limiters22, limiters23, limiters24, limiters25, limiters26, limiters27, limiters28, limiters29, limiters30, limiters31, limiters32, limiters33, limiters34, limiters35, limiters36, limiters37, limiters38, limiters39);

    this.app.limiters = limiters;

    this.plane.add( this.advertisement, this.boxSeparator, this.goal, this.lakes, this.trees, this.rocks, this.pitStop, /* this.road, this.separator, */ limiters);

    this.app.plane = this.plane;
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