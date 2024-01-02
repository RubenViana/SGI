import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyTest extends THREE.Object3D {

    constructor(app) {
        super();
		this.app = app
		// Lake Bottom (Cylinder)
        this.lakeRadius = 50;
        this.lakeHeight = 10;
        this.lakeSegments = 32;

        this.lakeGeometry = new THREE.CylinderGeometry(this.lakeRadius, this.lakeRadius, this.lakeHeight, this.lakeSegments);
        this.lakeGeometry.userData.obb = new OBB();
        this.lakeGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.lakeRadius, this.lakeHeight, this.lakeRadius));
		this.material = new THREE.MeshPhongMaterial( { side: THREE.DoubleSide } ); 
		this.mesh = new THREE.Mesh( this.lakeGeometry, this.material )
        this.mesh.position.set(480, 5, 450);
        this.mesh.userData.obb = new OBB();
        this.update();
		this.setFillMode()

        this.lakeTopRadius = 40;
        this.lakeTopSegments = 32;

        // Texture lake
        this.lakeTexture = new THREE.TextureLoader().load('./objects/textures/lake.png');
        this.lakeTexture.wrapS = THREE.RepeatWrapping;
        this.lakeTexture.wrapT = THREE.RepeatWrapping;
        this.lakeTexture.colorSpace = THREE.SRGBColorSpace;
        this.lakeTexture.repeat.set(50, 50);

        this.lakeTopGeometry = new THREE.CircleGeometry(this.lakeTopRadius, this.lakeTopSegments);
        this.lakeTopMaterial = new THREE.MeshPhongMaterial({ map: this.lakeTexture });
        this.lakeTop = new THREE.Mesh(this.lakeTopGeometry, this.lakeTopMaterial);
        this.lakeTop.position.set(-50, 330, 0.6);

        this.mesh.add(this.lakeTop);

        this.add(this.mesh);
	}

	setFillMode() { 
		this.material.wireframe = false;
		this.material.needsUpdate = true;
	}

	setLineMode() { 
		this.material.wireframe = true;
		this.material.needsUpdate = true;
	}

	setWireframe(value) {
		if (value) {
			this.setLineMode()
		} else {
			this.setFillMode()
		}
	}

    update() {  
        this.mesh.updateMatrix();
        this.mesh.updateMatrixWorld();
        this.mesh.userData.obb.copy(this.lakeGeometry.userData.obb);
        this.mesh.userData.obb.applyMatrix4(this.mesh.matrixWorld);
    }
}

export { MyTest };