import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyObstacle extends THREE.Object3D {

    constructor(type, x, y, z) {
        super();
        this.type = type;
        this.x = x;
        this.y = y;
        this.z = z;

        // Texture obstacle
        this.obstacleTexture = new THREE.TextureLoader().load('./objects/textures/obstacle.jpg');
        this.obstacleTexture.wrapS = THREE.RepeatWrapping;
        this.obstacleTexture.wrapT = THREE.RepeatWrapping;
        this.obstacleTexture.colorSpace = THREE.SRGBColorSpace;

        // Material obstacle (Box)
        this.obstacleWidth = 2;
        this.obstacleHeight = 2;
        this.obstacleDepth = 2;
        this.obstacleMaterial = new THREE.MeshPhongMaterial({ map: this.obstacleTexture});

        // Obstacle
        this.obstacleGeometry = new THREE.BoxGeometry(this.obstacleWidth, this.obstacleHeight, this.obstacleDepth);
        this.obstacleGeometry.userData.obb = new OBB();
        this.obstacleGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.obstacleWidth / 2, this.obstacleHeight / 2, this.obstacleDepth / 2));

        this.obstacle = new THREE.Mesh(this.obstacleGeometry, this.obstacleMaterial);

        this.userData.obb = new OBB();

        this.update();
        
        this.add( this.obstacle );

    }

    update() {
        this.updateMatrix();
        this.updateMatrixWorld();
        this.userData.obb.copy(this.obstacleGeometry.userData.obb);
        this.userData.obb.applyMatrix4(this.matrixWorld);
    }

    resetPosition() {
        this.position.set(this.x, this.y, this.z);
        this.update();
    }
}

export { MyObstacle };