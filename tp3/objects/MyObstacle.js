import * as THREE from 'three';

class MyObstacle extends THREE.Object3D {

    constructor() {
        super();

        // Material curve protections (Cylinder)
        this.curveProtectionRadiusTop = 3;
        this.curveProtectionRadiusBottom = 3;
        this.curveProtectionHeight = 2.5;
        this.curveProtectionRadialSegments = 32;
        this.curveProtectionMaterialRed = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.curveProtectionMaterialWhite = new THREE.MeshPhongMaterial({ color: 0xffffff });

        // Curve protections
        this.curveProtectionGeometry = new THREE.CylinderGeometry(this.curveProtectionRadiusTop, this.curveProtectionRadiusBottom, this.curveProtectionHeight, this.curveProtectionRadialSegments);
        this.curveProtectionLeftLeft = new THREE.Mesh(this.curveProtectionGeometry, this.curveProtectionMaterialWhite);
        this.curveProtectionLeft = new THREE.Mesh(this.curveProtectionGeometry, this.curveProtectionMaterialRed);
        this.curveProtectionCenter = new THREE.Mesh(this.curveProtectionGeometry, this.curveProtectionMaterialWhite);
        this.curveProtectionRight = new THREE.Mesh(this.curveProtectionGeometry, this.curveProtectionMaterialRed);
        this.curveProtectionRightRight = new THREE.Mesh(this.curveProtectionGeometry, this.curveProtectionMaterialWhite);
        this.curveProtectionLeftLeft.position.set(0, 1.25, 0);
        this.curveProtectionLeft.position.set(6, 1.25, 0);
        this.curveProtectionCenter.position.set(12, 1.25, 0);
        this.curveProtectionRight.position.set(18, 1.25, 0);
        this.curveProtectionRightRight.position.set(24, 1.25, 0);




        this.add( this.curveProtectionLeftLeft,
                  this.curveProtectionLeft,
                  this.curveProtectionCenter,
                  this.curveProtectionRight,
                  this.curveProtectionRightRight);

    }
}

export { MyObstacle };