import * as THREE from 'three';

class Cake extends THREE.Object3D {

    constructor() {
        super();

        // cake related attributes
        this.radiusTop = 0.2;
        this.radiusBottom = 0.2;
        this.height = 0.1;
        this.radialSegments = 9;
        this.heightSegments = 2;
        this.openEnded = false;
        this.thetaStart = Math.PI * 0.00;
        this.thetaLength = (7/4)*Math.PI;        

        this.dishMaterial = new THREE.MeshPhongMaterial({ color: "#ff0000"});

        let geometry = new THREE.CylinderGeometry(this.radiusTop, this.radiusBottom, this.height, this.radialSegments,
            this.heightSegments, this.openEnded, this.thetaStart, this.thetaLength);
        this.cakeMesh = new THREE.Mesh( geometry, this.dishMaterial);

        let sideGeometry = new THREE.PlaneGeometry( 0.2, 0.1 );
        this.cakeSide1Mesh = new THREE.Mesh( sideGeometry, this.dishMaterial);
        this.cakeSide1Mesh.rotation.y = -Math.PI / 2;
        this.cakeSide1Mesh.position.z = 0.1;

        this.cakeSide2Mesh = new THREE.Mesh( sideGeometry, this.dishMaterial);
        this.cakeSide2Mesh.rotation.y = -7*Math.PI / 4;
        this.cakeSide2Mesh.position.z = Math.cos(7*Math.PI / 4) * 0.1;
        this.cakeSide2Mesh.position.x = Math.sin(7*Math.PI / 4) * 0.1;

        this.add(this.cakeMesh, this.cakeSide1Mesh, this.cakeSide2Mesh);
    }
}

export { Cake };