import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MySeparator extends THREE.Object3D {

    constructor() {
        super();

        // Texture wall
        this.wallTexture = new THREE.TextureLoader().load('./objects/textures/wall.png');
        this.wallTexture.wrapS = THREE.RepeatWrapping;
        this.wallTexture.wrapT = THREE.RepeatWrapping;
        this.wallTexture.colorSpace = THREE.SRGBColorSpace;
        this.wallTexture.repeat.set(30, 1);

        // PitStop Separator (Box)
        this.separatorWidth = 3;
        this.separatorHeight = 5;
        this.separatorDepth = 400;
        this.separatorMaterial = new THREE.MeshPhongMaterial({ map: this.wallTexture });

        this.separatorGeometry = new THREE.BoxGeometry(this.separatorWidth, this.separatorHeight, this.separatorDepth);
        this.separatorGeometry.userData.obb = new OBB();
        this.separatorGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.separatorWidth / 2, this.separatorHeight / 2, this.separatorDepth / 2));

        this.separator = new THREE.Mesh(this.separatorGeometry, this.separatorMaterial);
        this.separator.position.set(50, 2.5, 300);
        this.separator.rotation.y = Math.PI/60;

        this.separator.userData.obb = new OBB();
        
        this.update();
        
        this.add(this.separator);
    }

    update() {
        this.separator.updateMatrix();
        this.separator.updateMatrixWorld();
        this.separator.userData.obb.copy(this.separatorGeometry.userData.obb);
        this.separator.userData.obb.applyMatrix4(this.separator.matrixWorld);
    }
}

export { MySeparator };