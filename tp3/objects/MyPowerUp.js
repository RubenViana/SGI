import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyPowerUp extends THREE.Object3D {

    constructor(type) {
        super();
        this.type = type;

        // Texture powerUp
        this.powerUpTexture = new THREE.TextureLoader().load('./objects/textures/powerUp.png');
        this.powerUpTexture.wrapS = THREE.RepeatWrapping;
        this.powerUpTexture.wrapT = THREE.RepeatWrapping;
        this.powerUpTexture.colorSpace = THREE.SRGBColorSpace;

        // powerUp related attributes (Box)
        this.powerUpWidth = 3; 
        this.powerUpHeight = 3;
        this.powerUpDepth = 3;
        this.powerUpMaterial = new THREE.MeshPhongMaterial({ map: this.powerUpTexture });

        //PowerUp
        this.powerUpGeometry = new THREE.BoxGeometry(this.powerUpWidth, this.powerUpHeight, this.powerUpDepth);

        this.powerUpGeometry.userData.obb = new OBB();
        this.powerUpGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.powerUpWidth / 2, this.powerUpHeight / 2, this.powerUpDepth / 2));

        this.powerUp = new THREE.Mesh(this.powerUpGeometry, this.powerUpMaterial);
        // this.powerUp.position.set(0, 3, 100);
        // this.powerUp.rotateY(Math.PI / 4);

        this.userData.obb = new OBB();

        // update the obb after any change to the powerUp
        this.update();

        this.add(this.powerUp);
    }

    update() {
        this.updateMatrix();
        this.updateMatrixWorld();

        this.userData.obb.copy(this.powerUpGeometry.userData.obb);
        this.userData.obb.applyMatrix4(this.matrixWorld);
    }
}

export { MyPowerUp };