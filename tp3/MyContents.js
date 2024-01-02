import * as THREE from 'three';
import { MyAxis } from './MyAxis.js';
import { MyFileReader } from './parser/MyFileReader.js';
import { MyGraph } from './builder/MyGraph.js';
import {InitState} from './states/InitState.js';
import {MainMenuState} from './states/MainMenuState.js';
import {GamePlayState} from './states/GamePlayState.js';
import { MyLakes } from './MyLakes.js';
import { MyShader } from './MyShader.js';
import { MyPowerUp } from './objects/MyPowerUp.js';
import { MyTest } from './MyTest.js';

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

         // shader code panels references
		this.shadersDiv = document.getElementById("shaders");
        this.shaderDescription = document.getElementById("shader-description");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");
        this.selectedShaderIndex = 0;

        // Object interface variables
        this.selectedObject = null;
        this.selectedObjectIndex = null;
		this.oldSelectedObjectIndex = null;
		this.objectList = {
			'Lake': 0,
            'Lake pulsation': 1,
		}

        // initial configuration of interface
		this.showShaderCode = false;
		this.scaleFactor = -0.0;
        this.blendFactor = 0.5;

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

        // add an ambient light
        const ambientLight = new THREE.AmbientLight( 0x555555, 4 );
        this.app.scene.add( ambientLight );
        
        // add a sun light
        this.directionalLight = new THREE.DirectionalLight(0xf8e45c, 10);
        this.directionalLight.castShadow = true;
        this.app.scene.add(this.directionalLight);
        this.directionalLight.position.set(-0, 30, 0); // Adjust the position of the light source
        this.directionalLightHelper = new THREE.DirectionalLightHelper( this.directionalLight );
        this.app.scene.add( this.directionalLightHelper );


        document.addEventListener(
            "pointermove",
            this.onPointerMove.bind(this)
        );

        document.addEventListener("pointerdown", this.onPointerDown.bind(this));

        // Init states
        this.state = new InitState(this.app)

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

        document.addEventListener("keydown", this.onKeyDown, false);
        document.addEventListener("keyup", this.onKeyUp, false);
        document.addEventListener("keypress", this.onKeyPress, false);

        // the available objects
        this.objects = [
			new MyLakes(this.app),
            new MyTest(this.app),
		]
        this.selectedObjectIndex = 0

        // Materials and textures initialization
        const texture1 = new THREE.TextureLoader().load('./objects/textures/lake.png')
        texture1.wrapS = THREE.RepeatWrapping;
        texture1.wrapT = THREE.RepeatWrapping;
        
        // load second texture
        const texture2 = new THREE.TextureLoader().load('./objects/textures/waterMap.jpg' )

        // shaders initialization
        this.shaders = [
            new MyShader(this.app, 'Blend textures animated', "load two texture and blend them. Displace them by time   ", "shaders/texture1.vert", "shaders/texture3anim.frag", {
                uSampler1: {type: 'sampler2D', value: texture1 },
                uSampler2: {type: 'sampler2D', value: texture2 },
                //normScale: {type: 'f', value: 0.1 },
                displacement: {type: 'f', value: 0.0 },
                normalizationFactor: {type: 'f', value: 1 },
                blendScale: {type: 'f', value: 0.5 },
                timeFactor: {type: 'f', value: 0.0 },
                
            }),
			new MyShader(this.app, "Flat Shading", "Uses a constant  color to shade the object",
                "shaders/flat.vert", "shaders/flat.frag", { 
                }),
            new MyShader(this.app, "Color mix shading", "Uses two flat colors and color mix to shade the object",
                "shaders/colormix.vert", "shaders/colormix.frag", {
                    colorB: {type: 'vec3', value: new THREE.Color(1,0,0)},
                    colorA: {type: 'vec3', value: new THREE.Color(0,1,0)}
            }),
            new MyShader(this.app, "Normal color shading", "uses vertex normal vector as fragment color", 
                "shaders/normal.vert", "shaders/normal.frag", {            
            }),
            new MyShader(this.app, "Scaled normal color shading", "uses vertex normal vector as color. Vertex position is discplaced by a user-defined scale factor ", 
                "shaders/scaled-normal.vert", "shaders/normal.frag", {
                    normScale: {type: 'f', value: 0.1 },
                    displacement: {type: 'f', value: 0.0 },
                    normalizationFactor: {type: 'f', value: 1 },
            }),
            new MyShader(this.app, "Conditional color shading", "Shades differently depending on vertex position", 
                "shaders/conditional-if.vert", "shaders/conditional-if.frag", {
                normScale: {type: 'f', value: 0.1 },
                displacement: {type: 'f', value: 0.0 },
                normalizationFactor: {type: 'f', value: 1 },
            }),
			new MyShader(this.app, 'Simple texture', "load a texture", "shaders/texture1.vert", "shaders/texture1.frag", {
                uSampler: {type: 'sampler2D', value: texture1 },
                normScale: {type: 'f', value: 0.1 },
                displacement: {type: 'f', value: 0.0 },
                normalizationFactor: {type: 'f', value: 1 },
            }),
            new MyShader(this.app, 'Blend textures', "load two texture and blend them   ", "shaders/texture1.vert", "shaders/texture2.frag", {
                uSampler1: {type: 'sampler2D', value: texture1 },
                uSampler2: {type: 'sampler2D', value: texture2 },
                normScale: {type: 'f', value: 0.1 },
                displacement: {type: 'f', value: 0.0 },
                normalizationFactor: {type: 'f', value: 1 },
                blendScale: {type: 'f', value: 0.5 },
            })
			
		];

        this.waitForShaders()
    }

    waitForShaders() {
        for (let i=0; i<this.shaders.length; i++) {
            if (this.shaders[i].ready === false) {
                setTimeout(this.waitForShaders.bind(this), 100)
                return;
            }
        }
         // set initial object
         this.onSelectedObjectChanged()
        
         // set initial shader
         this.onSelectedShaderChanged(this.selectedShaderIndex);
 
         // set initial shader details visualization
         this.onShaderCodeVizChanged(this.showShaderCode);
    }

    fromShaderList() {
        let list = {}
        for (var i=0; i<this.shaders.length; i++) { 
            list[this.shaders[i].name]=i
        }
        return list;
    }
    // Interface event handlers

	// Show/hide shader code
	onShaderCodeVizChanged(v) {
		if (v)
			this.shadersDiv.style.display = "block";
		else
			this.shadersDiv.style.display = "none";
	}

	// Called when selected shader changes
	onSelectedShaderChanged(index) {
        this.selectedShaderIndex = index
        this.currentShader = this.shaders[this.selectedShaderIndex]
        this.setCurrentShader(this.currentShader)
    }  

    setCurrentShader(shader) {
        if (shader === null || shader === undefined) {
            return
        }
        console.log("Selected shader '" + shader.name + "'")

        if (this.selectedObject !== null) {
            this.selectedObject.mesh.material = shader.material
            this.selectedObject.mesh.material.needsUpdate = true
        }
        // update shader code
        this.shaderDescription.innerHTML = "<xmp>" + shader.name + ": "+ shader.description + "</xmp>";
        this.vShaderDiv.innerHTML = "<xmp>" + shader.vertexShader + "</xmp>";
        this.fShaderDiv.innerHTML = "<xmp>" + shader.fragmentShader + "</xmp>";

         this.onScaleFactorChanged(this.scaleFactor)
     }

    // called when a new object is selected
	onSelectedObjectChanged() {

        if (this.selectedObjectIndex !== this.oldSelectedObjectIndex) {
            if (this.oldSelectedObjectIndex !== null) {
                this.app.scene.remove(this.objects[this.oldSelectedObjectIndex].mesh)
                this.selectedObject = null
            }
        
            if (this.selectedObjectIndex == 0) {
                this.showLake()
                this.setCurrentShader(this.shaders[0])
               
            }
            else if (this.selectedObjectIndex == 1) {
                this.showTest()
                this.setCurrentShader(this.currentShader)
            }
            this.oldSelectedObjectIndex = this.selectedObjectIndex
        }
	}

	onScaleFactorChanged(v) {
        if (this.currentShader !== undefined && this.currentShader !== null) {
            this.currentShader.updateUniformsValue("normScale", this.scaleFactor );
        }
        
	}

    onBlendFactorChanged(v) {
        if (this.currentShader !== undefined && this.currentShader !== null) {
            this.currentShader.updateUniformsValue("blendScale", this.blendFactor );
        }
	}

    showLake() {       
        this.selectedObject = this.objects[0]
        this.app.scene.add(this.selectedObject.mesh)
    }

    showTest() {
        this.selectedObject = this.objects[1]
        this.app.scene.add(this.selectedObject.mesh)
    }

    
    update() {
        this.state.update()
        // console.log(this.state.name)
        let t = this.app.clock.getElapsedTime()
        if (this.currentShader !== undefined && this.currentShader !== null) {
            if (this.currentShader.hasUniform("timeFactor")) {
                this.currentShader.updateUniformsValue("timeFactor", t / 3);
            }
        }

        if (this.currentShader !== undefined && this.selectedObject !== null) {
            if (this.currentShader.hasUniform("normScale")) {
                this.currentShader.updateUniformsValue("normScale", t % 0.5 );
            }
        }
    }

    onKeyDown(event) {
        this.state.onKeyDown(event)
    }

    onKeyUp(event) {
        this.state.onKeyUp(event)
    }

    onKeyPress(event) {
        this.state.onKeyPress(event)
    }

    onPointerMove(event) {
        this.state.onPointerMove(event)
    }  
    
    onPointerDown(event) {
        this.state.onPointerDown(event)
    }

}

export { MyContents };