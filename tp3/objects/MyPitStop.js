import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyPitStop extends THREE.Object3D {

    constructor() {
        super();

        // PitStop/Garage Left and Right Wall (Box)
        this.wallWidth = 8;
        this.wallHeight = 19;
        this.wallDepth = 10;
        this.wallMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

        this.wallGeometry = new THREE.BoxGeometry(this.wallWidth, this.wallHeight, this.wallDepth);
        this.wallGeometry.userData.obb = new OBB();
        this.wallGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.wallWidth / 2, this.wallHeight / 2, this.wallDepth / 2));

        this.wallLeft = new THREE.Mesh(this.wallGeometry, this.wallMaterial);
        this.wallLeft.position.set(74.5, 4, 265.5);
        this.wallLeft.rotation.y = Math.PI/60;
        this.wallLeft.rotation.z = Math.PI/2;

        this.wallLeft.userData.obb = new OBB();

        this.wallRight = new THREE.Mesh(this.wallGeometry, this.wallMaterial);
        this.wallRight.position.set(85.5, 4, 474.5);
        this.wallRight.rotation.y = Math.PI/60;
        this.wallRight.rotation.z = Math.PI/2;

        this.wallRight.userData.obb = new OBB();

        //PitStop Top Wall (Box)
        this.wallTopWidth = 4;
        this.wallTopHeight = 20;
        this.wallTopDepth = 220;
        this.wallTopMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

        this.wallTopGeometry = new THREE.BoxGeometry(this.wallTopWidth, this.wallTopHeight, this.wallTopDepth);
        this.wallTopGeometry.userData.obb = new OBB();
        this.wallTopGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.wallTopWidth / 2, this.wallTopHeight / 2, this.wallTopDepth / 2));

        this.wallTop = new THREE.Mesh(this.wallTopGeometry, this.wallTopMaterial);
        this.wallTop.position.set(80, 10, 370);
        this.wallTop.rotation.y = Math.PI/60;
        this.wallTop.rotation.z = Math.PI/2;

        this.wallTop.userData.obb = new OBB();

        //PitStop Back Wall (Box)
        this.wallBackWidth = 4;
        this.wallBackHeight = 10;
        this.wallBackDepth = 210;
        this.wallBackMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

        this.wallBackGeometry = new THREE.BoxGeometry(this.wallBackWidth, this.wallBackHeight, this.wallBackDepth);
        this.wallBackGeometry.userData.obb = new OBB();
        this.wallBackGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.wallBackWidth / 2, this.wallBackHeight / 2, this.wallBackDepth / 2));
        this.wallBack = new THREE.Mesh(this.wallBackGeometry, this.wallBackMaterial);
        this.wallBack.position.set(87.5, 5, 370);
        this.wallBack.rotation.y = Math.PI/60;

        this.wallBack.userData.obb = new OBB();

        // Texture pillar
        this.pillarTexture = new THREE.TextureLoader().load('./objects/textures/pillar.png');
        this.pillarTexture.wrapS = THREE.RepeatWrapping;
        this.pillarTexture.wrapT = THREE.RepeatWrapping;
        this.pillarTexture.colorSpace = THREE.SRGBColorSpace;

        // PitStop Pillar (Box)
        this.pillarWidth = 18;
        this.pillarHeight = 8;
        this.pillarDepth = 1;
        this.pillarMaterial = new THREE.MeshPhongMaterial({ map: this.pillarTexture });

        this.pillarGeometry = new THREE.BoxGeometry(this.pillarWidth, this.pillarHeight, this.pillarDepth);
        this.pillarGeometry.userData.obb = new OBB();
        this.pillarGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.pillarWidth / 2, this.pillarHeight / 2, this.pillarDepth / 2));
        const totalPillars = 19; 
        const startXpillars = 75;
        const startZpillars = 280.5;
        const gapXpillars = 0.5;
        const gapZpillars = 10;

        for (let i = 0; i < totalPillars; i++) {
            const currentZ = startZpillars + i * gapZpillars;
            const currentX = startXpillars + i * gapXpillars;
            const pillar = new THREE.Mesh(this.pillarGeometry, this.pillarMaterial);
            pillar.position.set(currentX, 4, currentZ);
            pillar.rotation.y = Math.PI / 60;
            pillar.userData.obb = new OBB();
            pillar.updateMatrix();
            pillar.updateMatrixWorld();
            pillar.userData.obb.copy(this.pillarGeometry.userData.obb);
            pillar.userData.obb.applyMatrix4(pillar.matrixWorld);
            this[`pillar${i}`] = pillar;
        }

        this.update();
        
        this.add(this.wallLeft, this.wallRight, this.wallTop, this.wallBack, this.pillar0, this.pillar1, this.pillar2, this.pillar3, this.pillar4, this.pillar5, 
                 this.pillar6, this.pillar7, this.pillar8, this.pillar9, this.pillar10, this.pillar11, this.pillar12, this.pillar13, this.pillar14, this.pillar15, 
                 this.pillar16, this.pillar17, this.pillar18);
    }

    update() {
        this.wallLeft.updateMatrix();
        this.wallLeft.updateMatrixWorld();
        this.wallLeft.userData.obb.copy(this.wallGeometry.userData.obb);
        this.wallLeft.userData.obb.applyMatrix4(this.wallLeft.matrixWorld);
        this.wallRight.updateMatrix();
        this.wallRight.updateMatrixWorld();
        this.wallRight.userData.obb.copy(this.wallGeometry.userData.obb);
        this.wallRight.userData.obb.applyMatrix4(this.wallRight.matrixWorld);
        this.wallTop.updateMatrix();
        this.wallTop.updateMatrixWorld();
        this.wallTop.userData.obb.copy(this.wallTopGeometry.userData.obb);
        this.wallTop.userData.obb.applyMatrix4(this.wallTop.matrixWorld);
        this.wallBack.updateMatrix();
        this.wallBack.updateMatrixWorld();
        this.wallBack.userData.obb.copy(this.wallBackGeometry.userData.obb);
        this.wallBack.userData.obb.applyMatrix4(this.wallBack.matrixWorld);
    }
}

export { MyPitStop };