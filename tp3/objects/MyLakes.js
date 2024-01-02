import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyLakes extends THREE.Object3D {

    constructor() {
        super();

        // Texture lake
        this.lakeTexture = new THREE.TextureLoader().load('./objects/textures/lake.png');
        this.lakeTexture.wrapS = THREE.RepeatWrapping;
        this.lakeTexture.wrapT = THREE.RepeatWrapping;
        this.lakeTexture.colorSpace = THREE.SRGBColorSpace;
        this.lakeTexture.repeat.set(50, 50);

        // Lake Bottom (Circle)
        this.lakeRadius = 50;
        this.lakeSegments = 32;
        this.lakeMaterial = new THREE.MeshPhongMaterial({ map: this.lakeTexture });

        this.lakeGeometry = new THREE.CircleGeometry(this.lakeRadius, this.lakeSegments);
        this.lakeGeometry.userData.obb = new OBB();
        this.lakeGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.lakeRadius / 2, 0.6 / 2, this.lakeRadius / 2));
        
        this.lake = new THREE.Mesh(this.lakeGeometry, this.lakeMaterial);
        this.lake.position.set(480, 0.6, 450);
        this.lake.rotation.x = -Math.PI / 2;

        this.lake.userData.obb = new OBB();

        // Lake Top (Circle)
        this.lakeTopRadius = 40;
        this.lakeTopSegments = 32;
        this.lakeTopMaterial = new THREE.MeshPhongMaterial({ map: this.lakeTexture });

        this.lakeTopGeometry = new THREE.CircleGeometry(this.lakeTopRadius, this.lakeTopSegments);
        this.lakeTopGeometry.userData.obb = new OBB();
        this.lakeTopGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.lakeTopRadius / 2, 0.6 / 2, this.lakeTopRadius / 2));
        this.lakeTop = new THREE.Mesh(this.lakeTopGeometry, this.lakeTopMaterial);
        this.lakeTop.position.set(430, 0.6, 120);
        this.lakeTop.rotation.x = -Math.PI / 2;

        this.lakeTop.userData.obb = new OBB();

        this.update();

        this.add(this.lake, this.lakeTop);
    }

    update() {
        this.lake.updateMatrix();
        this.lake.updateMatrixWorld();
        this.lake.userData.obb.copy(this.lakeGeometry.userData.obb);
        this.lake.userData.obb.applyMatrix4(this.lake.matrixWorld);
        this.lakeTop.updateMatrix();
        this.lakeTop.updateMatrixWorld();
        this.lakeTop.userData.obb.copy(this.lakeTopGeometry.userData.obb);
        this.lakeTop.userData.obb.applyMatrix4(this.lakeTop.matrixWorld);
    }
}

export { MyLakes };