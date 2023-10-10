import * as THREE from 'three';

class Cake extends THREE.Object3D {

    constructor() {
        super();

        // Cake general related attributes
        this.radiusTop = 0.2;
        this.radiusBottom = 0.2;
        this.height = 0.1;
        this.radialSegments = 32;
        this.heightSegments = 2;
        this.openEnded = false;
        this.thetaStart = Math.PI * 0.00;
        this.thetaLength = (7/4)*Math.PI;
        
        // Texture cake
        this.cakeTexture = new THREE.TextureLoader().load('textures/cake.jpg');
        this.cakeTexture.wrapS = THREE.RepeatWrapping;
        this.cakeTexture.wrapT = THREE.RepeatWrapping;
        this.cakeTexture.colorSpace = THREE.SRGBColorSpace;
        this.cakeMaterial = new THREE.MeshPhongMaterial({ color: "#653B02", specular: "#0f0f0f", shininess: 0, map: this.cakeTexture});

        // Texture cake top
        this.topCakeTexture = new THREE.TextureLoader().load('textures/cake.png');
        this.topCakeTexture.wrapS = THREE.RepeatWrapping;
        this.topCakeTexture.wrapT = THREE.RepeatWrapping;
        this.topCakeTexture.colorSpace = THREE.SRGBColorSpace;
        this.topCakeMaterial = new THREE.MeshPhongMaterial({ color: "#653B02", specular: "#0f0f0f", shininess: 0, map: this.topCakeTexture});

        // Cake
        let geometry = new THREE.CylinderGeometry(this.radiusTop, this.radiusBottom, this.height, this.radialSegments, this.heightSegments, this.openEnded, this.thetaStart, this.thetaLength);
        this.cakeMesh = new THREE.Mesh(geometry, this.cakeMaterial);

        // Cake sides
        let sideGeometry = new THREE.PlaneGeometry( 0.2, 0.1 );
        this.cakeSide1Mesh = new THREE.Mesh(sideGeometry, this.cakeMaterial);
        this.cakeSide1Mesh.rotation.y = -Math.PI / 2;
        this.cakeSide1Mesh.position.z = 0.1;
        this.cakeSide2Mesh = new THREE.Mesh(sideGeometry, this.cakeMaterial);
        this.cakeSide2Mesh.rotation.y = -7*Math.PI / 4;
        this.cakeSide2Mesh.position.z = Math.cos(7*Math.PI / 4) * 0.1;
        this.cakeSide2Mesh.position.x = Math.sin(7*Math.PI / 4) * 0.1;

        // Cake top
        let topCake = new THREE.CircleGeometry(this.radiusTop, this.radialSegments, Math.PI*1.5, this.thetaLength);
        this.topCakeMesh = new THREE.Mesh(topCake, this.topCakeMaterial);
        this.topCakeMesh.rotation.x = -Math.PI / 2;
        this.topCakeMesh.position.y = this.height - 0.0498;

        // Add Cake components to the scene
        this.add(this.cakeMesh, this.topCakeMesh);
        this.add(this.cakeMesh, this.cakeSide1Mesh, this.cakeSide2Mesh);
    }
}

export { Cake };