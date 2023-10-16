import * as THREE from 'three';

class Shelf extends THREE.Object3D {

    constructor() {
        super();

        // texture
        this.tableTopTexture = new THREE.TextureLoader().load('textures/woodTableTopTexture.jpg');
        this.tableTopTexture.wrapS = THREE.RepeatWrapping;
        this.tableTopTexture.wrapT = THREE.RepeatWrapping;
        this.tableTopTexture.colorSpace = THREE.SRGBColorSpace;


        const woodMaterial = new THREE.MeshPhongMaterial({
            color: 0x8B4513, // Brown color
            specular: "#0f0f0f", // Specular color
            shininess: 30, // Shininess factor
            map: this.tableTopTexture,// Assigning the texture to the material
        });


        // Table Top
        let shelf = new THREE.BoxGeometry( 5, 0.1, 0.5 );
        this.shelfMesh = new THREE.Mesh( shelf, woodMaterial );

        this.shelfMesh.castShadow = true;

        this.add(this.shelfMesh);
    }
}

export { Shelf };