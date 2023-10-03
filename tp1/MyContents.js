import * as THREE from 'three';
import { MyAxis } from './MyAxis.js';
import { Table } from './Table.js';
import { Cake } from './Cake.js';
import { Dish } from './Dish.js';
import { Candle } from './Candle.js';
import { Room } from './Room.js';

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
        this.spotLight = new THREE.SpotLight( 0xffffff, 10, 0, (14*Math.PI)/180, 1, 0 );
        this.spotLight.position.set( 0, 5, 0 );
        this.spotLight.target.position.set( 0, 1, 0 );
        // this.spotLight.castShadow = true; //this is for casting shadows. Uncomment render.shadowMap.enabled at MyApp.js
        this.app.scene.add( this.spotLight );
        this.spotLightHelper = new THREE.SpotLightHelper( this.spotLight );
        this.app.scene.add( this.spotLightHelper );

        // this.spotLight.visible = false;
        // this.spotLightHelper.visible = false; // TODO: make a enable/disable option in GUI for this


        // add a sun light
        this.directionalLight = new THREE.DirectionalLight(0xf8e45c, 10);
        this.app.scene.add(this.directionalLight);
        this.directionalLight.position.set(-100, 30, 0); // Adjust the position of the light source
        this.directionalLightHelper = new THREE.DirectionalLightHelper( this.directionalLight, 0.5 );
        this.app.scene.add( this.directionalLightHelper );
        

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
        this.cake.position.y = 0.1;
        this.dish.add( this.cake );

        // Add candle to cake
        this.candle = new Candle();
        this.candle.position.y = 0.075;
        this.cake.add( this.candle );
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
    }

    updateDirectionalLightColor(value) {
        this.directionalLight.color.set(value)
    }

    updateDirectionalLight() {
        this.directionalLight.target.updateMatrixWorld();
        this.directionalLightHelper.update();
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