import * as THREE from 'three';

class Frame extends THREE.Object3D {

    constructor(imagePath) {
        super();

        // window related attributes
        this.frameWidth = 1.25;
        this.frameHeight = 1.5;
        this.frameDepth = 0.05;

        this.frameMaterial = new THREE.MeshPhongMaterial({ 
            color: "#000000",
            specular: "#101010",
            emissive: "#000000",
            shininess: 20
        })

        // texture
        this.frameLandscapeTexture = new THREE.TextureLoader().load(imagePath);
        this.frameLandscapeTexture.wrapS = THREE.ClampToEdgeWrapping;
        this.frameLandscapeTexture.wrapT = THREE.ClampToEdgeWrapping;

        this.frameLandscapeMaterial = new THREE.MeshPhongMaterial({
            color: "#ffffff", // White color
            specular: "#000000", // Specular color
            shininess: 50, // Shininess factor
            emissive: "#404040",
            map: this.frameLandscapeTexture,// Assigning the texture to the material
        });
        

        const frameLandscapeBackground = new THREE.PlaneGeometry( this.frameWidth - 0.01, this.frameHeight - 0.01);
        const frameTopFrame = new THREE.BoxGeometry( this.frameWidth, this.frameDepth/2, this.frameDepth );
        const frameSideFrame = new THREE.BoxGeometry( this.frameDepth/2, this.frameHeight, this.frameDepth );

        this.frameTopFrameMesh = new THREE.Mesh( frameTopFrame, this.frameMaterial );
        this.frameTopFrameMesh.position.y = this.frameHeight;

        this.frameSideFrame1Mesh = new THREE.Mesh( frameSideFrame, this.frameMaterial );
        this.frameSideFrame1Mesh.position.y = this.frameHeight/2;
        this.frameSideFrame1Mesh.position.x = this.frameWidth/2 - this.frameDepth/4;

        this.frameSideFrame2Mesh = new THREE.Mesh( frameSideFrame, this.frameMaterial );
        this.frameSideFrame2Mesh.position.y = this.frameHeight/2;
        this.frameSideFrame2Mesh.position.x = -this.frameWidth/2 + this.frameDepth/4;

        this.frameSideFrame3Mesh = new THREE.Mesh( frameTopFrame, this.frameMaterial );
        this.frameSideFrame3Mesh.position.y = 0;

        this.frameLandscapeBackgroundMesh = new THREE.Mesh( frameLandscapeBackground, this.frameLandscapeMaterial );
        this.frameLandscapeBackgroundMesh.position.y = this.frameHeight/2;
        this.frameLandscapeBackgroundMesh.position.z = -0.01;

        this.add( this.frameLandscapeBackgroundMesh, this.frameTopFrameMesh, this.frameSideFrame1Mesh, this.frameSideFrame2Mesh, this.frameSideFrame3Mesh );

    }
}

export { Frame };