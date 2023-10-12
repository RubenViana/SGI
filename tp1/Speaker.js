import * as THREE from 'three';

class Spearker extends THREE.Object3D {

    constructor() {
        super();
        
        this.spearkerMaterial = new THREE.MeshPhongMaterial({
            color: "#ffffff", // White color
            specular: "#000000", // Specular color
            shininess: 30, // Shininess factor
        });

        this.wofferMaterial = new THREE.MeshPhongMaterial({
            color: "#000000", // White color
            specular: "#000000", // Specular color
            shininess: 30, // Shininess factor
        });

        this.wofferBottom = new THREE.Mesh (new THREE.CircleGeometry(0.2, 32), this.wofferMaterial);
        this.wofferTop = this.wofferBottom.clone();

        this.wofferBottom.position.y = 0.3;
        this.wofferBottom.position.z = 0.251;
        this.wofferTop.position.y = 0.75;
        this.wofferTop.position.z = 0.251;


        this.spearker = new THREE.Mesh (new THREE.BoxGeometry(0.5, 1, 0.5), this.spearkerMaterial);
        this.spearker.position.y = 0.5;

        this.add(this.spearker, this.wofferBottom, this.wofferTop);

    }
}

export {Spearker};