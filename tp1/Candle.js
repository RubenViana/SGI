import * as THREE from 'three';

class Candle extends THREE.Object3D {

    constructor() {
        super();

        // candle related attributes
        this.candleFlameRadius = 0.01;
        this.candleFlameHeight = 0.04;
        this.candleFlameRadialSegments = 32;
        this.candleFlameMaterial = new THREE.MeshPhongMaterial({ color: "#ffff00", specular: "#ffff00", emissive: "#ffff00", shininess: 90 });
        
        this.candleRadius = 0.01;
        this.candleHeight = 0.05;
        this.candleRadialSegments = 32;
        this.candleMaterial = new THREE.MeshPhongMaterial({ color: "#ffffbe", specular: "#ffffbe", emissive: "#ffffbe", shininess: 90 });

        // Candle
        let candle = new THREE.CylinderGeometry( this.candleRadius, this.candleRadius, this.candleHeight, this.candleRadialSegments );
        this.candleMesh = new THREE.Mesh( candle, this.candleMaterial );

        // Candle flame
        let candleFlame = new THREE.ConeGeometry( this.candleFlameRadius, this.candleFlameHeight, this.candleFlameRadialSegments );
        this.candleFlameMesh = new THREE.Mesh( candleFlame, this.candleFlameMaterial );
        this.candleFlameMesh.position.y = this.candleFlameHeight;
        
        
        this.add( this.candleMesh, this.candleFlameMesh);
    }
}

export { Candle };