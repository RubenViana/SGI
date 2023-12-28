import * as THREE from 'three';


class State {
    constructor(app) {
        this.app = app

        this.pickingColor = 0xf0f0f0;

        //picking: read documentation of THREE.Raycaster

        this.raycaster = new THREE.Raycaster()
        this.raycaster.near = 1
        this.raycaster.far = 100
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
    buildButton(name, color, width, height, depth, xpos, ypos, zpos) {

        let boxMaterial = new THREE.MeshPhongMaterial({
            color: color,
            specular: "#000000",
            emissive: "#000000",
            shininess: 90,
        });

        // Create a Cube Mesh with basic material
        let box = new THREE.BoxGeometry(
            width,
            height,
            depth
        );
        this.boxMesh = new THREE.Mesh(box, boxMaterial);
        this.boxMesh.name = name
        this.boxMesh.position.x = xpos;
        this.boxMesh.position.y = ypos;
        this.boxMesh.position.z = zpos;

        return this.boxMesh;
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
}

export { State };