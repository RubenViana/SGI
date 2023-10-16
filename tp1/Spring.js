import * as THREE from 'three';

class Spring extends THREE.Object3D {

    constructor() {
        super();

        // Define points for spring geometry
        const points = [];
        const numCoils = 5; // Increase this value for more coils
        const numPointsPerCoil = 100;
        const totalPoints = numCoils * numPointsPerCoil;

        for (let i = 0; i < totalPoints; i++) {
            const t = i / (totalPoints - 1);
            const theta = t * 2 * Math.PI * numCoils;
            const x = Math.cos(theta)/12;
            const y = Math.sin(theta)/12;
            const z = t * 0.3; // Increase this value for a longer spring
            points.push(new THREE.Vector3(x, y, z));
        }

        // Create the curve
        const curve = new THREE.CatmullRomCurve3(points);

        const tubeGeometry = new THREE.TubeGeometry(curve, totalPoints*2, 0.005, 8, false);
        const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);

        tubeMesh.castShadow = true;
        tubeMesh.receiveShadow = true;
        
        // Add the tube mesh to the scene
        this.add(tubeMesh);
    }
}   

export { Spring };