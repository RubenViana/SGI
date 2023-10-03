import * as THREE from 'three';

class Window extends THREE.Object3D {

    constructor() {
        super();

        // window related attributes
        this.windowWidth = 10;
        this.windowHeight = 4;
        this.windowDepth = 0.1;

        this.windowMaterial = new THREE.MeshPhongMaterial({ 
            color: "#000000",
            specular: "#505050",
            emissive: "#000000",
            shininess: 20
        })

        // texture
        this.windowLandscapeTexture = new THREE.TextureLoader().load('textures/poolWindowTexture.jpg');
        this.windowLandscapeTexture.wrapS = THREE.RepeatWrapping;
        this.windowLandscapeTexture.wrapT = THREE.RepeatWrapping;

        this.windowLandscapeMaterial = new THREE.MeshPhongMaterial({
            color: "#ffffff", // White color
            specular: "#ffffff", // Specular color
            shininess: 50, // Shininess factor
            emissive: "#404040",
            map: this.windowLandscapeTexture,// Assigning the texture to the material
        });
        

        const windowLandscapeBackground = new THREE.PlaneGeometry( this.windowWidth - 0.01, this.windowHeight - 0.01);
        const windowTopFrame = new THREE.BoxGeometry( this.windowWidth, this.windowDepth, this.windowDepth );
        const windowSideFrame = new THREE.BoxGeometry( this.windowDepth, this.windowHeight, this.windowDepth );
        const windowMiddleFrame = new THREE.BoxGeometry( this.windowDepth/2, this.windowHeight, this.windowDepth );

        this.windowTopFrameMesh = new THREE.Mesh( windowTopFrame, this.windowMaterial );
        this.windowTopFrameMesh.position.y = this.windowHeight;

        this.windowSideFrame1Mesh = new THREE.Mesh( windowSideFrame, this.windowMaterial );
        this.windowSideFrame1Mesh.position.y = this.windowHeight/2;
        this.windowSideFrame1Mesh.position.x = this.windowWidth/2 - this.windowDepth/2;

        this.windowSideFrame2Mesh = new THREE.Mesh( windowSideFrame, this.windowMaterial );
        this.windowSideFrame2Mesh.position.y = this.windowHeight/2;
        this.windowSideFrame2Mesh.position.x = -this.windowWidth/2 + this.windowDepth/2;

        this.windowSideFrame3Mesh = new THREE.Mesh( windowMiddleFrame, this.windowMaterial );
        this.windowSideFrame3Mesh.position.y = this.windowHeight/2;

        this.windowLandscapeBackgroundMesh = new THREE.Mesh( windowLandscapeBackground, this.windowLandscapeMaterial );
        this.windowLandscapeBackgroundMesh.position.y = this.windowHeight/2;
        this.windowLandscapeBackgroundMesh.position.z = 0.01;

        this.add( this.windowLandscapeBackgroundMesh, this.windowTopFrameMesh, this.windowSideFrame1Mesh, this.windowSideFrame2Mesh, this.windowSideFrame3Mesh );

    }
}

export { Window };