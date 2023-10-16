import * as THREE from 'three';

class Snorlax extends THREE.Object3D {
    constructor() {
        super();

        // Texture Body Snorlax
        this.textureBody = new THREE.TextureLoader().load( 'textures/snorlax_body.png' );
        this.textureBody.wrapS = THREE.RepeatWrapping;
        this.textureBody.wrapT = THREE.RepeatWrapping;
        this.textureBody.colorSpace = THREE.SRGBColorSpace;

        // Texture Ear Snorlax
        this.textureEar = new THREE.TextureLoader().load( 'textures/snorlax_ear.png' );
        this.textureEar.wrapS = THREE.RepeatWrapping;
        this.textureEar.wrapT = THREE.RepeatWrapping;
        this.textureEar.colorSpace = THREE.SRGBColorSpace;

        // Snorlax head related attributes
        this.headRadius = 0.6;
        this.headWidthSegments = 32;
        this.headHeightSegments = 32;
        // this.headPhiStart = Math.PI * 1.24;
        // this.headPhiLength = Math.PI * 2.00;
        // this.headThetaStart = Math.PI * 0.29;
        // this.headThetaLength = Math.PI * 0.75;
        let head = new THREE.SphereGeometry(this.headRadius, this.headWidthSegments, this.headHeightSegment);
        this.headMaterial = new THREE.MeshPhongMaterial({map: this.textureBody });
        this.headMesh = new THREE.Mesh(head, this.headMaterial);
        this.headMesh.position.y = 1.7;
        this.headMesh.rotation.y = -Math.PI/3.5;
        this.headMesh.rotation.x = Math.PI/2;

        // Snorlax main body related attributes
        this.mainBodyPoints = [];
        this.mainBodySegments = 50;
        this.mainBodyPhiStart = Math.PI * 2.00;
        this.mainBodyPhiLength = Math.PI * 2.00;
        for ( let i = 0; i < 10; ++ i ) { this.mainBodyPoints.push( new THREE.Vector2( Math.sin( i * 0.25 ) + 0.5, ( i - 5 ) * .3 ) );}
        let mainBody = new THREE.LatheGeometry(this.mainBodyPoints, this.mainBodySegments, this.mainBodyPhiStart, this.mainBodyPhiLength);
        this.mainBodyMaterial = new THREE.MeshPhongMaterial({map: this.textureBody });
        this.mainBodyMesh = new THREE.Mesh(mainBody, this.mainBodyMaterial);
        this.mainBodyMesh.rotation.x = Math.PI;
        this.mainBodyMesh.rotation.y = Math.PI + Math.PI / 6;

        // // Snorlax cagueiro related attributes
        // this.baseRadius = 1.49;
        // this.baseWidthSegments = 32;
        // this.baseHeightSegments = 32;
        // this.phiStart = Math.PI * 2.00;
        // this.phiLength = Math.PI * 2.00;
        // this.thetaStart = Math.PI * 0.50;
        // this.thetaLength = Math.PI * 1.00;
        // let base = new THREE.SphereGeometry( this.baseRadius, this.baseWidthSegments, this.baseHeightSegments, this.phiStart, this.phiLength, this.thetaStart, this.thetaLength );
        // this.baseMesh = new THREE.Mesh(base, this.mainBodyMaterial);
        // this.baseMesh.position.y = -0.28;
        // this.baseMesh.rotation.y = -Math.PI / 6;

        // Snorlax ears related attributes
        this.earRadius = 0.3;
        this.earHeight = 0.4;
        this.earRadialSegments = 32; 
        let ear1 = new THREE.ConeGeometry(this.earRadius, this.earHeight, this.earRadialSegments);
        let ear2 = new THREE.ConeGeometry(this.earRadius, this.earHeight, this.earRadialSegments);
        this.earMaterial = new THREE.MeshPhongMaterial({map: this.textureEar});
        this.earMesh = new THREE.Mesh(ear1, this.earMaterial);
        this.earMesh.position.y = 2.2
        this.earMesh.rotation.x = Math.PI / 4;
        this.earMesh.position.z = 0.45
        this.earMesh2 = new THREE.Mesh(ear2, this.earMaterial);
        this.earMesh2.position.y = 2.2
        this.earMesh2.rotation.x = -Math.PI / 4;
        this.earMesh2.position.z = -0.45

        // Snorlax foot related attributes
        this.footRadius = 0.35;
        this.footTubeRadius = 0.20;
        this.footRadialSegments = 32;
        this.footTubularSegments = 32;
        let leftFoot = new THREE.TorusGeometry(this.footRadius, this.footTubeRadius, this.footRadialSegments, this.footTubularSegments);
        let rightFoot = new THREE.TorusGeometry(this.footRadius, this.footTubeRadius, this.footRadialSegments, this.footTubularSegments);
        this.footMaterial = new THREE.MeshPhongMaterial({color: "#e4cec1", shininess: 30 });
        this.leftFootMesh = new THREE.Mesh(leftFoot, this.footMaterial);
        this.leftFootMesh.rotation.y = Math.PI / 3;
        this.leftFootMesh.position.x = -1.3;
        this.leftFootMesh.position.z = -0.7;
        this.leftFootMesh.position.y = -0.5;
        this.rightFootMesh = new THREE.Mesh(rightFoot, this.footMaterial);
        this.rightFootMesh.rotation.y = -Math.PI / 3;
        this.rightFootMesh.position.x = -1.3;
        this.rightFootMesh.position.z = 0.7;
        this.rightFootMesh.position.y = -0.5;

        this.footInsideRadius = 0.3;
        this.footInsideHeight = 0.15;
        let leftFootInside = new THREE.CylinderGeometry( this.footInsideRadius, this.footInsideRadius,this.footInsideHeight, this.footRadialSegments);
        let rightFootInside = new THREE.CylinderGeometry( this.footInsideRadius, this.footInsideRadius,this.footInsideHeight, this.footRadialSegments);
        this.insideFootMaterial = new THREE.MeshPhongMaterial({color: "#8b8787", shininess: 0 });
        this.leftFootInsideMesh = new THREE.Mesh(leftFootInside, this.insideFootMaterial);
        this.leftFootInsideMesh.rotation.z = Math.PI / 2;
        this.leftFootInsideMesh.rotation.y = - Math.PI / 6;
        this.leftFootInsideMesh.position.x = -1.4;
        this.leftFootInsideMesh.position.z = -0.7;
        this.leftFootInsideMesh.position.y = -0.5;
        this.rightFootInsideMesh = new THREE.Mesh(rightFootInside, this.insideFootMaterial);
        this.rightFootInsideMesh.rotation.z = Math.PI / 2;
        this.rightFootInsideMesh.rotation.y = Math.PI / 6;
        this.rightFootInsideMesh.position.x = -1.4;
        this.rightFootInsideMesh.position.z = 0.7;
        this.rightFootInsideMesh.position.y = -0.5;

        this.nailsRadius = 0.1;
        this.nailsHeight = 0.3;
        this.nailsRadialSegments = 32; 
        let nailLeftLeft = new THREE.ConeGeometry(this.nailsRadius, this.nailsHeight, this.nailsRadialSegments);
        let nailLeftMiddle = new THREE.ConeGeometry(this.nailsRadius, this.nailsHeight, this.nailsRadialSegments);
        let nailLeftRight = new THREE.ConeGeometry(this.nailsRadius, this.nailsHeight, this.nailsRadialSegments);
        let nailRightLeft = new THREE.ConeGeometry(this.nailsRadius, this.nailsHeight, this.nailsRadialSegments);
        let nailRightMiddle = new THREE.ConeGeometry(this.nailsRadius, this.nailsHeight, this.nailsRadialSegments);
        let nailRightRight = new THREE.ConeGeometry(this.nailsRadius, this.nailsHeight, this.nailsRadialSegments);
        this.nailMaterial = new THREE.MeshPhongMaterial({color: "#f9c979", shininess: 30 });
        this.nailLeftLeftMesh = new THREE.Mesh(nailLeftLeft, this.nailMaterial);
        this.nailLeftMiddleMesh = new THREE.Mesh(nailLeftMiddle, this.nailMaterial);
        this.nailLeftRightMesh = new THREE.Mesh(nailLeftRight, this.nailMaterial);
        this.nailRightLeftMesh = new THREE.Mesh(nailRightLeft, this.nailMaterial);
        this.nailRightMiddleMesh = new THREE.Mesh(nailRightMiddle, this.nailMaterial);
        this.nailRightRightMesh = new THREE.Mesh(nailRightRight, this.nailMaterial);
        this.nailLeftLeftMesh.position.x = -1.15;
        this.nailLeftLeftMesh.position.z = -1;
        this.nailLeftMiddleMesh.position.x = -1.3;
        this.nailLeftMiddleMesh.position.z = -0.7;
        this.nailLeftMiddleMesh.position.y = 0.15;
        this.nailLeftRightMesh.position.x = -1.45;
        this.nailLeftRightMesh.position.z = -0.4;
        this.nailRightLeftMesh.position.x = -1.45;
        this.nailRightLeftMesh.position.z = 0.4;
        this.nailRightMiddleMesh.position.x = -1.3;
        this.nailRightMiddleMesh.position.z = 0.7;
        this.nailRightMiddleMesh.position.y = 0.15;
        this.nailRightRightMesh.position.x = -1.15;
        this.nailRightRightMesh.position.z = 1;


        // Snorlax eyes related attributes
        this.eyeWidth = 0.25;
        this.eyeHeight = 0.02;
        let leftEye = new THREE.PlaneGeometry( this.eyeWidth, this.eyeHeight );
        let rightEye = new THREE.PlaneGeometry( this.eyeWidth, this.eyeHeight );
        this.eyeMaterial = new THREE.MeshPhongMaterial({color: "#000000", shininess: 30, side: THREE.DoubleSide });
        this.leftEyeMesh = new THREE.Mesh(leftEye, this.eyeMaterial);
        this.rightEyeMesh = new THREE.Mesh(rightEye, this.eyeMaterial);
        this.leftEyeMesh.rotation.y = Math.PI / 2;
        this.leftEyeMesh.position.y = 2.0;
        this.leftEyeMesh.position.z = 0.2;
        this.leftEyeMesh.position.x = -0.5;
        this.rightEyeMesh.rotation.y = Math.PI / 2;
        this.rightEyeMesh.position.y = 2.0;
        this.rightEyeMesh.position.z = -0.2;
        this.rightEyeMesh.position.x = -0.5;

        // Snorlax mouth related attributes
        this.mouthRadius = 0.4;
        this.mouthHeight = 0.2;
        this.mouthRadialSegments = 32;
        this.mouthHeightSegments = 32;
        this.mouthOpenEnded = true;
        this.mouthThetaStart = Math.PI * 0.00;
        this.mouthThetaLength = Math.PI * 1.00;
        let mouth = new THREE.ConeGeometry(this.mouthRadius, this.mouthHeight, this.mouthRadialSegments, this.mouthHeightSegments, this.mouthOpenEnded, this.mouthThetaStart, this.mouthThetaLength);
        this.mouthMaterial = new THREE.MeshPhongMaterial({color: "#000000", shininess: 30, side: THREE.DoubleSide});
        this.mouthMesh = new THREE.Mesh(mouth, this.mouthMaterial);
        this.mouthMesh.rotation.x = Math.PI;
        this.mouthMesh.rotation.z = Math.PI;
        this.mouthMesh.position.y = 1.8;
        this.mouthMesh.position.z = 0;
        this.mouthMesh.position.x = -0.4;



        // Snorlax arm related attributes
        this.leftArmRadiusTop = 0.2;
        this.leftArmRadiusBottom = 0.1;
        this.leftArmHeight = 1.3;
        this.leftArmRadialSegments = 32;
        let leftArm = new THREE.CylinderGeometry(this.leftArmRadiusTop, this.leftArmRadiusBottom, this.leftArmHeight, this.leftArmRadialSegments);
        this.leftArmMaterial = new THREE.MeshPhongMaterial({map: this.textureEar });
        this.leftArmMesh = new THREE.Mesh(leftArm, this.leftArmMaterial);
        this.leftArmMesh.position.y = 1.3;
        this.leftArmMesh.position.z = -1.2;
        this.leftArmMesh.rotation.x = -Math.PI/3;
        let leftHand = new THREE.SphereGeometry(this.leftArmRadiusTop, this.leftArmRadialSegments, this.leftArmRadialSegments);
        this.leftHandMesh = new THREE.Mesh(leftHand, this.leftArmMaterial);
        this.leftHandMesh.position.y = 1.61;
        this.leftHandMesh.position.z = -1.74;
        let rightArm = new THREE.CylinderGeometry(this.leftArmRadiusTop, this.leftArmRadiusBottom, this.leftArmHeight, this.leftArmRadialSegments);
        this.rightArmMesh = new THREE.Mesh(rightArm, this.leftArmMaterial);
        this.rightArmMesh.position.y = 0.7;
        this.rightArmMesh.position.z = 1.05;
        this.rightArmMesh.rotation.x = Math.PI/1.3;
        let rightHand = new THREE.SphereGeometry(this.leftArmRadiusTop, this.leftArmRadialSegments, this.leftArmRadialSegments);
        this.rightHandMesh = new THREE.Mesh(rightHand, this.leftArmMaterial);
        this.rightHandMesh.position.y = 0.2;
        this.rightHandMesh.position.z = 1.5;


        // Snorlax components added
        this.add(this.headMesh, this.mainBodyMesh, this.baseMesh, this.earMesh, this.earMesh2, this.leftFootMesh, this.rightFootMesh, this.leftFootInsideMesh, this.rightFootInsideMesh, this.nailLeftLeftMesh, this.nailLeftMiddleMesh, this.nailLeftRightMesh, this.nailRightLeftMesh, this.nailRightMiddleMesh, this.nailRightRightMesh, this.leftEyeMesh, this.rightEyeMesh, this.mouthMesh, this.leftArmMesh, this.leftHandMesh, this.rightArmMesh, this.rightHandMesh);
    }

}

export { Snorlax };
