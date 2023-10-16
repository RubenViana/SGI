import * as THREE from 'three';

class TV extends THREE.Object3D {

    constructor() {
        super();

        this.tvMaterial = new THREE.MeshPhongMaterial({
            color: "#000000", // White color
            specular: "#000000", // Specular color
            shininess: 30, // Shininess factor
        });

        this.tvImage = new THREE.TextureLoader().load('textures/precoCerto.jpg');
        this.tvImage.colorSpace = THREE.SRGBColorSpace;

        this.tv = this.createFrame(4, 2, 0.05, this.tvMaterial);

        this.add(this.tv);

    }

    createFrame(width, height, depth, material) {
        // Create an Object3D to hold all the frame parts
        const frame = new THREE.Object3D();
      
        // Define the dimensions of the door frame parts
        const frameWidth = width;
        const frameHeight = height;
        const frameDepth = depth;
      
        // Create the main vertical parts of the door frame
        const leftVertical = new THREE.Mesh(new THREE.BoxGeometry(frameDepth, frameHeight, frameDepth), material);
        const rightVertical = leftVertical.clone();
      
        // Position the vertical parts
        leftVertical.position.x = -(frameWidth / 2) + frameDepth/2;
        rightVertical.position.x = frameWidth / 2 - frameDepth/2;
      
        // Create the horizontal parts of the door frame
        const topHorizontal = new THREE.Mesh(new THREE.BoxGeometry(frameWidth, frameDepth, frameDepth), material);
        const bottomHorizontal = topHorizontal.clone();
      
        // Position the horizontal parts
        topHorizontal.position.y = frameHeight / 2;
        bottomHorizontal.position.y = -(frameHeight / 2);

        const frameLandscapeBackground = new THREE.PlaneGeometry( frameWidth - 0.01, frameHeight - 0.01);
        const frameLandscapeBackgroundMesh = new THREE.Mesh( frameLandscapeBackground, new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x000000, map: this.tvImage } ) );
        frameLandscapeBackgroundMesh.position.z = -0.01;
      
        // Add all parts to the frame Object3D
        frame.add(leftVertical);
        frame.add(rightVertical);
        frame.add(topHorizontal);
        frame.add(bottomHorizontal);
        frame.add(frameLandscapeBackgroundMesh);
      
        return frame;
      }

}

export {TV};