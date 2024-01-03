import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyRocks extends THREE.Object3D {

    constructor() {
        super();

        // Texture rocks
        this.rockTexture = new THREE.TextureLoader().load('./objects/textures/rock.png');
        this.rockTexture.wrapS = THREE.RepeatWrapping;
        this.rockTexture.wrapT = THREE.RepeatWrapping;
        this.rockTexture.colorSpace = THREE.SRGBColorSpace;

        // Rocks Sperators (Octahedron)
        this.rockRadius = 10;
        this.rockDetail = 2;
        this.rockMaterial = new THREE.MeshPhongMaterial({ map: this.rockTexture });

        this.rockGeometry = new THREE.OctahedronGeometry(this.rockRadius, this.rockDetail);
        this.rockGeometry.userData.obb = new OBB();
        this.rockGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.rockRadius, this.rockRadius, this.rockRadius));
        const totalRocks = 18; // Change this number as needed
        const startXrocks = 140;
        const startZrocks = 250;
        const gapXrocks = 2.5;
        const gapZrocks = 21;

        for (let i = 0; i < totalRocks; i++) {
            const rock = new THREE.Mesh(this.rockGeometry, this.rockMaterial);
            rock.position.set(startXrocks + i * gapXrocks, 0, startZrocks + i * gapZrocks);
            rock.userData.obb = new OBB();
            rock.updateMatrix();
            rock.updateMatrixWorld();
            rock.userData.obb.copy(this.rockGeometry.userData.obb);
            rock.userData.obb.applyMatrix4(rock.matrixWorld);
            this[`rock${i}`] = rock;
        }

        // Rocks Middle (Octahedron)
        const totalMiddleRocks = 28;
        const startXmiddleRocks = 210;
        const startZmiddleRocks = -380;
        const gapXmiddleRocks = 2.5;
        const gapZmiddleRocks = 21;
        
        for (let i = 18; i < totalMiddleRocks; i++) {
            const rock = new THREE.Mesh(this.rockGeometry, this.rockMaterial);
            rock.position.set(startXmiddleRocks + i * gapXmiddleRocks, 0, startZmiddleRocks + i * gapZmiddleRocks);
            rock.userData.obb = new OBB();
            rock.updateMatrix();
            rock.updateMatrixWorld();
            rock.userData.obb.copy(this.rockGeometry.userData.obb);
            rock.userData.obb.applyMatrix4(rock.matrixWorld);
            this[`rock${i}`] = rock;
        }


        this.add(this.rock0, this.rock1, this.rock2, this.rock3, this.rock4, this.rock5, this.rock6, this.rock7, this.rock8, this.rock9,
                 this.rock10, this.rock11, this.rock12, this.rock13, this.rock14, this.rock15, this.rock16, this.rock17, this.rock18, 
                 this.rock19, this.rock20, this.rock21, this.rock22, this.rock23, this.rock24, this.rock25, this.rock26, this.rock27);
    }
}

export { MyRocks };