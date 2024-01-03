import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MyAxis } from './MyAxis.js';
import { MyFileReader } from './parser/MyFileReader.js';
import { MySceneData } from './parser/MySceneData.js';
import { MyScene } from './MyScene.js';
import { MyReader } from './forms/MyReader.js';
import { Font } from './forms/Font.js';
import { StateMachine } from './stateMachine/StateMachine.js';
import Button_3D from './forms/PlayButton.js';
import DifficultyButton from './forms/DifficultyButton.js';
import FinishLine from './forms/FinishLine.js';
import DynamicSprite from './forms/DynamicSprite.js';
import PauseMenu from './forms/PauseMenu.js';
import Outdoor from './forms/Outdoor.js';
import { MyShader } from './MyShader.js';


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
        this.cameras = []

        this.reader = new MyFileReader(app, this, this.onSceneLoaded);
        this.reader.open("scenes/scenario/scenario.xml");

        // Add event listener for keydown and keyup events
        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        document.addEventListener('keyup', (event) => this.onKeyUp(event));

        //Vehicle
        this.vehicle = null
        this.vehicleBoundingBox = null

        //Vehicle Mechanics
        this.init_vehicle_max_speed = 0.2;
        this.vehicle_max_speed = this.init_vehicle_max_speed
        this.vehicle_acc = 0.005
        this.vehicle_drag = this.vehicle_acc/5
        this.vehicle_inside_track = true
        this.vehicle_rot = Math.PI/120
        this.vehicle_speed = 0.0
        this.vehicleSpeedUpdate = 0;
        // dir = 0 -> z+
        // dir = Math.PI/2 -> x-
        // dir = 3*Math.PI/2 -> x+
        // dir = Math.PI -> z-
        this.vehicle_dir = Math.PI

        //Vehicle Cam
        this.vehicleCamDistance = 5;
        this.vehicleCamHeight = 2;

        //Adversary Vehicle
        this.ads_vehicle = null
        this.ads_vehicleBoundingBox = null
        this.ads_mixer = null
        this.ads_clock = new THREE.Clock();
        this.difficulty = 0.4

        //Effects on Vehicle
        this.lastVehicleCollision = 0
        this.minCollisionInterval = 5
        this.effect_time = 5
        this.vehicle_inside_track = true
        this.vehicle_OOF_impact = 0.3 //vehicle out of bounds impact on speed (70% reduction)
        this.timePenalty = 5 //(sec)
        this.lastAppliedEffect = []

        //Race
        this.raceBeginning = nul
        l
        this.raceTime = 0
        this.raceTimePenalty = 0
        this.TotalLaps = 4
        this.vehicleLap = 0
        this.ads_vehicleLap = 0
        this.vehicleLastLap = 0
        this.ads_vehicleLastLap = 0
        this.finishLine = null
        this.winner = null

        //Menus
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.game_difficulty = null

        this.showBounding = false
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

        // Define variables to store the state of each key
        this.keys = {
            W: false,
            A: false,
            S: false,
            D: false,
            SPACE: false,
            ESCAPE: false
        };

        document.addEventListener('click', this.onMouseClick.bind(this), false);
        document.addEventListener('mousemove', this.onMouseMove.bind(this), false);

        this.buildGame()
    
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
        }

        console.log("nodes:")
        for (var key in data.nodes) {
            let node = data.nodes[key]
            this.output(node, 1)
            for (let i=0; i< node.children.length; i++) {
                let child = node.children[i]
                if (child.type === "primitive") {
                    console.log("" + new Array(2 * 4).join(' ') + " - " + child.type + " with "  + child.representations.length + " " + child.subtype + " representation(s)")
                    if (child.subtype === "nurbs") {
                        console.log("" + new Array(3 * 4).join(' ') + " - " + child.representations[0].controlpoints.length + " control points")
                    }
                }
                else {
                    this.output(child, 2)
                }
            }
        }

        //Initialize Scene
        let myScene = new MyScene(data)

        //Set Globals
        this.app.scene.add(new THREE.AmbientLight(myScene.ambient))
        this.app.scene.background = new THREE.Color(myScene.background);
        this.app.scene.fog = new THREE.Fog(myScene.fog.color,myScene.fog.near, myScene.fog.far);

        //Get Root Node
        let sceneNode = myScene.nodes.find(node => node.id === data.rootId)

        //Add Lights to GUI
        this.app.loadLights(myScene.lights);

        //Add cameras to scene and GUI 
        let cameras = myScene.getCameras();
        for(let camera of cameras){
            this.app.scene.add(camera)
            // let cameraHelper = new THREE.CameraHelper(cameras[camera]);
            // this.app.scene.add(cameraHelper);
        }
        this.app.loadCameras(cameras);
        this.cameras = cameras
        
        // Add Skybox to scene 
        this.app.scene.add(myScene.getSkybox())

        // Add Scene Graph to scene (contains lights)
        this.app.scene.add(myScene.visit(sceneNode, 
                            myScene.rootMaterialID,
                            myScene.rootReceiveShadows,
                            myScene.rootCastShadows))

        //Add light helpers
        // this.app.scene.add(myScene.helpers_mesh)

    }


    //Builds the important central aspects of the game (cars, outdoor, circuit, font, sprites,...)
    buildGame(){

        //------------------ Scene Objects ------------------~

        //Add circuit (powerUps, Obstacles, vehicles, track,etc...)
        this.circuit = new MyReader(this.showBounding=this.showBounding)
        this.circuit.addPowerUps()
        this.circuit.addObstacles(this.shader)
        this.circuit.build()
        this.powerUpsBoundingSpheres = this.circuit.powerUpsBoundingSpheres
        this.obstaclesBoundingSpheres = this.circuit.obstaclesBoundingSpheres
        this.app.scene.add(this.circuit.mesh)

        //Apply shader
        this.loadObstacleShader()

        //Add Font
        this.font = new Font()
        this.font.position.set(-16, 8, 15)
        this.font.scale.set(2,2,2)
        this.font.rotation.y = Math.PI/4
        this.app.scene.add(this.font)

        //Add Menu Buttons
        this.playButton = new Button_3D()
        this.playButton.position.set(0, 3, 0)
        this.app.scene.add(this.playButton)

        this.difficultyButton1 = new DifficultyButton("Easy", 3.5, 1.5, 1, -0.8, -0.1, 0.1)
        this.difficultyButton1.position.set(-11.4, 0.25, 22.1)
        this.difficultyButton1.scale.set(0.5,0.5,0.5)
        this.difficultyButton1.rotation.y = Math.PI/4 + Math.PI/8
        this.app.scene.add(this.difficultyButton1)

        this.difficultyButton2 = new DifficultyButton("Medium", 4.5, 1.5, 1, -1.3, -0.1, 0.1)
        this.difficultyButton2.position.set(-10, 0.25, 20)
        this.difficultyButton2.scale.set(0.5,0.5,0.5)
        this.difficultyButton2.rotation.y = Math.PI/4
        this.app.scene.add(this.difficultyButton2)

        this.difficultyButton3 = new DifficultyButton("Hard", 3.5, 1.5, 1, -0.8, -0.1, 0.1)
        this.difficultyButton3.position.set(-8, 0.25, 18.5)
        this.difficultyButton3.scale.set(0.5,0.5,0.5)
        this.difficultyButton3.rotation.y = Math.PI/4-Math.PI/8
        this.app.scene.add(this.difficultyButton3)

        



        //Add Vehicle camera
        this.vehicleCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.vehicleCamera.name = "vehicle"
        this.app.scene.add(this.vehicleCamera)
        this.cameras.push(this.vehicleCamera)
        this.app.loadCameras(this.cameras);


        //Add Vehicle 1
        let v1 = this.circuit.getVehicle(1)
        this.vehicle1 = v1.vehicle;
        this.vehicleBoundingBox1 = v1.vehicle_boundingBox
        if(this.showBounding)
            this.app.scene.add(this.vehicleBoundingBox1)
        this.app.scene.add(this.vehicle1)
        this.vehicle1.position.set(-17, 0, 18)
        this.vehicleBoundingBox1.position.set(-17, 0, 18)
        this.vehicle1.rotation.y = Math.PI/2

        //Add Vehicle 2
        let v2 = this.circuit.getVehicle(2)
        this.vehicle2 = v2.vehicle;
        this.vehicleBoundingBox2 = v2.vehicle_boundingBox
        if(this.showBounding)
            this.app.scene.add(this.vehicleBoundingBox2)
        this.app.scene.add(this.vehicle2)
        this.vehicle2.position.set(-17, 0, 20)
        this.vehicleBoundingBox2.position.set(-17, 0, 20)
        this.vehicle2.rotation.y = Math.PI/2

        //Add Vehicle 3
        let v3 = this.circuit.getVehicle(5)
        this.vehicle3 = v3.vehicle;
        this.vehicleBoundingBox3 = v3.vehicle_boundingBox
        if(this.showBounding)
            this.app.scene.add(this.vehicleBoundingBox3)
        this.app.scene.add(this.vehicle3)
        this.vehicle3.position.set(-17, 0, 22)
        this.vehicleBoundingBox3.position.set(-17, 0, 22)
        this.vehicle3.rotation.y = Math.PI/2


        //Add Adversary Vehicle 1
        let ads_v1 = this.circuit.getVehicle(1)
        this.ads_vehicle1 = ads_v1.vehicle;
        this.ads_vehicleBoundingBox1 = ads_v1.vehicle_boundingBox
        if(this.showBounding)
            this.app.scene.add(this.ads_vehicleBoundingBox1)
        this.app.scene.add(this.ads_vehicle1)
        this.ads_vehicle1.position.set(-12, 0, 13)
        this.ads_vehicleBoundingBox1.position.set(-12, 0, 13)


        //Add Adversary Vehicle 2
        let ads_v2 = this.circuit.getVehicle(2)
        this.ads_vehicle2 = ads_v2.vehicle;
        this.ads_vehicleBoundingBox2 = ads_v2.vehicle_boundingBox
        if(this.showBounding)
            this.app.scene.add(this.ads_vehicleBoundingBox2)
        this.app.scene.add(this.ads_vehicle2)
        this.ads_vehicle2.position.set(-10, 0, 13)
        this.ads_vehicleBoundingBox2.position.set(-10, 0, 13)

        //Add Adversary Vehicle 3
        let ads_v3 = this.circuit.getVehicle(4)
        this.ads_vehicle3 = ads_v3.vehicle;
        this.ads_vehicleBoundingBox3 = ads_v3.vehicle_boundingBox
        if(this.showBounding)
            this.app.scene.add(this.ads_vehicleBoundingBox3)
        this.app.scene.add(this.ads_vehicle3)
        this.ads_vehicle3.position.set(-8, 0, 13)
        this.ads_vehicleBoundingBox3.position.set(-8, 0, 13)



        //Add lapSprite sprite
        this.lapSprite = new DynamicSprite(this.app, "1 / 3", 512 * 1.001, 256 * 1.001);
        this.lapSprite.scale.set(200, 100, 1);
        this.lapSprite.position.set(-window.innerWidth/2 + 150, window.innerHeight/2 - 100, 0); // Adjust position accordingly
        this.app.hudScene.add(this.lapSprite);
        this.lapSprite.visible = false;


        this.timerSprite = new DynamicSprite(this.app, "0:00", 512 * 1.001, 256 * 1.001);
        this.timerSprite.scale.set(200, 100, 1);
        this.timerSprite.position.set(window.innerWidth / 2 - 150, window.innerHeight / 2 - 100, 0);
        this.app.hudScene.add(this.timerSprite);
        this.timerSprite.visible = false;


        this.speedSprite = new DynamicSprite(this.app, "Speed: 0", 512 * 1.3, 256 * 1.3);
        this.speedSprite.scale.set(200, 100, 1);
        this.speedSprite.position.set(window.innerWidth / 2 - 150, -window.innerHeight / 2 + 150, 1); // Position bottom right
        this.app.hudScene.add(this.speedSprite);
        this.speedSprite.visible = false;

        //Add effectSprite sprite
        this.effectSprite = new DynamicSprite("Effect: ",512 * 3, 256 * 4);
        this.effectSprite.scale.set(400, 100, 1);
        this.effectSprite.position.set(-window.innerWidth / 2 + 250, -window.innerHeight / 2 + 150, 1); // Position bottom right
        this.app.hudScene.add(this.effectSprite);
        this.effectSprite.visible = false;


        //Add Pause Menu
        this.pauseMenu = new PauseMenu();
        this.pauseMenu.scale.set(window.innerWidth*1.1, window.innerHeight*1, 1);
        this.pauseMenu.position.set(0, 0, 1);
        this.app.hudScene.add(this.pauseMenu);
        this.pauseMenu.visible = false;


        //Add Pause Menu
        this.pauseMenu = new PauseMenu();
        this.pauseMenu.scale.set(window.innerWidth*1.1, window.innerHeight*1, 1);
        this.pauseMenu.position.set(0, 0, 1);
        this.app.hudScene.add(this.pauseMenu);
        this.pauseMenu.visible = false;


        //Add Finish Line
        let finish_point = this.circuit.track.path.points[0]
        let finishWidth = this.circuit.track.trackWidth
        this.finishLine = new THREE.Box3(
            new THREE.Vector3(finish_point.x - finishWidth / 2-1, -0.5, finish_point.z + 0.25),
            new THREE.Vector3(finish_point.x + finishWidth / 2+1,
             0.5, finish_point.z - 0.25)
          );
        
        //Add Finish Line Object
        this.FinishLine = new FinishLine();
        this.FinishLine.position.set(-35,0,0)
        this.app.scene.add(this.FinishLine);

        // Visualize the finish line
        if(this.showBounding){
            const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
            const boxGeometry = new THREE.BoxGeometry(
                this.finishLine.max.x - this.finishLine.min.x,
                this.finishLine.max.y - this.finishLine.min.y,
                this.finishLine.max.z - this.finishLine.min.z
            );
            const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
            boxMesh.position.set(
                (this.finishLine.max.x + this.finishLine.min.x) / 2,
                (this.finishLine.max.y + this.finishLine.min.y) / 2,
                (this.finishLine.max.z + this.finishLine.min.z) / 2
            );
            this.app.scene.add(boxMesh);
        }

        //Add Outdoor Object
        this.outdoor = new Outdoor();
        this.outdoor.position.set(-20,0,-20)
        this.loadOutdoorShader()
        this.app.scene.add(this.outdoor);



        const loader = new GLTFLoader();
        let self = this
        // load Billboard model
        loader.load(
            // resource URL
            'forms/billboard/scene.gltf',
            // called when resource is loaded
            function (object) {
                // Use 'self' instead of 'this' to reference the outer scope
                object.scene.scale.set(4,4,4)
                object.scene.translateY(0)
                object.scene.translateX(0)
                object.scene.rotation.y = Math.PI

                self.billboard1 = object.scene
                self.billboard2 = object.scene.clone()

                self.billboard1.translateZ(-10)
                self.billboard2.translateZ(-20)

                self.billboard1.translateX(10)
                self.billboard2.translateX(20)

                self.billboard2.rotation.y = -Math.PI/2
                
                self.app.scene.add(self.billboard1)
                self.app.scene.add(self.billboard2)
            },
            // called when loading is in progress
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            function (error) {
                console.log('An error happened: ' + error);
            }
        );


        // State Machine
        this.stateMachine = new StateMachine(this.app);
        this.stateMachine.execute_state();
    }

    //Loads the shader to be applied to obstacle objects
    loadObstacleShader(){
        if(this.shader != null && this.shader.ready && this.shader1 != null && this.shader1.ready){
            this.applyObstacleShader()
            return
        }
        this.shader = new MyShader("Radial", "Radial expands", "./shaders/radial.vert", "./shaders/radial.frag", {
            radius: { type: 'f', value: 1 },
            timeFactor: { type: 'f', value: performance.now() },
            color: { type: 'vec3', value: new THREE.Color(0xff0000) }
        });

        this.shader1 = new MyShader("Radial", "Radial expands", "./shaders/radial.vert", "./shaders/radial.frag", {
            radius: { type: 'f', value: 1 },
            timeFactor: { type: 'f', value: performance.now() },
            color: { type: 'vec3', value: new THREE.Color(0xffaa00) }
        });

        if(!(this.shader.ready == true && this.shader1.ready == true)){
            setTimeout(this.loadObstacleShader.bind(this), 500)
            return;
        }

        this.applyObstacleShader()
    }

    //Applys the shader to the obstacle objects
    applyObstacleShader(){
        this.circuit.mesh.children.forEach(cir_child => {
            if(cir_child.name == "obstacles"){
                cir_child.children.forEach(child => {
                    if (child.children[0]) {
                        if(child.children[0].type == "box")
                            child.children[0].children[0].material = this.shader.material
                        else
                            child.children[0].children[0].material = this.shader1.material
                    }
                })
            }
        })
    }

    //Loads the shader to be applied to outdoor object
    loadOutdoorShader(){
        if(this.shaderOutdoor != null && this.shaderOutdoor.ready){
            this.applyOutdoorShader()
            return
        }

        this.shaderOutdoor = new MyShader("Bump", "Adiciona relevo tendo em conta Lgray", "./shaders/bump.vert", "./shaders/bump.frag", {
            uSampler1: {type: 'sampler2D', value: this.outdoor.planeTex },
            uSampler2: {type: 'sampler2D', value: this.outdoor.planeGrayTex },
            heightScale: {type: 'f', value: 1.0 },
        });


        if(!(this.shaderOutdoor.ready == true)){
            setTimeout(this.loadOutdoorShader.bind(this), 500)
            return;
        }

        this.applyOutdoorShader()
    }

    //Applys the shader to the Outdoor object
    applyOutdoorShader(){
        this.outdoor.plane.material = this.shaderOutdoor.material
    }

















    //Updates key's value upon an event
    handleKeyEvent(event, value) {
        const key = event.key.toUpperCase();

        if (this.keys.hasOwnProperty(key)) {
            this.keys[key] = value;
        }
    }

    //If KeyUP event, handles that event
    onKeyDown(event) {
        this.handleKeyEvent(event, true);
    }

    //If KeyUP event, handles that event
    onKeyUp(event) {
        this.handleKeyEvent(event, false);
    }

    //Acts upon key values
    keyActionUpdate(){
        if (this.keys.SPACE) {
            this.vehicle_speed = 0      // Pause (future work)
        }
        if (this.keys.D ) {
            this.vehicle_dir -= this.vehicle_rot; // Rotate right
        }
        if (this.keys.A) {
            this.vehicle_dir += this.vehicle_rot; // Rotate left
        }

        let currentTime = performance.now()
        if(currentTime - this.vehicleSpeedUpdate > 20){
            if (this.keys.S){
                if(this.vehicle_speed> 0) {
                    this.vehicle_speed -= this.vehicle_acc*2// Decrease speed
                }else if(this.vehicle_speed> -this.vehicle_max_speed/2) {
                    this.vehicle_speed -= this.vehicle_acc/2// Decrease speed
                }
                this.vehicleSpeedUpdate = currentTime
            }
            if (this.keys.W){
                if(this.vehicle_speed< 0){
                    this.vehicle_speed += this.vehicle_acc/2
                }else if(this.vehicle_speed+this.vehicle_acc<=this.vehicle_max_speed) {
                    this.vehicle_speed += this.vehicle_acc // Increase speed
                }else if(this.vehicle_speed+this.vehicle_acc > this.vehicle_max_speed && this.vehicle_speed<this.vehicle_max_speed){
                    this.vehicle_speed = this.vehicle_max_speed
                }
                this.vehicleSpeedUpdate = currentTime
            }
        }

        if (this.keys.ESCAPE) {
            this.stateMachine.update_state('pause');
            this.stateMachine.execute_state();
        }

    }

    // Updates vehicle position and Bounding Box
    updateVehicle(){
        //Rotate car
        this.vehicle.rotation.y = this.vehicle_dir;
    
        // Calculate the translation components based on direction and speed
        const deltaZ = Math.cos(this.vehicle_dir) * this.vehicle_speed;
        const deltaX = Math.sin(this.vehicle_dir) * this.vehicle_speed;
    
        // Update the position
        this.vehicle.position.x += deltaX;
        this.vehicle.position.z += deltaZ;

        if(performance.now() - this.vehicleSpeedUpdate > 20){
            // Reduce speed (air resistance/friction)
            if(this.vehicle_speed > 0.00){
                this.vehicle_speed -= this.vehicle_drag;
                if(this.vehicle_speed < 0.0)
                    this.vehicle_speed = 0.0;
            }
            if(this.vehicle_speed < 0.00){
                this.vehicle_speed += this.vehicle_drag;
                if(this.vehicle_speed > 0.0)
                    this.vehicle_speed = 0.0;
            }
        }

        // Update bounding box position
        this.vehicleBoundingBox.position.copy(this.vehicle.position)

    }

    // Updates vehicle camera position
    updateVehicleCam(){
        // Update camera position and look at the vehicle
        const offsetX = Math.sin(this.vehicle_dir) * this.vehicleCamDistance;
        const offsetZ = Math.cos(this.vehicle_dir) * this.vehicleCamDistance;

        this.vehicleCamera.position.x = this.vehicle.position.x - offsetX;
        this.vehicleCamera.position.y = this.vehicle.position.y + this.vehicleCamHeight; // Adjust the height of the camera
        this.vehicleCamera.position.z = this.vehicle.position.z - offsetZ;

        // Update the orbit controls in each frame to follow the vehicle
        this.app.updateVehicleCamOrbit()
    }

    // Check if 2 spheres (mesh) intersect
    checkSphereIntersection(sphere1,sphere2) {
        let center1,center2
        center1 = sphere1.position
        center2 = sphere2.position
    
        let distance = center1.distanceTo(center2);
    
        // Check for intersection
        if (distance <= sphere1.geometry.parameters.radius + sphere2.geometry.parameters.radius) {
            return true
        }
        return false
    }

    // Function to check for collisions of vehicle with powerups, obstacles and vehicles
    checkCollisions() {
        // Check for collisions with obstacles
        for (let obstacleBoundingSphere of this.obstaclesBoundingSpheres) {
            if (this.checkSphereIntersection(this.vehicleBoundingBox,obstacleBoundingSphere)) {
                console.log("Obstacle Collision detected!");
                let type = null
                //retirar da list the boundingspheres de obstaculos
                let idxBS = this.obstaclesBoundingSpheres.indexOf(obstacleBoundingSphere)
                this.obstaclesBoundingSpheres.splice(idxBS,1)
                //retirar da cena
                for(let scene_obj of this.app.scene.children){
                    if(scene_obj.name == "circuit")
                        for(let child of scene_obj.children){
                            if(child.name == 'obstacles'){
                                type = child.children[idxBS].children[0].type
                                child.children.splice(idxBS,1)
                            }
                        }
                }
                this.apply_effect("obstacle", type)
            }
        }

        // Check for collisions with powerUps
        for (let powerUpBoundingSphere of this.powerUpsBoundingSpheres) {
            if (this.checkSphereIntersection(this.vehicleBoundingBox,powerUpBoundingSphere)) {
                console.log("PowerUp Collision detected!");
                let type = null
                let idxBS = this.powerUpsBoundingSpheres.indexOf(powerUpBoundingSphere)
                this.powerUpsBoundingSpheres.splice(idxBS,1)
                for(let scene_obj of this.app.scene.children){
                    if(scene_obj.name == "circuit")
                        for(let child of scene_obj.children){
                            if(child.name == 'powerUps'){
                                type = child.children[idxBS].children[0].type
                                child.children.splice(idxBS,1)
                            }
                        }
                }
                this.apply_effect("powerUp", type)
            }
        }

        // Check for collision with Adversary -> Apply slowness for (effect_time) seconds and 0 speed at collision
        if(this.lastVehicleCollision + this.minCollisionInterval*1000 < performance.now()){
            if(this.checkSphereIntersection(this.vehicleBoundingBox,this.ads_vehicleBoundingBox)){
                console.log("Adversary Collision detected!");
                this.apply_effect("vehicle")
            }
        }
    }


    //Applies effects to the car's attributes for a certain amount of time
    // origin can be either "powerUp", "obstacle", "vehicle"
    apply_effect(origin,type="box"){
        if(origin == "powerUp"){
            if(type == "box"){
                // this.lastPowerUpEffect = performance.now()
                this.vehicle_max_speed *= 2
                this.vehicle_speed *= 2
                this.reset_effect(2)
                this.lastAppliedEffect.push("Power-UP")
            }else if(type == "sphere"){
                this.raceTimePenalty -= this.timePenalty*1000
            }
            return
        }

        if(origin == "obstacle"){
            if(type == "box"){
                // this.lastObstacleEffect = performance.now()
                this.vehicle_max_speed *= 0.5
                this.vehicle_speed *= 0.5
                this.reset_effect(0.5)
                this.lastAppliedEffect.push("Obstacle")
            }else if(type == "sphere"){
                this.raceTimePenalty += this.timePenalty*1000
            }
            return
        }

        if(origin == "vehicle"){
            this.lastVehicleCollision = performance.now()
            this.vehicle_max_speed *= 0.3
            this.vehicle_speed = 0
            this.reset_effect(0.3, true)
            this.lastAppliedEffect.push("Collision")
        }

    }

    //Resets effects on the vehicle after a certain (effect_time) seconds
    reset_effect(factor, vehicle_coll=false){
        setTimeout(() => {
            this.vehicle_max_speed = this.vehicle_max_speed/factor;
            if(!vehicle_coll)
                this.vehicle_speed = this.vehicle_speed/factor;
            this.lastAppliedEffect.pop()
        }, this.effect_time * 1000);
    }

     //Checks if vehicle is outside/inside the track and updates speed
    checkVehicleTrackDist(){

        let curve = this.circuit.routes.path
        let targetPoint = this.vehicle.position

        // Find the closest point on the curve
        let closestPoint = curve.getPointAt(0);
        //using squared is more efficient
        let closestDistanceSquared = targetPoint.distanceToSquared(closestPoint);

        for (let t = 0; t <= 1; t += 0.0001) {
            let pointOnCurve = curve.getPointAt(t);
            let distanceSquared = targetPoint.distanceToSquared(pointOnCurve);
            if (distanceSquared < closestDistanceSquared) {
                closestDistanceSquared = distanceSquared;
                closestPoint.copy(pointOnCurve);
            }
        }

        // Calculate the distance between the target point and the closest point on the curve
        let distance = Math.sqrt(closestDistanceSquared);

        // Slow down vehicle 70% if outside of track
        if(this.vehicle_inside_track && distance > this.circuit.track.trackWidth){
            this.vehicle_max_speed = this.vehicle_max_speed*this.vehicle_OOF_impact
            this.vehicle_speed = this.vehicle_speed*this.vehicle_OOF_impact
            this.vehicle_inside_track = false
        }else if(distance <= this.circuit.track.trackWidth && this.vehicle_inside_track==false){
            this.vehicle_max_speed = this.vehicle_max_speed/this.vehicle_OOF_impact
            this.vehicle_inside_track = true
        }

    }

    //Create and defines adversary vehicle animation
    createAdversaryAnimation(){

        //Create Position KF Track
        let positions = [...this.ads_vehicle.position]
        let pos_idx = 0
        let pos_idxs = [0]
        for(let pos of this.circuit.routes.path1.points){
            positions.push(...pos)
            pos_idxs.push(++pos_idx)
        }

        const positionKF = new THREE.VectorKeyframeTrack('.position', pos_idxs, positions,
            THREE.InterpolateLinear  /* THREE.InterpolateLinear (default), THREE.InterpolateDiscrete,*/
        )

        //Create Rotation KF Track
        let quarterions = []
        let idx = 0
        let idxs = []
        for(let rot of this.circuit.routes.path1_rot){
            quarterions.push(...rot)
            idxs.push(idx++)
        }

        const quaternionKF = new THREE.QuaternionKeyframeTrack('.quaternion', idxs, quarterions);

        //Create clips for animation (position and rotation)
        const positionClip = new THREE.AnimationClip('positionAnimation', pos_idx, [positionKF])
        const rotationClip = new THREE.AnimationClip('rotationAnimation', idx, [quaternionKF])

        // Create an AnimationMixer
        this.ads_mixer = new THREE.AnimationMixer(this.ads_vehicle)

        // Create AnimationActions for each clip
        this.ads_positionAction = this.ads_mixer.clipAction(positionClip)
        this.ads_positionAction.setLoop(THREE.LoopRepeat);
        this.ads_positionAction.repetitions = 3;

        this.ads_rotationAction = this.ads_mixer.clipAction(rotationClip)
        this.ads_rotationAction.setLoop(THREE.LoopRepeat);
        this.ads_rotationAction.repetitions = 3;
    }

    //Plays adversary vehicle animation clips
    playAdversaryAnimation() {
        // Play both animations
        if (this.ads_positionAction && this.ads_rotationAction) {
            this.ads_positionAction.play();
            this.ads_rotationAction.play();
        }
    }

    //Updates adversary mixer clock 
    adversaryAnimate() {
        if (this.ads_mixer) {
          this.ads_mixer.update(this.ads_clock.getDelta()*this.difficulty);
        }
    }

    //Updates adversary Bounding box
    updateAdversary(){
        // Update bounding box position
        this.ads_vehicleBoundingBox.position.copy(this.ads_vehicle.position)
    }

    //Update "Play" Button Position
    updateButtonPosition() {
        const cam = this.app.activeCamera;
    
        // Calculate the vector in front of the camera
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
    
        // Determine how far in front of the camera the button should appear
        const inFrontOfCam = forward.multiplyScalar(10); // 10 units in front of the camera
    
        // Calculate the bottom center position in front of the camera
        const bottomCenterPos = new THREE.Vector3(
            cam.position.x + inFrontOfCam.x, 
            cam.position.y + inFrontOfCam.y - 5,
            cam.position.z + inFrontOfCam.z
        );
    
        // Set the button's position
        this.playButton.position.copy(bottomCenterPos);

        this.playButton.lookAt(cam.position.x-0.2, cam.position.y-3, cam.position.z);
    }

    //Handle mouse click on menu buttons
    onMouseClick(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    
        if (this.stateMachine.current_state === "initial") {
            this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
            const intersects = this.raycaster.intersectObjects([this.playButton]);
        
            if (intersects.length > 0) {

                this.playButton.visible = false;

                this.stateMachine.update_state('choose_player_car');
                this.stateMachine.execute_state();
            }

        } else if (this.stateMachine.current_state === "choose_player_car") {

            if (this.vehicle1) {
                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObjects([this.vehicle1]);
            
                if (intersects.length > 0) {

                    this.vehicle = this.vehicle1
                    this.vehicleBoundingBox = this.vehicleBoundingBox1

                    this.stateMachine.update_state('choose_opponent_car');
                    this.stateMachine.execute_state();
                }
            }
            if (this.vehicle2) {
                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObjects([this.vehicle2]);
            
                if (intersects.length > 0) {

                    this.vehicle = this.vehicle2
                    this.vehicleBoundingBox = this.vehicleBoundingBox2

                    this.stateMachine.update_state('choose_opponent_car');
                    this.stateMachine.execute_state();
                }
            }
            if (this.vehicle3) {
                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObjects([this.vehicle3]);
            
                if (intersects.length > 0) {

                    this.vehicle = this.vehicle3
                    this.vehicleBoundingBox = this.vehicleBoundingBox3

                    this.stateMachine.update_state('choose_opponent_car');
                    this.stateMachine.execute_state();
                }
            }

        } else if (this.stateMachine.current_state === "choose_opponent_car") {

            if (this.ads_vehicle1) {
                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObjects([this.ads_vehicle1]);
            
                if (intersects.length > 0) {

                    this.ads_vehicle = this.ads_vehicle1
                    this.ads_vehicleBoundingBox = this.ads_vehicleBoundingBox1

                    this.stateMachine.update_state('choose_difficulty');
                    this.stateMachine.execute_state();
                }
            }
            if (this.ads_vehicle2) {
                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObjects([this.ads_vehicle2]);
            
                if (intersects.length > 0) {

                    this.ads_vehicle = this.ads_vehicle2
                    this.ads_vehicleBoundingBox = this.ads_vehicleBoundingBox2

                    this.stateMachine.update_state('choose_difficulty');
                    this.stateMachine.execute_state();
                }
            }
            if (this.ads_vehicle3) {
                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObjects([this.ads_vehicle3]);
            
                if (intersects.length > 0) {

                    this.ads_vehicle = this.ads_vehicle3
                    this.ads_vehicleBoundingBox = this.ads_vehicleBoundingBox3

                    this.stateMachine.update_state('choose_difficulty');
                    this.stateMachine.execute_state();
                }
            }
        }

        else if (this.stateMachine.current_state === "choose_difficulty") {
            
            if (this.difficultyButton1) {
                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObjects([this.difficultyButton1]);
            
                if (intersects.length > 0) {
                    this.game_difficulty = "easy"

                    this.stateMachine.update_state('start_game');
                    this.stateMachine.execute_state();
                }
            }
            if (this.difficultyButton2) {
                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObjects([this.difficultyButton2]);
            
                if (intersects.length > 0) {
                    this.game_difficulty = "medium"

                    this.stateMachine.update_state('start_game');
                    this.stateMachine.execute_state();
                }
            }
            if (this.difficultyButton3) {
                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObjects([this.difficultyButton3]);
            
                if (intersects.length > 0) {
                    this.game_difficulty = "hard"

                    this.stateMachine.update_state('start_game');
                    this.stateMachine.execute_state();
                }
            }
        }

        else if (this.stateMachine.current_state === "in_game") {
            console.log("in_game")
        }

        else if (this.stateMachine.current_state === "pause") {
            if (this.pauseMenu.handleClick(event.clientX, event.clientY) === 'Resume') {
                this.stateMachine.update_state('in_game');
                this.stateMachine.execute_state();
            }
            if (this.pauseMenu.handleClick(event.clientX, event.clientY) === 'Quit') {
                this.pauseMenu.visible = false;
                this.lapSprite.visible = false;
                this.timerSprite.visible = false;
                this.speedSprite.visible = false;
                
                this.app.scene.clear();
                this.app.contents = new MyContents(this.app);
                this.app.contents.init();
            }
        }

    }

    //Update mouse position
    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    //Update Menu buttons while mouse hovering
    button_hover() {
        if (this.stateMachine.current_state === "initial") {

            if (this.playButton && this.playButton.buttonMesh) {

                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObject(this.playButton.buttonMesh, true);

                if (intersects.length > 0) {
                    this.playButton.buttonMesh.material.color.set(0xDD571C);
                } else {
                    this.playButton.buttonMesh.material.color.set(0xED7014);
                }
            }
        }

        else if (this.stateMachine.current_state === "choose_player_car") {
            
            if (this.vehicle1) {

                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObject(this.vehicle1, true);

                if (intersects.length > 0) {
                    this.vehicle1.position.x = -16;
                } else {
                    this.vehicle1.position.x = -17;
                }
            }

            if (this.vehicle2) {

                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObject(this.vehicle2, true);

                if (intersects.length > 0) {
                    this.vehicle2.position.x = -16;
                } else {
                    this.vehicle2.position.x = -17;
                }
            }

            if (this.vehicle3) {
                
                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObject(this.vehicle3, true);

                if (intersects.length > 0) {
                    this.vehicle3.position.x = -16;
                } else {
                    this.vehicle3.position.x = -17;
                }
            }

        }

        else if (this.stateMachine.current_state === "choose_opponent_car") {
                
            if (this.ads_vehicle1) {

                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObject(this.ads_vehicle1, true);

                if (intersects.length > 0) {
                    this.ads_vehicle1.position.z = 14;
                } else {
                    this.ads_vehicle1.position.z = 13;
                }
            }

            if (this.ads_vehicle2) {

                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObject(this.ads_vehicle2, true);

                if (intersects.length > 0) {
                    this.ads_vehicle2.position.z = 14;
                } else {
                    this.ads_vehicle2.position.z = 13;
                }
            }

            if (this.ads_vehicle3) {
                
                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObject(this.ads_vehicle3, true);

                if (intersects.length > 0) {
                    this.ads_vehicle3.position.z = 14;
                } else {
                    this.ads_vehicle3.position.z = 13;
                }
            }
        }
        
        else if (this.stateMachine.current_state === "choose_difficulty") {

            if (this.difficultyButton1 && this.difficultyButton1.buttonMesh) {

                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObject(this.difficultyButton1.buttonMesh, true);

                if (intersects.length > 0) {
                    this.difficultyButton1.buttonMesh.material.color.set(0xDD571C);
                } else {
                    this.difficultyButton1.buttonMesh.material.color.set(0xED7014);
                }
            } if (this.difficultyButton2 && this.difficultyButton2.buttonMesh) {

                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObject(this.difficultyButton2.buttonMesh, true);

                if (intersects.length > 0) {
                    this.difficultyButton2.buttonMesh.material.color.set(0xDD571C);
                } else {
                    this.difficultyButton2.buttonMesh.material.color.set(0xED7014);
                }
            } if (this.difficultyButton3 && this.difficultyButton3.buttonMesh) {

                this.raycaster.setFromCamera(this.mouse, this.app.activeCamera);
                const intersects = this.raycaster.intersectObject(this.difficultyButton3.buttonMesh, true);

                if (intersects.length > 0) {
                    this.difficultyButton3.buttonMesh.material.color.set(0xDD571C);
                } else {
                    this.difficultyButton3.buttonMesh.material.color.set(0xED7014);
                }
            }
        }
    }

    //Initiate the race (Position vehicles, set difficulty, start adversary animation)
    initRace(){

        //Place vehicles on start
        let init_pos = this.circuit.routes.path.points[0]
        this.vehicle.position.x = init_pos.x -this.circuit.track.trackWidth / 3
        this.vehicle.position.z = init_pos.z
        this.vehicleBoundingBox.position.x = init_pos.x -this.circuit.track.trackWidth / 3
        this.vehicleBoundingBox.position.z = init_pos.z

        this.ads_vehicle.position.x = init_pos.x +this.circuit.track.trackWidth / 3
        this.ads_vehicle.position.z = init_pos.z
        this.ads_vehicle.scale.z *=-1
        this.ads_vehicle.scale.x *=-1
        this.ads_vehicleBoundingBox.position.x = init_pos.x +this.circuit.track.trackWidth / 3
        this.ads_vehicleBoundingBox.position.z = init_pos.z

        //Setup difficulty
        if(this.game_difficulty){
            if(this.game_difficulty == "easy")
                this.difficulty = 0.4
            else if(this.game_difficulty == "medium")
                this.difficulty = 1.0
            else if(this.game_difficulty == "hard")
                this.difficulty = 1.5
        }

        //Create Adversary Animation
        this.createAdversaryAnimation()
        //Start Adversary Animation
        this.playAdversaryAnimation()
        
        this.raceBeginning = performance.now()

    }

    //Update Lap Sprite
    updateLaps() {
        this.lapSprite.updateText(`${this.vehicleLap} / 3`);
    }
    
    //Update Speed Sprite
    updateSpeedDisplay() {

        if (this.vehicle_inside_track === false) {
            this.speedSprite.updateText(`Speed: ${(Math.abs(this.vehicle_speed) * 1000).toFixed(0)}`, '#6879D0');
        } else {
            this.speedSprite.updateText(`Speed: ${(Math.abs(this.vehicle_speed) * 1000).toFixed(0)}`);
        }
    }

    //Update Race time Sprite  
    updateRaceTime(){
        if(this.raceBeginning){
            this.raceTime = (performance.now() - this.raceBeginning) + this.raceTimePenalty
            this.timerSprite.updateTimer(this.raceTime)
        }

    }

    //Update Effect Sprite
    updateEffectSprite(){
        if(this.raceBeginning){

            let lastEffect = this.lastAppliedEffect[this.lastAppliedEffect.length-1]
            if(lastEffect == undefined)
                lastEffect = ""
            this.effectSprite.updateText("Effect: " + lastEffect)
        }
    }

    //Check Collisions of vehicles with finishLine and checks if the game ended
    checkEnd(){

        let sphere = new THREE.Sphere(this.vehicleBoundingBox.position,this.vehicleBoundingBox.geometry.parameters.radius)
        
        if(performance.now()-this.vehicleLastLap > 5*1000 && this.finishLine.intersectsSphere(sphere)){
            this.vehicleLap++
            console.log("vehicleLap Completed")
            this.vehicleLastLap = performance.now()
        }

        if(this.vehicleLap == this.TotalLaps){
            this.winner = "Vehicle"
            this.lapSprite.updateText("3/3","#00ff00")
            this.stateMachine.update_state('initial');
            this.stateMachine.execute_state();
        }

        sphere = new THREE.Sphere(this.ads_vehicleBoundingBox.position,this.ads_vehicleBoundingBox.geometry.parameters.radius)

        if(performance.now()-this.ads_vehicleLastLap > 5*1000 && this.finishLine.intersectsSphere(sphere)){
            this.ads_vehicleLap++
            console.log("ads_vehicleLap Completed")
            this.ads_vehicleLastLap = performance.now()
        }

        if(this.ads_vehicleLap == this.TotalLaps){
            this.winner = "Adversary"
            this.stateMachine.update_state('initial');
            this.stateMachine.execute_state();
        }


    }

    // Animate PowerUPs (MyReader instances)
    animatePowerUps(){
        if (this.circuit) {
            // Animate the children of MyReader
            this.circuit.mesh.children.forEach(cir_child => {
                if(cir_child.name == "powerUps" ){
                    cir_child.children.forEach(child => {
                        if (child.children[0] && child.children[0].animate && typeof child.children[0].animate === 'function') {
                            child.children[0].animate();
                        }
                    })
                }
            });
        }
    }

    // Update scene
    update() {

        this.animatePowerUps()
        this.shader.updateUniformsValue('timeFactor',performance.now()*0.0025)
        this.shader1.updateUniformsValue('timeFactor',performance.now()*0.0025)
        

        if (this.stateMachine.current_state === "initial") {
            this.stateMachine.rotateCamera();
            this.updateButtonPosition();
            this.button_hover();
        }
        else if (this.stateMachine.current_state === "choose_player_car"
        || this.stateMachine.current_state === "choose_opponent_car"
        || this.stateMachine.current_state === "choose_difficulty") {
            this.button_hover();
        }
        else if (this.stateMachine.current_state === "in_game") {
            //Update scene according to keys. Update vehicle and cam if present
            this.keyActionUpdate()
            if(this.vehicle){
                this.updateVehicle()
                this.updateVehicleCam()
                this.checkCollisions()
                this.checkVehicleTrackDist()
            }

            if(this.ads_vehicle){
                this.adversaryAnimate()
                this.updateAdversary()
            }

            this.updateLaps();
            this.updateSpeedDisplay();
            this.updateRaceTime();
            this.updateEffectSprite();
            this.checkEnd()
        }
    }
}

export { MyContents };