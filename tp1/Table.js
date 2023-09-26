import * as THREE from 'three';

class Table extends THREE.Object3D {
    
    constructor() {
        super();
        
        // table top related attributes
        this.diffuseTableTopColor = "#000f00"
        this.specularTableTopColor = "#007700"
        this.tableTopShininess = 5
        this.tableTopMaterial = new THREE.MeshPhongMaterial({ color: this.diffuseTableTopColor,
            specular: this.diffuseTableTopColor, emissive: "#000000", shininess: this.tableTopShininess })

        // table leg related attributes
        this.diffuseTableLegColor = "#ff7373"
        this.specularTableLegColor = "#ff7373"
        this.tableLegShininess = 5
        this.tableLegMaterial = new THREE.MeshPhongMaterial({ color: this.diffuseTableLegColor,
            specular: this.diffuseTableLegColor, emissive: "#ff7373", shininess: this.tableLegShininess })

        // Table Top
        let tableTop = new THREE.BoxGeometry( 4, 0.1, 2 );
        this.tableTopMesh = new THREE.Mesh( tableTop, this.tableTopMaterial );
        this.tableTopMesh.position.y = 1;

        // Table Leg1
        let tableLeg1 = new THREE.CylinderGeometry( 0.08, 0.08, 1, 32 );
        this.tableLeg1Mesh = new THREE.Mesh( tableLeg1, this.tableLegMaterial );
        this.tableLeg1Mesh.position.x = 1.5;
        this.tableLeg1Mesh.position.y = 0.5;
        this.tableLeg1Mesh.position.z = 0.5;

        // Table Leg2
        let tableLeg2 = new THREE.CylinderGeometry( 0.08, 0.08, 1, 32 );
        this.tableLeg2Mesh = new THREE.Mesh( tableLeg2, this.tableLegMaterial );
        this.tableLeg2Mesh.position.x = -1.5;
        this.tableLeg2Mesh.position.y = 0.5;
        this.tableLeg2Mesh.position.z = 0.5;

        // Table Leg3
        let tableLeg3 = new THREE.CylinderGeometry( 0.08, 0.08, 1, 32 );
        this.tableLeg3Mesh = new THREE.Mesh( tableLeg3, this.tableLegMaterial );
        this.tableLeg3Mesh.position.x = 1.5;
        this.tableLeg3Mesh.position.y = 0.5;
        this.tableLeg3Mesh.position.z = -0.5;

        // Table Leg4
        let tableLeg4 = new THREE.CylinderGeometry( 0.08, 0.08, 1, 32 );
        this.tableLeg4Mesh = new THREE.Mesh( tableLeg4, this.tableLegMaterial );
        this.tableLeg4Mesh.position.x = -1.5;
        this.tableLeg4Mesh.position.y = 0.5;
        this.tableLeg4Mesh.position.z = -0.5;

        // Add table to scene
        this.add( this.tableTopMesh, this.tableLeg1Mesh, this.tableLeg2Mesh, this.tableLeg3Mesh, this.tableLeg4Mesh );

    }
}

export { Table };
