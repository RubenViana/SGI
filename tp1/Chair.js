import * as THREE from 'three';

class Chair extends THREE.Object3D {

    constructor() {
        super();

        // Chair seat related attributes
        const diffuseChairSeatColor = "#000077"; // Brown color
        const specularChairSeatColor = "#0f0f0f"; // Specular color
        const shininessChairSeat = 30; // Shininess factor

        const chairSeatMaterial = new THREE.MeshPhongMaterial({
            color: diffuseChairSeatColor,
            specular: specularChairSeatColor,
            shininess: shininessChairSeat,
        });

        // Chair backrest related attributes
        const diffuseChairBackrestColor = "#000077"; // Brown color
        const specularChairBackrestColor = "#0f0f0f"; // Specular color
        const shininessChairBackrest = 30; // Shininess factor

        const chairBackrestMaterial = new THREE.MeshPhongMaterial({
            color: diffuseChairBackrestColor,
            specular: specularChairBackrestColor,
            shininess: shininessChairBackrest,
        });

        // Chair Seat
        const chairSeatGeometry = new THREE.BoxGeometry(0.5, 0.08, 0.5);
        const chairSeatMesh = new THREE.Mesh(chairSeatGeometry, chairSeatMaterial);
        chairSeatMesh.position.y = 0.65;

        // Chair Backrest
        const chairBackrestGeometry = new THREE.BoxGeometry(0.5, 0.7, 0.05);
        const chairBackrestMesh = new THREE.Mesh(chairBackrestGeometry, chairBackrestMaterial);
        chairBackrestMesh.position.y = 0.96;
        chairBackrestMesh.position.z = -0.25;

        // Chair Legs (4 legs)
        const chairLegGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.7, 32);
        const chairLegMaterial = new THREE.MeshPhongMaterial({
            color: "#505050", // Table leg color
            specular: "#FFFFFF", // Table leg specular color
            shininess: 20, // Table leg shininess
        });

        const chairLeg1Mesh = new THREE.Mesh(chairLegGeometry, chairLegMaterial);
        chairLeg1Mesh.position.x = -0.15;
        chairLeg1Mesh.position.z = -0.15;
        chairLeg1Mesh.position.y = 0.3;

        const chairLeg2Mesh = new THREE.Mesh(chairLegGeometry, chairLegMaterial);
        chairLeg2Mesh.position.x = -0.15;
        chairLeg2Mesh.position.z = 0.15;
        chairLeg2Mesh.position.y = 0.3;

        const chairLeg3Mesh = new THREE.Mesh(chairLegGeometry, chairLegMaterial);
        chairLeg3Mesh.position.x = 0.15;
        chairLeg3Mesh.position.z = -0.15;
        chairLeg3Mesh.position.y = 0.3;

        const chairLeg4Mesh = new THREE.Mesh(chairLegGeometry, chairLegMaterial);
        chairLeg4Mesh.position.x = 0.15;
        chairLeg4Mesh.position.z = 0.15;
        chairLeg4Mesh.position.y = 0.3;

        chairLeg1Mesh.rotation.x = Math.PI / 12; 
        chairLeg1Mesh.rotation.z = -Math.PI / 12; 
        chairLeg2Mesh.rotation.x = -Math.PI / 12; 
        chairLeg2Mesh.rotation.z = -Math.PI / 12; 
        chairLeg3Mesh.rotation.x = Math.PI / 12; 
        chairLeg3Mesh.rotation.z = Math.PI / 12; 
        chairLeg4Mesh.rotation.x = -Math.PI / 12; 
        chairLeg4Mesh.rotation.z = Math.PI / 12; 

        chairLeg1Mesh.castShadow = true;
        chairLeg1Mesh.receiveShadow = true;
        chairLeg2Mesh.castShadow = true;
        chairLeg2Mesh.receiveShadow = true;
        chairLeg3Mesh.castShadow = true;
        chairLeg3Mesh.receiveShadow = true;
        chairLeg4Mesh.castShadow = true;
        chairLeg4Mesh.receiveShadow = true;
        chairSeatMesh.castShadow = true;
        chairSeatMesh.receiveShadow = true;
        chairBackrestMesh.castShadow = true;
        chairBackrestMesh.receiveShadow = true;

        // Add the chair to the scene
        this.add(chairLeg1Mesh, chairLeg2Mesh, chairLeg3Mesh, chairLeg4Mesh, chairSeatMesh, chairBackrestMesh);

    
    
    }
}

export {Chair};