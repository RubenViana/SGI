import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyBoxSeparator extends THREE.Object3D {

    constructor() {
        super();

        // Texture box
        this.boxTexture = new THREE.TextureLoader().load('./objects/textures/box.png');
        this.boxTexture.wrapS = THREE.RepeatWrapping;
        this.boxTexture.wrapT = THREE.RepeatWrapping;
        this.boxTexture.colorSpace = THREE.SRGBColorSpace;
        this.boxTexture.repeat.set(50, 10);

        // Box Separator (Box)
        this.boxWidth = 8;
        this.boxHeight = 5;
        this.boxDepth = 200;
        this.boxMaterial = new THREE.MeshPhongMaterial({ map: this.boxTexture });

        this.boxGeometry = new THREE.BoxGeometry(this.boxWidth, this.boxHeight, this.boxDepth);
        this.boxGeometry.userData.obb = new OBB();
        this.boxGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.boxWidth / 2, this.boxHeight / 2, this.boxDepth / 2));

        this.box = new THREE.Mesh(this.boxGeometry, this.boxMaterial);
        this.box.position.set(345, 2.5, 510);

        this.box.userData.obb = new OBB();

        this.update();

        this.add(this.box);
    }

    update() {
        this.box.updateMatrix();
        this.box.updateMatrixWorld();
        this.box.userData.obb.copy(this.boxGeometry.userData.obb);
        this.box.userData.obb.applyMatrix4(this.box.matrixWorld);
    }
}

export { MyBoxSeparator };