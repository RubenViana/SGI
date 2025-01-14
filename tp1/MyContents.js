import * as THREE from 'three';
import { MyAxis } from './MyAxis.js';
import { Table } from './Table.js';
import { Cake } from './Cake.js';
import { Dish } from './Dish.js';
import { Candle } from './Candle.js';
import { Room } from './Room.js';
import { Frame } from './Frame.js';
import { Chair } from './Chair.js';
import { Fireplace } from './Fireplace.js';
import { Carocha } from './Carocha.js';
import { Spearker } from './Speaker.js';
import { Carpet } from './Carpet.js';
import { TV } from './TV.js';
import { Spring } from './Spring.js';
import { Newspaper } from './Newspaper.js';
import { Snorlax } from './Snorlax.js';
import  { Jar } from './Jar.js';
import { Flower } from './Flower.js';
import { Shelf } from './Shelf.js';

/**
 *  This class contains the contents of out application
 */
class MyContents  {

    /**
       constructs the object
       @param {MyApp} app The application object
    */ 
    constructor(app) {
        this.app = app
        this.axis = null

        // Scale: 1meter (IRL) == 2un

        
        // axis related attributes
        this.axisEnabled = false

        //lights related attributes
        this.spotLightEnabled = true
        this.spotLightHelperEnabled = false

        this.directionalLightEnabled = true
        this.directionalLightHelperEnabled = false

        this.roomLightsEnabled = true

    }

    /**
     * initializes the contents
     */
    init() {
       
        // create once 
        if (this.axis === null) {
            // create and attach the axis to the scene
            this.axis = new MyAxis(this)
            this.app.scene.add(this.axis)
        }

        /*
        // add a point light on top of the model
        const pointLight = new THREE.PointLight( 0xffffff, 500, 0 );
        pointLight.position.set( 0, 20, 0 );
        this.app.scene.add( pointLight );

        // add a point light helper for the previous point light
        const sphereSize = 0.5;
        const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        this.app.scene.add( pointLightHelper );
        */

        // add an ambient light
        const ambientLight = new THREE.AmbientLight( 0x555555, 4 );
        this.app.scene.add( ambientLight );


        // add a spot light
        this.spotLight = new THREE.SpotLight( 0xffffff, 10, 0, (14*Math.PI)/180, 0.1, 0 );
        this.spotLight.position.set( 0, 5, 0 );
        this.spotLight.target.position.set( 0, 1, 0 );
        this.spotLight.castShadow = true;
        this.app.scene.add( this.spotLight );
        this.spotLightHelper = new THREE.SpotLightHelper( this.spotLight );
        this.app.scene.add( this.spotLightHelper );


        // add a sun light
        this.directionalLight = new THREE.DirectionalLight(0xf8e45c, 10);
        this.directionalLight.castShadow = true;
        this.app.scene.add(this.directionalLight);
        this.directionalLight.position.set(-100, 30, 0); // Adjust the position of the light source
        this.directionalLightHelper = new THREE.DirectionalLightHelper( this.directionalLight );
        this.app.scene.add( this.directionalLightHelper );

        // add room lights
        const roomLight1 = new THREE.PointLight( 0xffffff, 1, 0, 0 );
        roomLight1.position.set( 5, 5, 5 );
        roomLight1.castShadow = true;
        const roomLight1Helper = new THREE.PointLightHelper( roomLight1, 0.1 );
        this.app.scene.add( roomLight1, roomLight1Helper );
        const roomLight2 = new THREE.PointLight( 0xffffff, 1, 0, 0 );
        roomLight2.position.set( -5, 5, 5 );
        roomLight2.castShadow = true;
        const roomLight2Helper = new THREE.PointLightHelper( roomLight2, 0.1 );
        this.app.scene.add( roomLight2, roomLight2Helper );
        const roomLight3 = new THREE.PointLight( 0xffffff, 1, 0, 0 );
        roomLight3.position.set( 5, 5, -5 );
        roomLight3.castShadow = true;
        const roomLight3Helper = new THREE.PointLightHelper( roomLight3, 0.1 );
        this.app.scene.add( roomLight3, roomLight3Helper );
        const roomLight4 = new THREE.PointLight( 0xffffff, 1, 0, 0 );
        roomLight4.position.set( -5, 5, -5 );
        roomLight4.castShadow = true;
        const roomLight4Helper = new THREE.PointLightHelper( roomLight4, 0.1 );
        this.app.scene.add( roomLight4, roomLight4Helper );

        this.roomLights = [roomLight1, roomLight2, roomLight3, roomLight4];
        
        this.updateSpotLight();
        this.updateDirectionalLight();

        // Add room to scene
        this.room = new Room();
        this.app.scene.add( this.room );

        // Add table to room
        this.table = new Table();
        this.room.add( this.table );
        
        // Add dish to table
        this.dish = new Dish();
        this.dish.position.y = 1.075
        this.table.add( this.dish );

        // Add cake to dish
        this.cake = new Cake();
        this.cake.position.y = 0.074;
        this.dish.add( this.cake );

        // Add candle to cake
        this.candle = new Candle();
        this.candle.position.y = 0.085;
        this.cake.add( this.candle );

        // Add photos to room
        this.photo1 = "textures/roni.jpg";
        this.frame1 = new Frame(this.photo1);
        this.frame1.position.y = 1.5;
        this.frame1.position.z = -9.98;

        this.photo2 = "textures/rubinho.jpg";
        this.frame2 = new Frame(this.photo2);
        this.frame2.position.y = 1.5;
        this.frame2.position.z = -9.98;
        this.frame2.position.x = 2;

        this.photo3 = "textures/menino_prodigio.png";
        this.frame3 = new Frame(this.photo3);
        this.frame3.position.y = 1.5;
        this.frame3.position.z = -9.98;
        this.frame3.position.x = -2;

        this.room.add( this.frame1, this.frame2, this.frame3 );

        // add chairs to room
        this.chair1 = new Chair();
        this.chair2 = new Chair();
        this.chair3 = new Chair();
        this.chair4 = new Chair();
        this.chair5 = new Chair();
        this.chair6 = new Chair();
        this.chair7 = new Chair();
        this.chair8 = new Chair();

        this.chair1.position.set(0.7,0,2);
        this.chair1.rotation.y = Math.PI;
        this.chair2.position.set(-0.7,0,2);
        this.chair2.rotation.y = Math.PI;
        this.chair3.position.set(0.7,0,-2);
        this.chair4.position.set(-0.7,0,-2);
        this.chair5.position.set(2,0,0.7);
        this.chair5.rotation.y = -Math.PI/2;
        this.chair6.position.set(2,0,-0.7);
        this.chair6.rotation.y = -Math.PI/2;
        this.chair7.position.set(-2,0,0.7);
        this.chair7.rotation.y = Math.PI/2;
        this.chair8.position.set(-2,0,-0.7);
        this.chair8.rotation.y = Math.PI/2;

        this.room.add( this.chair1, this.chair2, this.chair3, this.chair4, this.chair5, this.chair6, this.chair7, this.chair8 );

        // add fireplace to room
        this.fireplace = new Fireplace();
        this.fireplace.position.set(0,0,9.5);

        this.room.add(this.fireplace);

        // add carocha
        this.carocha = new Carocha();
        this.carocha.rotation.y = Math.PI;
        this.carocha.position.set(0, 3.5, 8.98);
        this.room.add(this.carocha);

        // add speakers right and left
        this.leftSpeaker = new Spearker();
        this.leftSpeaker.position.set(9.5, 0, -2.5);
        this.leftSpeaker.rotation.y = -Math.PI/4 - Math.PI/6;
        this.rightSpeaker = new Spearker();
        this.rightSpeaker.position.set(9.5, 0, 2.5);
        this.rightSpeaker.rotation.y = 5*Math.PI/4 + Math.PI/6;

        this.room.add(this.leftSpeaker, this.rightSpeaker);

        // add TV
        this.tv = new TV();
        this.tv.position.set(9.98, 2.5, 0);
        this.tv.rotation.y = -Math.PI/2;
        this.room.add(this.tv);

        // add carpet
        this.carpet = new Carpet();
        this.carpet.position.y = 0.001;
        this.room.add(this.carpet);

        // add spring to table
        this.spring = new Spring();
        this.spring.position.set(1, 1.05, 1);
        this.spring.rotation.x = -Math.PI/2;
        this.table.add(this.spring);

        // add newspaper to table
        this.newspaper = new Newspaper();
        this.newspaper.position.set(1, 1.11, -1);
        this.newspaper.rotation.x = -Math.PI/2;
        this.newspaper.rotation.z = Math.PI/4;
        this.table.add(this.newspaper);

        // add jar to room
        this.jar = new Jar();
        this.jar.position.set(9.0, 0.9, -9.0);
        this.jar.rotation.x = Math.PI/2;
        this.room.add(this.jar);

        // add flower to jar
        this.flower = new Flower();
        this.flower.position.set(0, 0.1, -0.55);
        this.flower.rotation.y = Math.PI/2;
        this.flower.scale.set(0.3, 0.3, 0.3);
        this.jar.add(this.flower);

        // add snorlax to room
        this.snorlax = new Snorlax();
        this.snorlax.position.set(-8, 1, -8);
        this.snorlax.rotation.y = 3*Math.PI/4;
        this.room.add(this.snorlax);

        // add a shelf to the room
        this.shelf1 = new Shelf();
        this.shelf1.position.set(6, 3, 9.8);
        this.shelf2 = new Shelf();
        this.shelf2.position.set(6, 1.5, 9.8);
        this.shelf3 = new Shelf();
        this.shelf3.position.set(-6, 3, 9.8);
        this.shelf4 = new Shelf();
        this.shelf4.position.set(-6, 1.5, 9.8);
        this.room.add(this.shelf1, this.shelf2, this.shelf3, this.shelf4);

        //TODO
        // add some book shelfs to the fireplace wall, one/two stacked on each side
        // add the mandatory components to the scene !!! MUST DO

    }
    
    /**
     * updates the diffuse plane color and the material
     * @param {THREE.Color} value 
     */
    updateDiffusePlaneColor(value) {
        this.diffusePlaneColor = value
        this.planeMaterial.color.set(this.diffusePlaneColor)
    }
    /**
     * updates the specular plane color and the material
     * @param {THREE.Color} value 
     */
    updateSpecularPlaneColor(value) {
        this.specularPlaneColor = value
        this.planeMaterial.specular.set(this.specularPlaneColor)
    }
    /**
     * updates the plane shininess and the material
     * @param {number} value 
     */
    updatePlaneShininess(value) {
        this.planeShininess = value
        this.planeMaterial.shininess = this.planeShininess
    }

    updateSpotLightColor(value) {
        this.spotLight.color.set(value)
    }

    updateSpotLight() {
        this.spotLight.target.updateMatrixWorld();
        this.spotLightHelper.update();
        this.spotLight.visible = this.spotLightEnabled;
        this.spotLightHelper.visible = this.spotLightHelperEnabled && this.spotLightEnabled;
    }

    updateDirectionalLightColor(value) {
        this.directionalLight.color.set(value)
    }

    updateDirectionalLight() {
        this.directionalLight.target.updateMatrixWorld();
        this.directionalLightHelper.update();
        this.directionalLight.visible = this.directionalLightEnabled;
        this.directionalLightHelper.visible = this.directionalLightHelperEnabled && this.directionalLightEnabled;
    }


    /**
     * updates the contents
     * this method is called from the render method of the app
     * 
     */
    update() {

        //axis
        if (this.axisEnabled) {
            this.axis.visible = true
        }
        else {
            this.axis.visible = false
        }
    }

}

export { MyContents };