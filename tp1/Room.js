import * as THREE from 'three';

class Room extends THREE.Object3D {

    constructor() {
        super();

        // floor related attributes
        this.diffusePlaneColor = "#b5b35c"
        this.specularPlaneColor = "#b5b35c"
        this.planeShininess = 30
        this.planeMaterial = new THREE.MeshPhongMaterial({ color: this.diffusePlaneColor, 
            specular: this.diffusePlaneColor, emissive: "#000000", shininess: this.planeShininess })

        // wall related attributes
        this.diffuseWallColor = "#f5f5f5"
        this.specularWallColor = "#f5f5f5"
        this.wallShininess = 10
        this.wallMaterial = new THREE.MeshPhongMaterial({ color: this.diffuseWallColor,
            specular: this.diffuseWallColor, emissive: "#f5f5f5", shininess: this.WallShininess })
            

        let floor = new THREE.PlaneGeometry( 20, 20 );
        let wall = new THREE.PlaneGeometry( 20, 5 );
        
        // Floor
        this.floorMesh = new THREE.Mesh( floor, this.planeMaterial );
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