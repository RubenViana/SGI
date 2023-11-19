import * as THREE from 'three';
import { MyAxis } from './MyAxis.js';
import { MyFileReader } from './parser/MyFileReader.js';
import { MyGraph } from './MyGraph.js';
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
		this.reader.open("scenes/demo/demo.xml");
        // this.reader.open("scenes/T02G01/demo.xml");
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

        // adding a default material
        let defaultMaterial = {id: "default", color: 0x00ff00, specular: 0x000000, emissive: 0x00000, shininess: 0.0} 
        data.addMaterial(defaultMaterial)
        data.getNode("scene").materialIds[0] = defaultMaterial.id

        this.onAfterSceneLoadedAndBeforeRender(data);
    }

    output(obj, indent = 0) {
        console.log("" + new Array(indent * 4).join(' ') + " - " + obj.type + " " + (obj.id !== undefined ? "'" + obj.id + "'" : ""))
    }

    onAfterSceneLoadedAndBeforeRender(data) {
       
        // ambient light
        this.app.scene.add(new THREE.AmbientLight(data.options.ambient.r, data.options.ambient.g, data.options.ambient.b, data.options.ambient.a))

        // add fog
        let fog = new THREE.Fog( data.fog.color, data.fog.near, data.fog.far );
        this.app.scene.fog = fog;

        
        // add skybox TODO : improve this
        let skyboxMaterial = new THREE.MeshPhongMaterial( { emissive: new THREE.Color(data.skyboxes.default.emissive.r, data.skyboxes.default.emissive.g, data.skyboxes.default.emissive.b), side: THREE.BackSide } );
        skyboxMaterial.intensity = data.skyboxes.default.intensity;
        skyboxMaterial.envMap = new THREE.CubeTextureLoader().setPath('scenes/demo/').load([data.skyboxes.default.front, data.skyboxes.default.back, data.skyboxes.default.up, data.skyboxes.default.down, data.skyboxes.default.right, data.skyboxes.default.left]);
        let skybox = new THREE.Mesh( new THREE.BoxGeometry(...data.skyboxes.default.size), skyboxMaterial );
        skybox.position.set(...data.skyboxes.default.center);
        this.app.scene.add( skybox );
        
        // add cameras
        for (var key in data.cameras) {
            let camera = data.cameras[key]
            this.addCamera(camera)
        }

        
        // build scene graph
        this.graph = new MyGraph(data);

        this.app.scene.add(this.graph.build());


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
            camera.position.set(...cameraData.location)
            camera.lookAt(...cameraData.target)
            this.app.cameras[cameraData.id] = camera
            this.app.cameraNames.push(cameraData.id)
        }
        else if (cameraData.type === "orthogonal") {
            let camera = new THREE.OrthographicCamera(cameraData.left, cameraData.right, cameraData.top, cameraData.bottom, cameraData.near, cameraData.far)
            camera.position.set(...cameraData.location)
            camera.lookAt(...cameraData.target)
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