import * as THREE from 'three';
import { MyAxis } from './MyAxis.js';
import { MyFileReader } from './parser/MyFileReader.js';
import { Primitive } from './Primitive.js';
import { MyScene } from './MyScene.js';
import { MyGuiInterface } from './MyGuiInterface.js';

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

        this.reader = new MyFileReader(app, this, this.onSceneLoaded);
		this.reader.open("scenes/T02G01/demo.xml");		
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

        // this.initialize_lights()
    }

    initialize_lights() {
        let spotLight = new THREE.SpotLight("#ffffff", 30, 20);
        spotLight.position.set(10, 5, 0);
        spotLight.target.position.set(0, 0, 0);
        this.app.scene.add(spotLight);
    }

    /**
     * Called when the scene xml file load is complete
     * @param {MySceneData} data the entire scene data object
     */
    onSceneLoaded(data) {
        console.info("scene data loaded " + data + ". visit MySceneData javascript class to check contents for each data item.")
        this.onAfterSceneLoadedAndBeforeRender(data);
    }

    output(obj, indent = 0) {
        console.log("" + new Array(indent * 4).join(' ') + " - " + obj.type + " " + (obj.id !== undefined ? "'" + obj.id + "'" : ""))
    }

    onAfterSceneLoadedAndBeforeRender(data) {
       
        // refer to descriptors in class MySceneData.js
        // to see the data structure for each item

        this.output(data.options)
        console.log("textures:")
        for (var key in data.textures) {
            let texture = data.textures[key]
            this.output(texture, 1)
        }

        console.log("materials:")
        for (var key in data.materials) {
            let material = data.materials[key]
            this.output(material, 1)
        }

        console.log("cameras:")
        for (var key in data.cameras) {
            let camera = data.cameras[key]
            this.output(camera, 1)
            this.addCamera(camera)
        }

        var myScene = new MyScene(data);
        let sceneNode = myScene.nodes.find(node => node.id === 'scene');

        console.log("data.nodes: ", data.nodes);

        console.log("sceneNode: ", sceneNode);
        console.log("sceneNode.materialIds: ", Object.keys(sceneNode));
        // if (sceneNode.materialIds.length === 0) {
        //     sceneNode.materialIds = ['default'];
        // }

        this.app.scene.add(myScene.visit(sceneNode, sceneNode.materialIds), myScene.mesh);


        // create the gui interface object
        let gui = new MyGuiInterface(this.app)
        // set the contents object in the gui interface object
        gui.setContents(this)

        // we call the gui interface init 
        // after contents were created because
        // interface elements may control contents items
        gui.init();
    }

    addCamera(cameraData) {
        if (cameraData.type === "perspective") {
            let camera =  new THREE.PerspectiveCamera(cameraData.angle, window.innerWidth / window.innerHeight, cameraData.near, cameraData.far)
            camera.position.set(cameraData.location[0], cameraData.location[1], cameraData.location[2])
            camera.lookAt(cameraData.target)
            this.app.cameras[cameraData.id] = camera
            this.app.cameraNames.push(cameraData.id)
        }
        else if (cameraData.type === "orthogonal") {
            let camera = new THREE.OrthographicCamera(cameraData.left, cameraData.right, cameraData.top, cameraData.bottom, cameraData.near, cameraData.far)
            camera.position.set(cameraData.location[0], cameraData.location[1], cameraData.location[2])
            camera.lookAt(cameraData.target)
            this.app.cameras[cameraData.id] = camera
            this.app.cameraNames.push(cameraData.id)
        }
        else {
            console.error("unknown camera type " + type)
        }
    }

    update() {
        
    }
}

export { MyContents };