import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyPitStop extends THREE.Object3D {

    constructor() {
        super();

        // Texture wall
        this.wallTexture = new THREE.TextureLoader().load('./objects/textures/wall.png');
        this.wallTexture.wrapS = THREE.RepeatWrapping;
        this.wallTexture.wrapT = THREE.RepeatWrapping;
        this.wallTexture.colorSpace = THREE.SRGBColorSpace;
        this.wallTexture.repeat.set(2, 4);

        // Texture pillar
        this.pillarTexture = new THREE.TextureLoader().load('./objects/textures/pillar.png');
        this.pillarTexture.wrapS = THREE.RepeatWrapping;
        this.pillarTexture.wrapT = THREE.RepeatWrapping;
        this.pillarTexture.colorSpace = THREE.SRGBColorSpace;
        this.pillarTexture.repeat.set(4, 2);


        // PitStop/Garage Left and Right Wall (Box)
        this.wallWidth = 20;
        this.wallHeight = 15;
        this.wallDepth = 8;
        this.wallMaterial = new THREE.MeshPhongMaterial({ map: this.wallTexture });

        this.pillarMaterial = new THREE.MeshPhongMaterial({ map: this.pillarTexture });

        this.wallGeometry = new THREE.BoxGeometry(this.wallWidth - 4, this.wallHeight, this.wallDepth);
        this.wallGeometry.userData.obb = new OBB();
        this.wallGeometry.userData.obb.halfSize.set(this.wallWidth / 2, this.wallHeight / 2, this.wallDepth / 2);

        this.roofGeometry = new THREE.BoxGeometry(this.wallWidth, 2, 50);
        this.roofGeometry.userData.obb = new OBB();
        this.roofGeometry.userData.obb.halfSize.set(50 / 2, 1 / 2, this.wallDepth / 2);

        this.pillar = new THREE.Mesh(this.wallGeometry, this.pillarMaterial);
        this.pillar.position.set(80, this.wallHeight/2, 400);
        this.pillar.userData.obb = new OBB();

        this.roof = new THREE.Mesh(this.roofGeometry, this.wallMaterial);
        this.roof.position.set(80, 10, 400);
        this.roof.userData.obb = new OBB();

        this.update();

        this.add(this.pillar, this.roof);
    }

    update() {
        this.pillar.updateMatrix();
        this.pillar.updateMatrixWorld();
        this.pillar.userData.obb.copy(this.wallGeometry.userData.obb);
        this.pillar.userData.obb.applyMatrix4(this.pillar.matrixWorld);
        this.roof.updateMatrix();
        this.roof.updateMatrixWorld();
        this.roof.userData.obb.copy(this.roofGeometry.userData.obb);
        this.roof.userData.obb.applyMatrix4(this.roof.matrixWorld);
    }
}

export { MyPitStop };