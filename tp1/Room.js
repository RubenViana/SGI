import * as THREE from 'three';

class Room extends THREE.Object3D {

    constructor() {
        super();

        // floor related attributes
        this.floorTexture = new THREE.TextureLoader().load('textures/woodFloorTexture.jpg');
        this.floorTexture.wrapS = THREE.RepeatWrapping;
        this.floorTexture.wrapT = THREE.RepeatWrapping;
        this.floorTexture.repeat.set(4, 4);
        this.floorTexture.colorSpace = THREE.SRGBColorSpace;

        const woodMaterial = new THREE.MeshPhongMaterial({
            color: "#E8E8E8", // color
            specular: "#0f0f0f", // Specular color
            shininess: 30, // Shininess factor
            map: this.floorTexture // Assigning the texture to the material
        });

        // wall related attributes
        this.diffuseWallColor = "#f0f0f0"
        this.specularWallColor = "#000000"
        this.wallShininess = 10
        this.wallMaterial = new THREE.MeshPhongMaterial({ color: this.diffuseWallColor,
            specular: this.specularWallColor, shininess: this.WallShininess })
            

        let floor = new THREE.PlaneGeometry( 20, 20 );
        let wall = new THREE.PlaneGeometry( 20, 5 );
        
        // Floor
        this.floorMesh = new THREE.Mesh( floor, woodMaterial );
        this.floorMesh.rotation.x = -Math.PI / 2;
        this.floorMesh.position.y = -0;

        // Wall 1
        this.wall1Mesh = new THREE.Mesh( wall, this.wallMaterial );
        this.wall1Mesh.rotation.x = 0;
        this.wall1Mesh.position.y = 2.5;
        this.wall1Mesh.position.z = -10;

        // Wall 2
        this.wall2Mesh = new THREE.Mesh( wall, this.wallMaterial );
        this.wall2Mesh.rotation.x = Math.PI;
        this.wall2Mesh.position.y = 2.5;
        this.wall2Mesh.position.z = 10;

        // Wall 3
        this.wall3Mesh = new THREE.Mesh( wall, this.wallMaterial );
        this.wall3Mesh.position.x = 10;
        this.wall3Mesh.rotation.y = -Math.PI / 2;
        this.wall3Mesh.position.y = 2.5;

        // Wall 4
        this.wall4Mesh = new THREE.Mesh( wall, this.wallMaterial );
        this.wall4Mesh.rotation.y = Math.PI / 2;
        this.wall4Mesh.position.y = 2.5;
        this.wall4Mesh.position.x = -10;

        this.add( this.wall1Mesh, this.wall2Mesh, this.wall3Mesh, this.wall4Mesh, this.floorMesh);
    }

}

export { Room };