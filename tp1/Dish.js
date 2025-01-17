import * as THREE from 'three';

class Dish extends THREE.Object3D {

    constructor() {
        super();

        // dish related attributes
        this.dishRadiusTop = 0.3;
        this.dishRadiusBottom = 0.2;
        this.dishHeight = 0.05;
        this.dishRadialSegments = 32;
        this.dishMaterial = new THREE.MeshPhongMaterial({ color: "#F0F3F4", specular: "#000000", emissive: "#000000", shininess: 90, opacity: 0.5, transparent: true })

        // Dish
        let dish = new THREE.CylinderGeometry( this.dishRadiusTop, this.dishRadiusBottom, this.dishHeight, this.dishRadialSegments );
        this.dishMesh = new THREE.Mesh( dish, this.dishMaterial );

        // Dish added to the scene
        this.add( this.dishMesh );
    }
}

export { Dish };