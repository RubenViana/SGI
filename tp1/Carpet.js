import * as THREE from 'three';

class Carpet extends THREE.Object3D {

    constructor() {
        super();

        const texture = new THREE.TextureLoader().load('textures/carpet.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(8, 8);
        texture.colorSpace = THREE.SRGBColorSpace;

        const carpetMaterial = new THREE.MeshPhongMaterial({
            color: "#e0e0e0",
            specular: "#000000",
            shininess: 30,
            map: texture,
        });

        this.carpet = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), carpetMaterial);

        this.carpet.rotation.x = -Math.PI / 2;

        this.add(this.carpet);
    }
}

export { Carpet };