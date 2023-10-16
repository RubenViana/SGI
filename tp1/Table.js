import * as THREE from 'three';

class Table extends THREE.Object3D {
    
    constructor() {
        super();
        
        // table top related attributes
        this.diffuseTableTopColor = "#000f00"
        this.specularTableTopColor = "#007700"
        this.tableTopShininess = 5
        this.tableTopMaterial = new THREE.MeshPhongMaterial({ color: this.diffuseTableTopColor,
            specular: this.specularTableTopColor, emissive: "#000000", shininess: this.tableTopShininess })
        
        // texture
        this.tableTopTexture = new THREE.TextureLoader().load('textures/woodTableTopTexture.jpg');
        this.tableTopTexture.wrapS = THREE.RepeatWrapping;
        this.tableTopTexture.wrapT = THREE.RepeatWrapping;
        this.tableTopTexture.colorSpace = THREE.SRGBColorSpace;


        const woodMaterial = new THREE.MeshPhongMaterial({
            color: 0x8B4513, // Brown color
            specular: "#0f0f0f", // Specular color
            shininess: 30, // Shininess factor
            map: this.tableTopTexture,// Assigning the texture to the material
        });
        
        // table leg related attributes
        this.diffuseTableLegColor = "#505050"
        this.specularTableLegColor = "#FFFFFF"
        this.tableLegShininess = 20
        this.tableLegMaterial = new THREE.MeshPhongMaterial({ color: this.diffuseTableLegColor,
            specular: this.specularTableLegColor, shininess: this.tableLegShininess })

        // Table Top
        let tableTop = new THREE.BoxGeometry( 4, 0.1, 4 );
        this.tableTopMesh = new THREE.Mesh( tableTop, woodMaterial );
        this.tableTopMesh.position.y = 1;

        // Table Leg1
        let tableLeg1 = new THREE.CylinderGeometry( 0.08, 0.08, 1, 32 );
        this.tableLeg1Mesh = new THREE.Mesh( tableLeg1, this.tableLegMaterial );
        this.tableLeg1Mesh.position.x = 1.25;
        this.tableLeg1Mesh.position.y = 0.5;
        this.tableLeg1Mesh.position.z = 1.25;

        // Table Leg2
        let tableLeg2 = new THREE.CylinderGeometry( 0.08, 0.08, 1, 32 );
        this.tableLeg2Mesh = new THREE.Mesh( tableLeg2, this.tableLegMaterial );
        this.tableLeg2Mesh.position.x = -1.25;
        this.tableLeg2Mesh.position.y = 0.5;
        this.tableLeg2Mesh.position.z = 1.25;

        // Table Leg3
        let tableLeg3 = new THREE.CylinderGeometry( 0.08, 0.08, 1, 32 );
        this.tableLeg3Mesh = new THREE.Mesh( tableLeg3, this.tableLegMaterial );
        this.tableLeg3Mesh.position.x = 1.25;
        this.tableLeg3Mesh.position.y = 0.5;
        this.tableLeg3Mesh.position.z = -1.25;

        // Table Leg4
        let tableLeg4 = new THREE.CylinderGeometry( 0.08, 0.08, 1, 32 );
        this.tableLeg4Mesh = new THREE.Mesh( tableLeg4, this.tableLegMaterial );
        this.tableLeg4Mesh.position.x = -1.25;
        this.tableLeg4Mesh.position.y = 0.5;
        this.tableLeg4Mesh.position.z = -1.25;

        // Add table to scene
        this.add( this.tableTopMesh, this.tableLeg1Mesh, this.tableLeg2Mesh, this.tableLeg3Mesh, this.tableLeg4Mesh );

    }
}

export { Table };
