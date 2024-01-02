import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyObstacle extends THREE.Object3D {

    constructor() {
        super();

        // Material obstacle (Box)
        this.obstacleWidth = 8;
        this.obstacleHeight = 5;
        this.obstacleDepth = 200;
        this.obstacleMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

        // Obstacle
        this.obstacleGeometry = new THREE.BoxGeometry(this.obstacleWidth, this.obstacleHeight, this.obstacleDepth);
        this.obstacleGeometry.userData.obb = new OBB();
        this.obstacleGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.obstacleWidth / 2, this.obstacleHeight / 2, this.obstacleDepth / 2));

        this.obstacle = new THREE.Mesh(this.obstacleGeometry, this.obstacleMaterial);
        this.obstacle.position.set(345, 2.5, 510);

        this.obstacle.userData.obb = new OBB();

        this.update();
        
        this.add( this.obstacle );

    }

    update() {
        this.obstacle.updateMatrix();
        this.obstacle.updateMatrixWorld();
        this.obstacle.userData.obb.copy(this.obstacleGeometry.userData.obb);
        this.obstacle.userData.obb.applyMatrix4(this.obstacle.matrixWorld);
    }
}

export { MyObstacle };