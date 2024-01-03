import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyGoal extends THREE.Object3D {

    constructor() {
        super();

        // Texture goal
        this.goalTexture = new THREE.TextureLoader().load('./objects/textures/goal.png');
        this.goalTexture.wrapS = THREE.RepeatWrapping;
        this.goalTexture.wrapT = THREE.RepeatWrapping;
        this.goalTexture.colorSpace = THREE.SRGBColorSpace;
        this.goalTexture.repeat.set(2, 1);

        // Material goal (box)
        this.goalWidth = 50;
        this.goalHeight = 3;
        this.goalDepth = 0.1;
        this.goalMaterial = new THREE.MeshPhongMaterial({map: this.goalTexture, side: THREE.DoubleSide });

        // Goal
        this.goalGeometry = new THREE.BoxGeometry(this.goalWidth, this.goalHeight, this.goalDepth);
        this.goalGeometry.userData.obb = new OBB();
        this.goalGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.goalWidth / 2, this.goalHeight / 2, this.goalDepth / 2));

        this.mesh = new THREE.Mesh(this.goalGeometry, this.goalMaterial);
        this.mesh.position.set(14, 12, 300);

        this.mesh.userData.obb = new OBB();


        // Texture goal post
        this.goalPostTexture = new THREE.TextureLoader().load('./objects/textures/post.png');
        this.goalPostTexture.wrapS = THREE.RepeatWrapping;
        this.goalPostTexture.wrapT = THREE.RepeatWrapping;
        this.goalPostTexture.colorSpace = THREE.SRGBColorSpace;

        // Material goal post (Cylinder)
        this.goalPostRadiusTop = 0.3;
        this.goalPostRadiusBottom = 0.3;
        this.goalPostHeight = 11;
        this.goalPostRadialSegments = 32;
        this.goalPostMaterial = new THREE.MeshPhongMaterial({map: this.goalPostTexture });

        // Goal post
        this.goalPostGeometry = new THREE.CylinderGeometry(this.goalPostRadiusTop, this.goalPostRadiusBottom, this.goalPostHeight, this.goalPostRadialSegments);
        this.goalPostGeometry.userData.obb = new OBB();
        this.goalPostGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.goalPostRadiusTop / 2, this.goalPostHeight / 2, this.goalPostRadiusBottom / 2));

        this.goalPostLeft = new THREE.Mesh(this.goalPostGeometry, this.goalPostMaterial);
        this.goalPostLeft.position.set(-7, 5, 300);
        
        this.goalPostLeft.userData.obb = new OBB();

        this.goalPostRight = new THREE.Mesh(this.goalPostGeometry, this.goalPostMaterial);
        this.goalPostRight.position.set(35, 5, 300);

        this.goalPostRight.userData.obb = new OBB();

        this.update();
        
        this.add(this.mesh, this.goalPostLeft, this.goalPostRight);
        this.setFillMode();
    }

    update(){
        this.mesh.updateMatrix();
        this.mesh.updateMatrixWorld();
        this.mesh.userData.obb.copy(this.goalGeometry.userData.obb);
        this.mesh.userData.obb.applyMatrix4(this.mesh.matrixWorld);
        this.goalPostLeft.updateMatrix();
        this.goalPostLeft.updateMatrixWorld();
        this.goalPostLeft.userData.obb.copy(this.goalPostGeometry.userData.obb);
        this.goalPostLeft.userData.obb.applyMatrix4(this.goalPostLeft.matrixWorld);
        this.goalPostRight.updateMatrix();
        this.goalPostRight.updateMatrixWorld();
        this.goalPostRight.userData.obb.copy(this.goalPostGeometry.userData.obb);
        this.goalPostRight.userData.obb.applyMatrix4(this.goalPostRight.matrixWorld);
    }

    setFillMode() { 
		this.goalMaterial.wireframe = false;
		this.goalMaterial.needsUpdate = true;
	}

	setLineMode() { 
		this.goalMaterial.wireframe = true;
		this.goalMaterial.needsUpdate = true;
	}

	setWireframe(value) {
		if (value) {
			this.setLineMode()
		} else {
			this.setFillMode()
		}
	}
}

export { MyGoal };