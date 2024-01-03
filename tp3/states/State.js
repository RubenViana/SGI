import * as THREE from 'three';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import {FontLoader} from 'three/addons/loaders/FontLoader.js';


class State {
    constructor(app) {
        this.app = app

        this.pickingColor = 0xf0f0f0;

        //picking: read documentation of THREE.Raycaster

        this.raycaster = new THREE.Raycaster()
        this.raycaster.near = 1
        this.raycaster.far = 1000
    }
    
    update() {}

    setState(state) {
        this.app.contents.state = state
    }

    onKeyDown(event) {}

    onKeyUp(event) {}

    onKeyPress(event) {}

    onPointerMove(event) {}

    onPointerDown(event) {}

    /**
     * builds the box mesh with material assigned
     */
    buildButton(name, color, size, height, xpos, ypos, zpos) {
        var loader = new FontLoader();
        var font;
    
        loader.load('./fonts/helvetiker_regular.typeface.json', function (response) {
            font = response;
    
            var textGeometry = new TextGeometry(name, {
                font: font,
                size: size,
                height: height,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5

            });
    
            textGeometry.center();
    
            var textMaterial = new THREE.MeshBasicMaterial({ color: color });
            this.textMesh = new THREE.Mesh(textGeometry, textMaterial);
            this.textMesh.name = name;
            // Adjust position if needed
            this.textMesh.position.set(xpos, ypos, zpos);
            this.buttonsGroup.add(this.textMesh);

        }.bind(this));
    }

    createText(name, color, size, height, xpos, ypos, zpos, group) {
        var loader = new FontLoader();
        var font;
    
        loader.load('./fonts/helvetiker_regular.typeface.json', function (response) {
            font = response;
    
            var textGeometry = new TextGeometry(name, {
                font: font,
                size: size,
                height: height,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5

            });
    
            textGeometry.center();
    
            var textMaterial = new THREE.MeshBasicMaterial({ color: color });
            this.textMesh = new THREE.Mesh(textGeometry, textMaterial);
            this.textMesh.name = name;
            // Adjust position if needed
            this.textMesh.position.set(xpos, ypos, zpos);
            group.add(this.textMesh);

        }.bind(this));
    }


    /*
    * Change the color of the first intersected object
    *
    */
    changeColorOfFirstPickedObj(obj) {
        if (this.lastPickedObj != obj) {
            if (this.lastPickedObj)
                this.lastPickedObj.material.color.setHex(this.lastPickedObj.currentHex);
            this.lastPickedObj = obj;
            this.lastPickedObj.currentHex = this.lastPickedObj.material.color.getHex();
            this.lastPickedObj.material.color.setHex(this.pickingColor);
        }
    }

    /*
     * Restore the original color of the intersected object
     *
     */
    restoreColorOfFirstPickedObj() {
        if (this.lastPickedObj)
            this.lastPickedObj.material.color.setHex(this.lastPickedObj.currentHex);
        this.lastPickedObj = null;
    }

    /*
    * Helper to visualize the intersected object
    *
    */
    pickingHelper(intersects) {
        if (intersects.length > 0) {
            const obj = intersects[0].object
            this.changeColorOfFirstPickedObj(obj)
        } else {
            this.restoreColorOfFirstPickedObj()
        }
    }

    pickingCarHelper(intersects) {
        if (intersects.length > 0) {
            const obj = intersects[0].object.parent;
            this.changeScaleOfFirstPickedObj(obj, 0.5, 0.6)
        } else {
            this.restoreScaleOfFirstPickedObj(0.5)
        }
    }

    pickingObstacleHelper(intersects) {
        if (intersects.length > 0) {
            const obj = intersects[0].object;
            this.changeScaleOfFirstPickedObj(obj, 1, 1.2)
        } else {
            this.restoreScaleOfFirstPickedObj(1)
        }
    }

    changeScaleOfFirstPickedObj(obj, scale, scale2) {
        if (this.lastPickedCar != obj) {
            if (this.lastPickedCar){
                this.lastPickedCar.scale.set(scale, scale, scale);
                this.lastPickedCar.position.y = 0;
            }
            this.lastPickedCar = obj;
            this.lastPickedCar.scale.set(scale2, scale2, scale2);
        }
    }

    restoreScaleOfFirstPickedObj(scale) {
        if (this.lastPickedCar){
            this.lastPickedCar.scale.set(scale, scale, scale);
            this.lastPickedCar.position.y = 0;
        }
        this.lastPickedCar = null;
    }
}

export { State };