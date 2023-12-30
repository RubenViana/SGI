import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyVehicle extends THREE.Object3D {

    constructor(v_max, v_min, acceleration, deceleration, s_max, steering_speed, color) {
        super();
        this.v_max_default = v_max;
        this.v_max = this.v_max_default;
        this.v_min = v_min;
        this.velocity = 0;
        this.acceleration = acceleration;
        this.deceleration = deceleration;
        this.direction = 0;
        this.steering = 0;
        this.steering_speed = steering_speed;
        this.s_max = s_max;
        this.wheelSpinAngle = 0;
        this.color = color;

        // Makes the pivot point of the car the back axis of the car
        this.position.x = -5;
        this.position.y = 2;
        this.position.z = 0;

        // Create a hitbox (bounding box)
        const hitboxGeometry = new THREE.BoxGeometry(17, 5, 7); // Adjust dimensions as needed

        // setup OBB on geometry level (doing this manually for now)
        hitboxGeometry.userData.obb = new OBB();
        hitboxGeometry.userData.obb.halfSize.copy( new THREE.Vector3( 17, 5, 7 ).multiplyScalar(0.5) );

        this.hitbox = new THREE.Mesh(hitboxGeometry, new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, visible: false}));
        this.hitbox.position.x = 2.2;
        this.hitbox.position.y = 3;
        this.hitbox.position.z = 0;

        this.hitbox.userData.obb = new OBB();

        this.add(this.hitbox);

        // Car color
        this.carMaterial = new THREE.MeshPhongMaterial({ color: this.color });
        this.carMaterial2 = new THREE.MeshPhongMaterial({ color: 0x000000 });


        // Texture tire
        this.tireTexture = new THREE.TextureLoader().load('./objects/textures/tire.png');
        this.tireTexture.wrapS = THREE.RepeatWrapping;
        this.tireTexture.wrapT = THREE.RepeatWrapping;
        this.tireTexture.colorSpace = THREE.SRGBColorSpace;

        // Tire related attributes (Torus)
        this.tireRadius = 0.8;
        this.tireTubeRabius = 0.4;
        this.tireRadialSegments = 10;
        this.tireTubularSegments = 24;
        this.tireMaterial = new THREE.MeshPhongMaterial({ map: this.tireTexture });

        // Tire 
        let tireLeftFront = new THREE.TorusGeometry( this.tireRadius, this.tireTubeRabius, this.tireRadialSegments, this.tireTubularSegments );
        this.tireMeshLF = new THREE.Mesh( tireLeftFront, this.tireMaterial );
        this.tireMeshLF.position.x = 7;
        this.tireMeshLF.position.y = 2;
        this.tireMeshLF.position.z = -3;

        let tireRightFront = new THREE.TorusGeometry( this.tireRadius, this.tireTubeRabius, this.tireRadialSegments, this.tireTubularSegments );
        this.tireMeshRF = new THREE.Mesh( tireRightFront, this.tireMaterial );
        this.tireMeshRF.position.x = 7;
        this.tireMeshRF.position.y = 2;
        this.tireMeshRF.position.z = 3;

        let tireLeftBack = new THREE.TorusGeometry( this.tireRadius, this.tireTubeRabius, this.tireRadialSegments, this.tireTubularSegments );
        this.tireMeshLB = new THREE.Mesh( tireLeftBack, this.tireMaterial );
        this.tireMeshLB.position.x = -5;
        this.tireMeshLB.position.y = 2;
        this.tireMeshLB.position.z = -3;

        let tireRightBack = new THREE.TorusGeometry( this.tireRadius, this.tireTubeRabius, this.tireRadialSegments, this.tireTubularSegments );
        this.tireMeshRB = new THREE.Mesh( tireRightBack, this.tireMaterial );
        this.tireMeshRB.position.x = -5;
        this.tireMeshRB.position.y = 2;
        this.tireMeshRB.position.z = 3;

        // Texture axle
        this.axleTexture = new THREE.TextureLoader().load('./objects/textures/tire.png');
        this.axleTexture.wrapS = THREE.RepeatWrapping;
        this.axleTexture.wrapT = THREE.RepeatWrapping;
        this.axleTexture.colorSpace = THREE.SRGBColorSpace;

        // Axle related attributes (Cylinder)
        this.axleRadiusTop = 0.25;
        this.axleRadiusBottom = 0.25;
        this.axleHeight = 6;
        this.axleRadialSegments = 32;
        this.axleMaterial = new THREE.MeshPhongMaterial({ map: this.axleTexture });

        // Axle
        let axleFront = new THREE.CylinderGeometry( this.axleRadiusTop, this.axleRadiusBottom, this.axleHeight, this.axleRadialSegments );
        this.axleMesh = new THREE.Mesh( axleFront, this.axleMaterial );
        this.axleMesh.position.x = 7;
        this.axleMesh.position.y = 2;
        this.axleMesh.position.z = 0;
        this.axleMesh.rotation.x = Math.PI / 2;

        let axleTop = new THREE.CylinderGeometry( this.axleRadiusTop, this.axleRadiusBottom, this.axleHeight, this.axleRadialSegments );
        this.axleTopMesh = new THREE.Mesh( axleTop, this.axleMaterial );
        this.axleTopMesh.position.x = -5;
        this.axleTopMesh.position.y = 2;
        this.axleTopMesh.position.z = 0;
        this.axleTopMesh.rotation.x = Math.PI / 2;

        // Texture bench
        this.benchTexture = new THREE.TextureLoader().load('./objects/textures/car.png');
        this.benchTexture.wrapS = THREE.RepeatWrapping;
        this.benchTexture.wrapT = THREE.RepeatWrapping;
        this.benchTexture.colorSpace = THREE.SRGBColorSpace;

        // Bench related attributes (Box)
        this.benchWidth = 5;
        this.benchHeight = 2;
        this.benchDepth = 4;
        this.benchMaterial = new THREE.MeshPhongMaterial({ map: this.benchTexture });

        // Bench
        let bench = new THREE.BoxGeometry( this.benchWidth, this.benchHeight, this.benchDepth );
        this.benchMesh = new THREE.Mesh( bench, this.carMaterial );
        this.benchMesh.position.y = 2;

        // Texture bench back
        this.benchBackTexture = new THREE.TextureLoader().load('./objects/textures/car.png');
        this.benchBackTexture.wrapS = THREE.RepeatWrapping;
        this.benchBackTexture.wrapT = THREE.RepeatWrapping;
        this.benchBackTexture.colorSpace = THREE.SRGBColorSpace;

        // Bench back related attributes (Box)
        this.benchBackRadiusTop = 2;
        this.benchBackRadiusBottom = 0.75;
        this.benchBackHeight = 6.0;
        this.benchBackRadialSegments = 4;
        this.benchBackMaterial = new THREE.MeshPhongMaterial({ map: this.benchBackTexture });

        // Bench back
        let benchBack = new THREE.CylinderGeometry( this.benchBackRadiusTop, this.benchBackRadiusBottom, this.benchBackHeight, this.benchBackRadialSegments );
        this.benchBackMesh = new THREE.Mesh( benchBack, this.carMaterial );
        this.benchBackMesh.position.x = -3;
        this.benchBackMesh.position.y = 2.5;
        this.benchBackMesh.position.z = 0;
        this.benchBackMesh.rotation.z = -Math.PI / 2;

        // Texture general front
        this.frontTexture = new THREE.TextureLoader().load('./objects/textures/car.png');
        this.frontTexture.wrapS = THREE.RepeatWrapping;
        this.frontTexture.wrapT = THREE.RepeatWrapping;
        this.frontTexture.colorSpace = THREE.SRGBColorSpace;

        // Front related attributes (Box)
        this.frontWidth = 5;
        this.frontHeight = 2;
        this.frontDepth = 2;
        this.frontMaterial = new THREE.MeshPhongMaterial({ map: this.frontTexture });

        // Front
        let front = new THREE.BoxGeometry( this.frontWidth, this.frontHeight, this.frontDepth );
        this.frontMesh = new THREE.Mesh( front, this.carMaterial );
        this.frontMesh.position.x = 3.5;
        this.frontMesh.position.y = 2;
        this.frontMesh.position.z = 0;

        // Texture front face
        this.frontFaceTexture = new THREE.TextureLoader().load('./objects/textures/car.png');
        this.frontFaceTexture.wrapS = THREE.RepeatWrapping;
        this.frontFaceTexture.wrapT = THREE.RepeatWrapping;
        this.frontFaceTexture.colorSpace = THREE.SRGBColorSpace;

        // Front face related attributes (Cylinder)
        this.frontFaceRadiusTop = 1.3;
        this.frontFaceRadiusBottom = 0.4;
        this.frontFaceHeight = 9;
        this.frontFaceRadialSegments = 4; 
        this.frontFaceMaterial = new THREE.MeshPhongMaterial({ map: this.frontFaceTexture });

        // Front face
        let frontFace = new THREE.CylinderGeometry( this.frontFaceRadiusTop, this.frontFaceRadiusBottom, this.frontFaceHeight, this.frontFaceRadialSegments );
        this.frontFaceMesh = new THREE.Mesh( frontFace, this.carMaterial );
        this.frontFaceMesh.position.x = 7;
        this.frontFaceMesh.position.y = 2;
        this.frontFaceMesh.position.z = 0;
        this.frontFaceMesh.rotation.z = Math.PI / 2;

        // Texture front wing
        this.frontWingTexture = new THREE.TextureLoader().load('./objects/textures/car.png');
        this.frontWingTexture.wrapS = THREE.RepeatWrapping;
        this.frontWingTexture.wrapT = THREE.RepeatWrapping;
        this.frontWingTexture.colorSpace = THREE.SRGBColorSpace;

        // Front wing related attributes (Box)
        this.frontWingWidth = 1;
        this.frontWingHeight = 0.1;
        this.frontWingDepth = 7;
        this.frontWingMaterial = new THREE.MeshPhongMaterial({ map: this.frontWingTexture });

        // Front wing
        let frontWing = new THREE.BoxGeometry( this.frontWingWidth, this.frontWingHeight, this.frontWingDepth );
        this.frontWingMesh = new THREE.Mesh( frontWing, this.carMaterial );
        this.frontWingMesh.position.x = 10;
        this.frontWingMesh.position.y = 2;
        this.frontWingMesh.position.z = 0;

        // Texture front wing left and right
        this.frontWingLeftTexture = new THREE.TextureLoader().load('./objects/textures/car.png');
        this.frontWingLeftTexture.wrapS = THREE.RepeatWrapping;
        this.frontWingLeftTexture.wrapT = THREE.RepeatWrapping;
        this.frontWingLeftTexture.colorSpace = THREE.SRGBColorSpace;

        // Front wing left and right related attributes (Cylinder)
        this.frontWingLeftRadiusTop = 0.5;
        this.frontWingLeftRadiusBottom = 0.2;
        this.frontWingLeftHeight = 1.0;
        this.frontWingLeftRadialSegments = 2;
        this.frontWingLeftMaterial = new THREE.MeshPhongMaterial({ map: this.frontWingLeftTexture });

        // Front wing left and right
        let frontWingLeft = new THREE.CylinderGeometry( this.frontWingLeftRadiusTop, this.frontWingLeftRadiusBottom, this.frontWingLeftHeight, this.frontWingLeftRadialSegments );
        this.frontWingLeftMesh = new THREE.Mesh( frontWingLeft, this.carMaterial );
        this.frontWingLeftMesh.position.x = 10;
        this.frontWingLeftMesh.position.y = 2.5;
        this.frontWingLeftMesh.position.z = -3.5;
        this.frontWingLeftMesh.rotation.y = Math.PI / 2;
        this.frontWingLeftMesh.rotation.z = Math.PI;

        let frontWingRight = new THREE.CylinderGeometry( this.frontWingLeftRadiusTop, this.frontWingLeftRadiusBottom, this.frontWingLeftHeight, this.frontWingLeftRadialSegments );
        this.frontWingRightMesh = new THREE.Mesh( frontWingRight, this.carMaterial );
        this.frontWingRightMesh.position.x = 10;
        this.frontWingRightMesh.position.y = 2.5;
        this.frontWingRightMesh.position.z = 3.5;
        this.frontWingRightMesh.rotation.y = Math.PI / 2;
        this.frontWingRightMesh.rotation.z = Math.PI;

        // Texture little front wing
        this.littleFrontWingTexture = new THREE.TextureLoader().load('./objects/textures/car.png');
        this.littleFrontWingTexture.wrapS = THREE.RepeatWrapping;
        this.littleFrontWingTexture.wrapT = THREE.RepeatWrapping;
        this.littleFrontWingTexture.colorSpace = THREE.SRGBColorSpace;

        // Little front wing related attributes (Box)
        this.littleFrontWingWidth = 0.5;
        this.littleFrontWingHeight = 0.1;
        this.littleFrontWingDepth = 3;
        this.littleFrontWingMaterial = new THREE.MeshPhongMaterial({ map: this.littleFrontWingTexture });

        // Little front wing
        let littleFrontWing = new THREE.BoxGeometry( this.littleFrontWingWidth, this.littleFrontWingHeight, this.littleFrontWingDepth );
        this.littleFrontWingMesh = new THREE.Mesh( littleFrontWing, this.carMaterial2 );
        this.littleFrontWingMesh.position.x = 8.5;
        this.littleFrontWingMesh.position.y = 2;
        this.littleFrontWingMesh.position.z = 0;

        // Texture wheel
        this.wheelTexture = new THREE.TextureLoader().load('./objects/textures/tire.png');
        this.wheelTexture.wrapS = THREE.RepeatWrapping;
        this.wheelTexture.wrapT = THREE.RepeatWrapping;
        this.wheelTexture.colorSpace = THREE.SRGBColorSpace;

        // Wheel related attributes (Torus)
        this.wheelRadius = 0.3;
        this.wheelTubeRabius = 0.05;
        this.wheelRadialSegments = 10;
        this.wheelTubularSegments = 24;
        this.wheelMaterial = new THREE.MeshPhongMaterial({ map: this.wheelTexture });

        // Wheel
        let wheel = new THREE.TorusGeometry( this.wheelRadius, this.wheelTubeRabius, this.wheelRadialSegments, this.wheelTubularSegments );
        this.wheelMesh = new THREE.Mesh( wheel, this.wheelMaterial );
        this.wheelMesh.position.x = 2;
        this.wheelMesh.position.y = 3;
        this.wheelMesh.position.z = 0;
        this.wheelMesh.rotation.y = Math.PI / 2;

        // Texture little back wing left and right
        this.littleBackWingTexture = new THREE.TextureLoader().load('./objects/textures/car.png');
        this.littleBackWingTexture.wrapS = THREE.RepeatWrapping;
        this.littleBackWingTexture.wrapT = THREE.RepeatWrapping;
        this.littleBackWingTexture.colorSpace = THREE.SRGBColorSpace;

        // Little back wing left and right related attributes (Cylinder)
        this.littleBackWingRadiusTop = 0.8;
        this.littleBackWingRadiusBottom = 0.3;
        this.littleBackWingHeight = 3.0;
        this.littleBackWingRadialSegments = 2;
        this.littleBackWingMaterial = new THREE.MeshPhongMaterial({ map: this.littleBackWingTexture });

        // Little back wing left and right
        let littleBackWingLeft = new THREE.CylinderGeometry( this.littleBackWingRadiusTop, this.littleBackWingRadiusBottom, this.littleBackWingHeight, this.littleBackWingRadialSegments );
        this.littleBackWingLeftMesh = new THREE.Mesh( littleBackWingLeft, this.carMaterial );
        this.littleBackWingLeftMesh.position.x = -5;
        this.littleBackWingLeftMesh.position.y = 4;
        this.littleBackWingLeftMesh.position.z = -2.5;
        this.littleBackWingLeftMesh.rotation.y = Math.PI / 2;

        let littleBackWingRight = new THREE.CylinderGeometry( this.littleBackWingRadiusTop, this.littleBackWingRadiusBottom, this.littleBackWingHeight, this.littleBackWingRadialSegments );
        this.littleBackWingRightMesh = new THREE.Mesh( littleBackWingRight, this.carMaterial );
        this.littleBackWingRightMesh.position.x = -5;
        this.littleBackWingRightMesh.position.y = 4;
        this.littleBackWingRightMesh.position.z = 2.5;
        this.littleBackWingRightMesh.rotation.y = Math.PI / 2;

        // Texture back wing
        this.backWingTexture = new THREE.TextureLoader().load('./objects/textures/car.png');
        this.backWingTexture.wrapS = THREE.RepeatWrapping;
        this.backWingTexture.wrapT = THREE.RepeatWrapping;
        this.backWingTexture.colorSpace = THREE.SRGBColorSpace;

        // Back wing related attributes (Box)
        this.backWingWidth = 1.5;
        this.backWingHeight = 0.1;
        this.backWingDepth = 5;
        this.backWingMaterial = new THREE.MeshPhongMaterial({ map: this.backWingTexture });

        // Back wing
        let backWing = new THREE.BoxGeometry( this.backWingWidth, this.backWingHeight, this.backWingDepth );
        this.backWingMesh = new THREE.Mesh( backWing, this.carMaterial );
        this.backWingMesh.position.x = -5;
        this.backWingMesh.position.y = 4.9;
        this.backWingMesh.position.z = 0;
        this.backWingMesh.rotation.z = -Math.PI / 7;

        // Components added to the scene
        this.add( this.tireMeshLF,
                  this.tireMeshRF,
                  this.tireMeshLB,
                  this.tireMeshRB,
                  this.axleMesh,
                  this.axleTopMesh,
                  this.benchMesh,
                  this.benchBackMesh,
                  this.frontMesh,
                  this.frontFaceMesh,
                  this.frontWingMesh,
                  this.frontWingLeftMesh,
                  this.frontWingRightMesh,
                  this.littleFrontWingMesh,
                  this.wheelMesh,
                  this.littleBackWingLeftMesh,
                  this.littleBackWingRightMesh,
                  this.backWingMesh );

        this.scale.set(0.5, 0.5, 0.5);
    }

    accelerate_forward() {
        if (this.velocity < this.v_max) {
            this.velocity += this.acceleration;
        }
        if (this.velocity > this.v_max) {
            this.velocity -= this.deceleration;
        }
    }

    accelerate_backward() {
        if (this.velocity > this.v_min) {
            this.velocity -= this.acceleration;
        }
    }

    decelerate() {
        if (this.velocity > 0) {
            this.velocity -= this.deceleration;
        }
        if (this.velocity < 0) {
            this.velocity += this.deceleration;
        }
        if (this.velocity < 0.1 && this.velocity > -0.1) {
            this.velocity = 0;
        }
    }

    turnLeft() {
        if(this.steering < this.s_max) {
            this.steering += this.steering_speed;
            this.tireMeshLF.rotation.y = this.steering;
            this.tireMeshRF.rotation.y = this.steering;
        }

        if(this.velocity < 0) {
            this.direction -= this.steering_speed;
            this.rotation.y = this.direction;
        }
        else if(this.velocity > 0) {
            this.direction += this.steering_speed
            this.rotation.y = this.direction;
        }
    }

    turnRight() {
        if(this.steering > -this.s_max) {
            this.steering -= this.steering_speed;
            this.tireMeshLF.rotation.y = this.steering;
            this.tireMeshRF.rotation.y = this.steering;
        }

        if(this.velocity < 0) {
            this.direction += this.steering_speed;
            this.rotation.y = this.direction;
        }
        else if(this.velocity > 0) {
            this.direction -= this.steering_speed
            this.rotation.y = this.direction;
        }
    }

    unTurn() {
        // if (this.steering > 0) {
        //     this.steering -= this.steering_speed;
        //     this.tireMeshLF.rotation.y = -this.steering_speed;
        //     this.tireMeshRF.rotation.y = -this.steering_speed;
        // }
        // if (this.steering < 0) {
        //     this.steering += this.steering_speed;
        //     this.tireMeshRF.rotation.y = this.steering_speed;
        //     this.tireMeshLF.rotation.y = this.steering_speed;
        // }

        this.steering = 0;
        this.tireMeshLF.rotation.y = 0;
        this.tireMeshRF.rotation.y = 0;

    }

    update() {
        // Update position based on velocity and current rotation
        this.position.x += this.velocity * Math.cos(-this.direction);
        this.position.z += this.velocity * Math.sin(-this.direction);

        // Calculate wheel spin angle based on car velocity
        const wheelRadius = this.tireRadius; // Assuming all wheels have the same radius

        // Calculate the angular velocity of the wheel
        const angularVelocity = this.velocity / wheelRadius;

        // Update the wheel spin angle
        this.wheelSpinAngle += angularVelocity;

        // Apply the wheel spin angle to the tire meshes
        this.tireMeshLF.rotation.z = -this.wheelSpinAngle;
        this.tireMeshRF.rotation.z = -this.wheelSpinAngle;
        this.tireMeshLB.rotation.z = -this.wheelSpinAngle;
        this.tireMeshRB.rotation.z = -this.wheelSpinAngle;

        // only for testing
        this.hitbox.material.visible = false;
        
        this.hitbox.updateMatrix();
        this.hitbox.updateMatrixWorld();

        // update OBB
        this.hitbox.userData.obb.copy( this.hitbox.geometry.userData.obb );
        this.hitbox.userData.obb.applyMatrix4( this.hitbox.matrixWorld );
    }

}

export { MyVehicle };