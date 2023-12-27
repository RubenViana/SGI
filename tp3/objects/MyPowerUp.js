import * as THREE from 'three';

class MyPowerUp extends THREE.Object3D {

    constructor() {
        super();

        // Texture powerUp
        this.powerUpTexture = new THREE.TextureLoader().load('./objects/textures/powerUp.png');
        this.powerUpTexture.wrapS = THREE.RepeatWrapping;
        this.powerUpTexture.wrapT = THREE.RepeatWrapping;
        this.powerUpTexture.colorSpace = THREE.SRGBColorSpace;

        // powerUp related attributes (Box)
        this.powerUpWidth = 7; 
        this.powerUpHeight = 7;
        this.powerUpDepth = 7;
        this.powerUpMaterial = new THREE.MeshPhongMaterial({ map: this.powerUpTexture });

        //PowerUp
        this.powerUpGeometry = new THREE.BoxGeometry(this.powerUpWidth, this.powerUpHeight, this.powerUpDepth);
        this.powerUp = new THREE.Mesh(this.powerUpGeometry, this.powerUpMaterial);
        this.powerUp.position.set(-10, 10, 10);

        this.add(this.powerUp);
    }
}

export { MyPowerUp };