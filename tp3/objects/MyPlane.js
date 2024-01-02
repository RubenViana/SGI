import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyPlane extends THREE.Object3D {

    constructor() {
        super();

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

        this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
        this.plane.position.set(500, 0, 400);
        this.plane.rotation.x = -Math.PI / 2;

        this.plane.userData.obb = new OBB();

        this.update();

        this.add(this.plane,);
    }

    update() {
        this.plane.updateMatrix();
        this.plane.updateMatrixWorld();
        this.plane.userData.obb.copy(this.planeGeometry.userData.obb);
        this.plane.userData.obb.applyMatrix4(this.plane.matrixWorld);
    }
}

export { MyPlane };