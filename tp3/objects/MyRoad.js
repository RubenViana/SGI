import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyRoad extends THREE.Object3D {

    constructor() {
        super();

        // Texture road
        this.roadTexture = new THREE.TextureLoader().load('./objects/textures/pitRoad.png');
        this.roadTexture.wrapS = THREE.RepeatWrapping;
        this.roadTexture.wrapT = THREE.RepeatWrapping;
        this.roadTexture.colorSpace = THREE.SRGBColorSpace;
        this.roadTexture.repeat.set(1, 30);

        // PitStop Road (Box)
        this.roadWidth = 9;
        this.roadHeight = 1.1;
        this.roadDepth = 550;
        this.roadMaterial = new THREE.MeshPhongMaterial({ map: this.roadTexture });

        this.roadGeometry = new THREE.BoxGeometry(this.roadWidth, this.roadHeight, this.roadDepth);
        this.roadGeometry.userData.obb = new OBB();
        this.roadGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.roadWidth / 2, (this.roadHeight- 0.1) / 2, this.roadDepth / 2));

        this.road = new THREE.Mesh(this.roadGeometry, this.roadMaterial);
        this.road.position.set(58, 0, 300);
        this.road.rotation.y = Math.PI/60;

        this.road.userData.obb = new OBB();

        this.update();

        this.add(this.road);
    }

    update() {
        this.road.updateMatrix();
        this.road.updateMatrixWorld();
        this.road.userData.obb.copy(this.roadGeometry.userData.obb);
        this.road.userData.obb.applyMatrix4(this.road.matrixWorld);
    }
}

export { MyRoad };