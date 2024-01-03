import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyPlane extends THREE.Object3D {

    constructor(app) {
        super(app);

        // Texture plane
        this.planeTexture = new THREE.TextureLoader().load('./objects/textures/plane.png');
        this.planeTexture.wrapS = THREE.RepeatWrapping;
        this.planeTexture.wrapT = THREE.RepeatWrapping;
        this.planeTexture.colorSpace = THREE.SRGBColorSpace;

        // Material plane (box)
        this.planeWidth = 2000;
        this.planeHeight = 2000;
        this.planeDepth = 1;
        this.planeMaterial = new THREE.MeshPhongMaterial({map: this.planeTexture });
        this.planeMaterial.map.repeat.set(500, 500);

        // Plane
        this.planeGeometry = new THREE.BoxGeometry(this.planeWidth, this.planeHeight, this.planeDepth);
        this.planeGeometry.userData.obb = new OBB();
        this.planeGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.planeWidth / 2, this.planeHeight / 2, this.planeDepth / 2));

        this.mesh = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
        this.mesh.position.set(500, 0, 400);
        this.mesh.rotation.x = -Math.PI / 2;

        this.mesh.userData.obb = new OBB();

        this.update();

        this.add(this.mesh,);

        this.setFillMode();
    }

    update() {
        this.mesh.updateMatrix();
        this.mesh.updateMatrixWorld();
        this.mesh.userData.obb.copy(this.planeGeometry.userData.obb);
        this.mesh.userData.obb.applyMatrix4(this.mesh.matrixWorld);
    }

    setFillMode() { 
		this.planeMaterial.wireframe = false;
		this.planeMaterial.needsUpdate = true;
	}

	setLineMode() { 
		this.planeMaterial.wireframe = true;
		this.planeMaterial.needsUpdate = true;
	}

	setWireframe(value) {
		if (value) {
			this.setLineMode()
		} else {
			this.setFillMode()
		}
	}
}

export { MyPlane };