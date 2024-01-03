import { State } from "./State.js";
import { GameSettingsState } from "./GameSettingsState.js";
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { MapControls } from 'three/addons/controls/MapControls.js';

class MainMenuState extends State {
    constructor(app) {
        super(app);
        this.name = "MainMenuState";
        

        this.buttonsGroup = new THREE.Group();
        // this.buttonsGroup.add(this.buttons[0], this.buttons[1]); 
        this.buildButton("Play", "#00ff00", 4, 1, 0, 0, 0);
        
        this.title = new THREE.Group();
        this.createText("FormulaB", "#cc0000", 6, 1, -22, 3.4, 0, this.title);
        this.createText("By", "#ffffff", 1, 0.2, -4.1, 3, 0, this.title);
        this.createText("Pedro Balazeiro", "#ff00ff", 1, 0.2, 0, 2, 0, this.title);
        this.createText("Ruben Viana", "#ff00ff", 1, 0.2, -1, 1, 0, this.title);

        this.title.scale.set(1.5, 1.5, 1.5);
        this.title.position.set(90, 0, 130);
        this.title.rotation.y = -Math.PI / 4;

        this.buttonsGroup.position.set(50, 0.5, 115);
        // this.buttonsGroup.rotation.z = -Math.PI / 4;
        this.buttonsGroup.rotation.x = -Math.PI / 2;

        // add race track to scene
        this.app.scene.add(this.app.track);
        this.app.scene.add(this.app.plane);
        this.app.scene.add(this.app.powerUps);
        // this.app.scene.add(this.app.car);
        this.app.scene.add(this.app.obstacles);

        this.app.scene.add(this.buttonsGroup);
        this.app.scene.add(this.title);

        // create menu camera
        this.menuCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        this.menuCamera.position.set(41, 15, 137);
        this.menuCamera.lookAt(this.title.position);
        this.app.cameras["Menu"] = this.menuCamera;

        this.app.setActiveCamera("Menu");

        this.app.controls = new MapControls(this.app.activeCamera, this.app.renderer.domElement);
        this.app.controls.target.set(60, 0, 120);

        this.group = new THREE.Group();
        this.firstLetter = true;
        this.group.position.set(65, 0.5, 130);
        this.group.rotation.y = -Math.PI / 3;
        this.app.scene.add(this.group);
    }

    update() {
        this.display();
    }

    display() {
        //display the main menu
    }

    onPointerMove(event) {
        this.pointer = new THREE.Vector2();

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components

        //of the screen is the origin
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //console.log("Position x: " + this.pointer.x + " y: " + this.pointer.y);

        //2. set the picking ray from the camera position and mouse coordinates
        this.raycaster.setFromCamera(this.pointer, this.app.activeCamera);

        //3. compute intersections
        var intersects = this.raycaster.intersectObjects(this.buttonsGroup.children);

        //4. highlight the picked object
        this.pickingHelper(intersects)
    }   

    onPointerDown(event) {
        this.pointer = new THREE.Vector2();

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components

        //of the screen is the origin
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //console.log("Position x: " + this.pointer.x + " y: " + this.pointer.y);

        //2. set the picking ray from the camera position and mouse coordinates
        this.raycaster.setFromCamera(this.pointer, this.app.activeCamera);

        //3. compute intersections
        var intersects = this.raycaster.intersectObjects(this.buttonsGroup.children);

        if (intersects.length > 0) {
            switch (intersects[0].object.name) {
                case "Play":
                    // this.app.scene.remove(this.buttonsGroup);
                    if (this.text == null)
                        this.app.playerName = "Player 1";
                    else
                        this.app.playerName = this.text;
                    this.setState(new GameSettingsState(this.app));
                    break;
            }
        }
    }

    onKeyDown( event ) {

        if ( this.firstLetter ) {

            this.firstLetter = false;
            this.text = '';

        }

        const keyCode = event.keyCode;

        // backspace

        if ( keyCode == 8 ) {

            event.preventDefault();

            this.text = this.text.substring( 0, this.text.length - 1 );
            this.refreshText();

            return false;

        }

    }

    onKeyPress( event ) {

        const keyCode = event.which;

        // backspace

        if ( keyCode == 8 ) {

            event.preventDefault();

        } else {

            const ch = String.fromCharCode( keyCode );
            this.text += ch;

            this.refreshText();

        }

    }

    buildText() {

        var loader = new FontLoader();
        var font;
    
        loader.load('./fonts/helvetiker_regular.typeface.json', function (response) {
            font = response;
    
            var textGeo = new TextGeometry(this.text, {
                font: font,
                size: 2,
                height: 0.5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5

            });
    
            var textMaterial = new THREE.MeshBasicMaterial({ color: '#0000ff' });
            
            textGeo.computeBoundingBox();

            const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

            this.textMesh1 = new THREE.Mesh( textGeo, textMaterial );

            this.textMesh1.position.x = centerOffset;
            this.textMesh1.position.y = 0;
            this.textMesh1.position.z = 0;

            this.textMesh1.rotation.x = 0;
            this.textMesh1.rotation.y = Math.PI * 2;

            this.group.add( this.textMesh1 );

        }.bind(this));

    }

    refreshText() {

        this.group.remove( this.textMesh1 );

        if ( ! this.text ) return;

        this.buildText();

    }
}

export { MainMenuState };