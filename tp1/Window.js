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
            specular: "#101010",
            emissive: "#000000",
            shininess: 20
        })

        this.glassMaterial = new THREE.MeshPhongMaterial({
            color: "#ffffff", // White color
            specular: "#000000", // Specular color
            shininess: 50, // Shininess factor
            emissive: "#404040",
            opacity: 0.2,
            transparent: true,
            side: THREE.DoubleSide
        });

        // background landscape
        this.windowLandscapeTexture = new THREE.TextureLoader().load('textures/poolWindowTexture.jpg');
        this.windowLandscapeTexture.wrapS = THREE.RepeatWrapping;
        this.windowLandscapeTexture.wrapT = THREE.RepeatWrapping;

        this.windowLandscapeMaterial = new THREE.MeshPhongMaterial({
            color: "#ffffff", // White color
            specular: "#000000", // Specular color
            shininess: 50, // Shininess factor
            emissive: "#404040",
            map: this.windowLandscapeTexture,// Assigning the texture to the material
        });

        this.windowFrame = this.createDoorFrame(this.windowWidth, this.windowHeight, this.windowDepth, this.windowDepth + 0.2, this.windowMaterial);

        this.add(this.windowFrame)
        
        // door slider
        const windowDoorSlider = new THREE.CylinderGeometry( 0.02, 0.02, this.windowWidth - this.windowDepth*2, 32 );
        this.windowDoorSlider1 = new THREE.Mesh( windowDoorSlider, new THREE.MeshPhongMaterial({color: "#d0d0d0", specular: "ffffff", shininess: 20}) );
        this.windowDoorSlider2 = this.windowDoorSlider1.clone();
        this.windowDoorSlider3 = this.windowDoorSlider1.clone();
        this.windowDoorSlider4 = this.windowDoorSlider1.clone();

        this.windowDoorSlider1.position.z = -this.windowDepth/2;
        this.windowDoorSlider1.rotation.z = Math.PI/2;
        this.windowDoorSlider1.position.y = -this.windowHeight/2 + this.windowDepth/2;

        this.windowDoorSlider2.position.z = this.windowDepth/2;
        this.windowDoorSlider2.rotation.z = Math.PI/2;
        this.windowDoorSlider2.position.y = -this.windowHeight/2 + this.windowDepth/2;

        this.windowDoorSlider3.position.z = -this.windowDepth/2;
        this.windowDoorSlider3.rotation.z = Math.PI/2;
        this.windowDoorSlider3.position.y = this.windowHeight/2 - this.windowDepth/2;

        this.windowDoorSlider4.position.z = this.windowDepth/2;
        this.windowDoorSlider4.rotation.z = Math.PI/2;
        this.windowDoorSlider4.position.y = this.windowHeight/2 - this.windowDepth/2;

        this.add(this.windowDoorSlider1, this.windowDoorSlider2, this.windowDoorSlider3, this.windowDoorSlider4);

        // window doors
        this.windowDoor1 = this.createDoorFrame(this.windowWidth/2, this.windowHeight - 2*this.windowDepth - this.windowDepth/2, this.windowDepth + 0.1, this.windowDepth, this.windowMaterial);
        this.windowDoor2 = this.windowDoor1.clone();

        this.windowDoor1.position.z = -this.windowDepth/2;
        this.windowDoor1.position.x = -2; // here to slide the door1

        this.windowDoor2.position.z = this.windowDepth/2;
        this.windowDoor2.position.x = 1;  // here to slide the door2
        
        // // close both doors to max 
        // this.windowDoor1.position.x = -this.windowWidth/4 + this.windowDepth;
        // this.windowDoor2.position.x = this.windowWidth/4 - this.windowDepth; 
        
        this.add(this.windowDoor1, this.windowDoor2);

        // door handle
        const doorHandle = new THREE.BoxGeometry(0.05, 1, this.windowDepth + 0.01);
        this.doorHandle1 = new THREE.Mesh( doorHandle, new THREE.MeshPhongMaterial({color: "#d0d0d0", specular: "ffffff", shininess: 20}));
        this.doorHandle2 = this.doorHandle1.clone();

        this.doorHandle1.position.x = -this.windowWidth/4 + this.windowDepth;
        this.doorHandle2.position.x = this.windowWidth/4 - this.windowDepth;

        this.windowDoor1.add(this.doorHandle1);
        this.windowDoor2.add(this.doorHandle2);

        // glass panel
        const glassPanel = new THREE.BoxGeometry( this.windowWidth/2 - 0.1, this.windowHeight - 2*this.windowDepth - this.windowDepth/2 - 0.1, this.windowDepth/2 - 0.04);
        this.glassPanel1 = new THREE.Mesh( glassPanel, this.glassMaterial );
        this.glassPanel2 = this.glassPanel1.clone();
        
        this.windowDoor1.add(this.glassPanel1);
        this.windowDoor2.add(this.glassPanel2);

        // add background
        const windowLandscapeBackground = new THREE.PlaneGeometry( this.windowWidth - 0.01, this.windowHeight - 0.01);
        this.windowLandscapeBackgroundMesh = new THREE.Mesh( windowLandscapeBackground, this.windowLandscapeMaterial );
        this.windowLandscapeBackgroundMesh.position.z = -(this.windowDepth + 0.2)/2 + 0.01;

        this.add(this.windowLandscapeBackgroundMesh);

    }

    createDoorFrame(width, height, depth, depth2, material) {
        // Create an Object3D to hold all the frame parts
        const doorFrame = new THREE.Object3D();
      
        // Define the dimensions of the door frame parts
        const frameWidth = width;
        const frameHeight = height;
        const frameDepth = depth;
        const frameDepth2 = depth2;
      
        // Create the main vertical parts of the door frame
        const leftVertical = new THREE.Mesh(new THREE.BoxGeometry(frameDepth, frameHeight, frameDepth2), material);
        const rightVertical = leftVertical.clone();
      
        // Position the vertical parts
        leftVertical.position.x = -(frameWidth / 2) + frameDepth/2;
        rightVertical.position.x = frameWidth / 2 - frameDepth/2;
      
        // Create the horizontal parts of the door frame
        const topHorizontal = new THREE.Mesh(new THREE.BoxGeometry(frameWidth, frameDepth, frameDepth2), material);
        const bottomHorizontal = topHorizontal.clone();
      
        // Position the horizontal parts
        topHorizontal.position.y = frameHeight / 2;
        bottomHorizontal.position.y = -(frameHeight / 2);
      
        // Add all parts to the doorFrame Object3D
        doorFrame.add(leftVertical);
        doorFrame.add(rightVertical);
        doorFrame.add(topHorizontal);
        doorFrame.add(bottomHorizontal);
      
        return doorFrame;
      }
}

export { Window };