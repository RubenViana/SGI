import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyLimiters extends THREE.Object3D {

    constructor(a, b, c) {
        super();

        // Material curve protections (Cylinder)
        this.curveProtectionRadiusTop = 3;
        this.curveProtectionRadiusBottom = 3;
        this.curveProtectionHeight = 2.5;
        this.curveProtectionRadialSegments = 32;
        this.curveProtectionMaterialRed = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.curveProtectionMaterialWhite = new THREE.MeshPhongMaterial({ color: 0xffffff });

        // Curve protectionsz
        this.curveProtectionGeometry = new THREE.CylinderGeometry(this.curveProtectionRadiusTop, this.curveProtectionRadiusBottom, this.curveProtectionHeight, this.curveProtectionRadialSegments);
        this.curveProtectionGeometry.userData.obb = new OBB();
        this.curveProtectionGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.curveProtectionRadiusTop / 2, this.curveProtectionHeight / 2, this.curveProtectionRadiusBottom / 2));
        this.curveProtectionLeftLeft = new THREE.Mesh(this.curveProtectionGeometry, this.curveProtectionMaterialWhite);
        this.curveProtectionLeftLeft.userData.obb = new OBB();
        this.curveProtectionLeft = new THREE.Mesh(this.curveProtectionGeometry, this.curveProtectionMaterialRed);
        this.curveProtectionLeft.userData.obb = new OBB();
        this.curveProtectionCenter = new THREE.Mesh(this.curveProtectionGeometry, this.curveProtectionMaterialWhite);
        this.curveProtectionCenter.userData.obb = new OBB();
        this.curveProtectionRight = new THREE.Mesh(this.curveProtectionGeometry, this.curveProtectionMaterialRed);
        this.curveProtectionRight.userData.obb = new OBB();
        this.curveProtectionRightRight = new THREE.Mesh(this.curveProtectionGeometry, this.curveProtectionMaterialWhite);
        this.curveProtectionRightRight.userData.obb = new OBB();
        this.curveProtectionLeftLeft.position.set(0 + a - Math.cos(c) * 12 + 12, 1.25, 0 + b + Math.sin(c) * 12);
        this.curveProtectionLeft.position.set(6 + a - Math.cos(c) * 6 + 6, 1.25, 0 + b + Math.sin(c) * 6);
        this.curveProtectionCenter.position.set(12 + a, 1.25, 0 + b);
        this.curveProtectionRight.position.set(18 + a + Math.cos(c) * 6 - 6, 1.25, 0 + b - Math.sin(c) * 6);
        this.curveProtectionRightRight.position.set(24 + a + Math.cos(c) * 12 - 12, 1.25, 0 + b - Math.sin(c) * 12);

        

        this.update();

        this.add(
            this.curveProtectionLeftLeft,
            this.curveProtectionLeft,
            this.curveProtectionCenter,
            this.curveProtectionRight,
            this.curveProtectionRightRight
        );
    }

    update() {
        this.curveProtectionLeftLeft.updateMatrix();
        this.curveProtectionLeftLeft.updateMatrixWorld();
        this.curveProtectionLeftLeft.userData.obb.copy(this.curveProtectionGeometry.userData.obb);
        this.curveProtectionLeftLeft.userData.obb.applyMatrix4(this.curveProtectionLeftLeft.matrixWorld);
        this.curveProtectionLeft.updateMatrix();
        this.curveProtectionLeft.updateMatrixWorld();
        this.curveProtectionLeft.userData.obb.copy(this.curveProtectionGeometry.userData.obb);
        this.curveProtectionLeft.userData.obb.applyMatrix4(this.curveProtectionLeft.matrixWorld);
        this.curveProtectionCenter.updateMatrix();
        this.curveProtectionCenter.updateMatrixWorld();
        this.curveProtectionCenter.userData.obb.copy(this.curveProtectionGeometry.userData.obb);
        this.curveProtectionCenter.userData.obb.applyMatrix4(this.curveProtectionCenter.matrixWorld);
        this.curveProtectionRight.updateMatrix();
        this.curveProtectionRight.updateMatrixWorld();
        this.curveProtectionRight.userData.obb.copy(this.curveProtectionGeometry.userData.obb);
        this.curveProtectionRight.userData.obb.applyMatrix4(this.curveProtectionRight.matrixWorld);
        this.curveProtectionRightRight.updateMatrix();
        this.curveProtectionRightRight.updateMatrixWorld();
        this.curveProtectionRightRight.userData.obb.copy(this.curveProtectionGeometry.userData.obb);
        this.curveProtectionRightRight.userData.obb.applyMatrix4(this.curveProtectionRightRight.matrixWorld);
    }
}

export { MyLimiters };