import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyAdvertisement extends THREE.Object3D {

    constructor() {
        super();

        // Texture advertising board
        this.advertisingBoardTexture = new THREE.TextureLoader().load('./objects/textures/advertisingBoard.png');
        this.advertisingBoardTexture.wrapS = THREE.RepeatWrapping;
        this.advertisingBoardTexture.wrapT = THREE.RepeatWrapping;
        this.advertisingBoardTexture.colorSpace = THREE.SRGBColorSpace;
        this.advertisingBoardTexture.repeat.set(6, 1);

        // Advertising Board (Box)

        this.advertisingBoardWidth = 120;
        this.advertisingBoardHeight = 10;
        this.advertisingBoardDepth = 1;
        this.advertisingBoardMaterial = new THREE.MeshPhongMaterial({ map: this.advertisingBoardTexture });

        this.advertisingBoardGeometry = new THREE.BoxGeometry(this.advertisingBoardWidth, this.advertisingBoardHeight, this.advertisingBoardDepth);
        this.advertisingBoardGeometry.userData.obb = new OBB();
        this.advertisingBoardGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.advertisingBoardWidth / 2, this.advertisingBoardHeight / 2, this.advertisingBoardDepth / 2));
        
        this.advertisingBoard = new THREE.Mesh(this.advertisingBoardGeometry, this.advertisingBoardMaterial);
        this.advertisingBoard.position.set(205, 5, 225);
        this.advertisingBoard.rotation.y = -Math.PI / 3;
        
        this.advertisingBoard.userData.obb = new OBB();

        this.update();
        
        this.add(this.advertisingBoard);
    }

    update() {
        this.advertisingBoard.updateMatrix();
        this.advertisingBoard.updateMatrixWorld();
        this.advertisingBoard.userData.obb.copy(this.advertisingBoardGeometry.userData.obb);
        this.advertisingBoard.userData.obb.applyMatrix4(this.advertisingBoard.matrixWorld);
    }
}

export { MyAdvertisement };