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

        // box related attributes
        this.boxMesh = null
        this.boxMeshSize = 1.0
        this.boxEnabled = false
        this.lastBoxEnabled = null
        this.boxDisplacement = new THREE.Vector3(0,2,0)    
        
        // axis related attributes
        this.axisEnabled = true
    }

    /**
     * builds the box mesh with material assigned
     */
    buildBox() {    
        let boxMaterial = new THREE.MeshPhongMaterial({ color: "#ffff77", 
        specular: "#000000", emissive: "#000000", shininess: 90 })

        // Create a Cube Mesh with basic material
        let box = new THREE.BoxGeometry(  this.boxMeshSize,  this.boxMeshSize,  this.boxMeshSize );
        this.boxMesh = new THREE.Mesh( box, boxMaterial );
        this.boxMesh.rotation.x = -Math.PI / 2;
        this.boxMesh.position.y = this.boxDisplacement.y;
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
        const ambientLight = new THREE.AmbientLight( 0x555555 );
        this.app.scene.add( ambientLight );

        /*
        // add a directional light
        const light2 = new THREE.DirectionalLight( 0xffffff, 1 );
        light2.position.set( 0, 10, 0 );
        light2.target.position.set( 0, 1, 0 );
        this.app.scene.add( light2 );

        // add a directional light helper for the previous directional light
        const light2Helper = new THREE.DirectionalLightHelper( light2, 0.5 );
        this.app.scene.add( light2Helper );
        */

        // add a spot light
        this.spotLight = new THREE.SpotLight( 0xffffff, 15, 8, (40*Math.PI)/180, 0, 0 );
        this.spotLight.position.set( 2, 5, 1 );
        this.spotLight.target.position.set( 5, 0, 5 );
        this.app.scene.add( this.spotLight );

        // add a spot light helper for the previous spot light
        this.spotLightHelper = new THREE.SpotLightHelper( this.spotLight );
        this.app.scene.add( this.spotLightHelper );

        this.buildBox()
        

        // Add room to scene
        this.room = new Room();
        this.app.scene.add( this.room );

        // Add table to scene
        this.table = new Table();
        this.app.scene.add( this.table );
        
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

    /**
     * rebuilds the box mesh if required
     * this method is called from the gui interface
     */
    rebuildBox() {
        // remove boxMesh if exists
        if (this.boxMesh !== undefined && this.boxMesh !== null) {  
            this.app.scene.remove(this.boxMesh)
        }
        this.buildBox();
        this.lastBoxEnabled = null
    }
    
    /**
     * updates the box mesh if required
     * this method is called from the render method of the app
     * updates are trigered by boxEnabled property changes
     */
    updateBoxIfRequired() {
        if (this.boxEnabled !== this.lastBoxEnabled) {
            this.lastBoxEnabled = this.boxEnabled
            if (this.boxEnabled) {
                this.app.scene.add(this.boxMesh)
            }
            else {
                this.app.scene.remove(this.boxMesh)
            }
        }
    }

    /**
     * updates the contents
     * this method is called from the render method of the app
     * 
     */
    update() {
        // check if box mesh needs to be updated
        this.updateBoxIfRequired()

        //axis
        if (this.axisEnabled) {
            this.axis.visible = true
        }
        else {
            this.axis.visible = false
        }

        // sets the box mesh position based on the displacement vector
        this.boxMesh.position.x = this.boxDisplacement.x
        this.boxMesh.position.y = this.boxDisplacement.y
        this.boxMesh.position.z = this.boxDisplacement.z
        
    }

}

export { MyContents };