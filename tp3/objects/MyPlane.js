import * as THREE from 'three';

class MyPlane extends THREE.Object3D {

    constructor() {
        super();

        // Texture plane
        this.planeTexture = new THREE.TextureLoader().load('./objects/textures/plane.png');
        this.planeTexture.wrapS = THREE.RepeatWrapping;
        this.planeTexture.wrapT = THREE.RepeatWrapping;
        this.planeTexture.colorSpace = THREE.SRGBColorSpace;

        // Material plane (box)
        this.planeWidth = 1000;
        this.planeHeight = 1000;
        this.planeDepth = 1;
        this.planeMaterial = new THREE.MeshPhongMaterial({map: this.planeTexture });
        this.planeMaterial.map.repeat.set(100, 100);

        // Plane
        this.planeGeometry = new THREE.BoxGeometry(this.planeWidth, this.planeHeight, this.planeDepth);
        this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
        this.plane.position.set(400, -2, 200);
        this.plane.rotation.x = -Math.PI / 2;

        this.add(this.plane);
    }
}

export { MyPlane };