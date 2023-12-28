import * as THREE from 'three';

class MyPlane extends THREE.Object3D {

    constructor() {
        super();

        // Texture plane
        this.planeTexture = new THREE.TextureLoader().load('./objects/textures/plane.png');
        this.planeTexture.wrapS = THREE.RepeatWrapping;
        this.planeTexture.wrapT = THREE.RepeatWrapping;
        this.planeTexture.colorSpace = THREE.SRGBColorSpace;

        // Material plane (box)
        this.planeWidth = 2000;
        this.planeHeight = 2000;
        this.planeDepth = 1;
        this.planeMaterial = new THREE.MeshPhongMaterial({map: this.planeTexture });
        this.planeMaterial.map.repeat.set(100, 100);

        // Plane
        this.planeGeometry = new THREE.BoxGeometry(this.planeWidth, this.planeHeight, this.planeDepth);
        this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
        this.plane.position.set(500, 0, 400);
        this.plane.rotation.x = -Math.PI / 2;

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
        this.goalMaterial = new THREE.MeshPhongMaterial({map: this.goalTexture });

        // Goal
        this.goalGeometry = new THREE.BoxGeometry(this.goalWidth, this.goalHeight, this.goalDepth);
        this.goal = new THREE.Mesh(this.goalGeometry, this.goalMaterial);
        this.goal.position.set(14, 12, 300);

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
        this.goalPostLeft = new THREE.Mesh(this.goalPostGeometry, this.goalPostMaterial);
        this.goalPostLeft.position.set(-7, 5, 300);

        this.goalPostRight = new THREE.Mesh(this.goalPostGeometry, this.goalPostMaterial);
        this.goalPostRight.position.set(35, 5, 300);



        this.add(this.plane,
                 this.goal,
                 this.goalPostLeft,
                 this.goalPostRight);
    }
}

export { MyPlane };