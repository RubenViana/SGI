import * as THREE from 'three';

class Candle extends THREE.Object3D {

    constructor() {
        super();

        // Texture candle/wax - base
        this.candleTexture = new THREE.TextureLoader().load('textures/wax.jpg');
        this.candleTexture.wrapS = THREE.RepeatWrapping;
        this.candleTexture.wrapT = THREE.RepeatWrapping;
        this.candleTexture.colorSpace = THREE.SRGBColorSpace;

        // Texture candle/wick - middle
        this.candleWickTexture = new THREE.TextureLoader().load('textures/wick.jpg');
        this.candleWickTexture.wrapS = THREE.RepeatWrapping;
        this.candleWickTexture.wrapT = THREE.RepeatWrapping;
        this.candleWickTexture.colorSpace = THREE.SRGBColorSpace;

        // Texture candle/flame - top
        this.candleFlameTexture = new THREE.TextureLoader().load('textures/flame_base.png');
        this.candleFlameTexture.wrapS = THREE.RepeatWrapping;
        this.candleFlameTexture.wrapT = THREE.RepeatWrapping;
        this.candleFlameTexture.colorSpace = THREE.SRGBColorSpace;
        this.candleFlameTextureTop = new THREE.TextureLoader().load('textures/flame_top.png');
        this.candleFlameTextureTop.wrapS = THREE.RepeatWrapping;
        this.candleFlameTextureTop.wrapT = THREE.RepeatWrapping;
        this.candleFlameTextureTop.colorSpace = THREE.SRGBColorSpace;


        // Candle flame related attributes
        this.candleFlameHeight = 0.04;
        this.candleFlameMaterial = new THREE.MeshPhongMaterial({ color: "#2964c1", shininess: 15 });
        this.candleFlameMaterialTop = new THREE.MeshPhongMaterial({ shininess: 15, map: this.candleFlameTextureTop });
        
        // Candle general related attributes
        this.candleRadius = 0.005;
        this.candleHeight = 0.07;
        this.candleRadialSegments = 32;
        this.candleMaterial = new THREE.MeshPhongMaterial({ color: "#ffffbe", specular: "#ffffbe", shininess: 30, map: this.candleTexture });

        // Candle wick related attributes
        this.candleWickRadius = 0.001;
        this.candleWickHeight = 0.035;
        this.candleWickMaterial = new THREE.MeshPhongMaterial({ color: "#ffffbe", specular: "#ffffbe", shininess: 30, map: this.candleWickTexture });

        // SemiSphere related attributes - Candle flame base
        this.phiStart = Math.PI * 2.00;
        this.phiLength = Math.PI * 2.00;
        this.thetaStart = Math.PI * 0.50;
        this.thetaLength = Math.PI * 1.00;

        // Candle wax
        let candle = new THREE.CylinderGeometry( this.candleRadius, this.candleRadius, this.candleHeight, this.candleRadialSegments );
        this.candleMesh = new THREE.Mesh( candle, this.candleMaterial );

        // Candle wick
        let candleWick = new THREE.CylinderGeometry( this.candleWickRadius, this.candleWickRadius, this.candleWickHeight, this.candleRadialSegments );
        this.candleWickMesh = new THREE.Mesh( candleWick, this.candleWickMaterial );
        this.candleWickMesh.position.y = this.candleWickHeight;

        // Candle flame top
        let candleFlame = new THREE.ConeGeometry( this.candleRadius, this.candleFlameHeight, this.candleRadialSegments );
        this.candleFlameMesh = new THREE.Mesh( candleFlame, this.candleFlameMaterialTop );
        this.candleFlameMesh.position.y = this.candleFlameHeight + 0.035;

        // Candle flame base
        let semiSphere = new THREE.SphereGeometry( this.candleRadius, this.candleRadialSegments , this.candleRadialSegments, this.phiStart, this.phiLength, this.thetaStart, this.thetaLength );
        this.semiSphereMesh = new THREE.Mesh( semiSphere, this.candleFlameMaterial );
        this.semiSphereMesh.position.y = this.candleFlameHeight + 0.0152;

        // Candle components added to the scene
        this.add( this.candleMesh, this.candleWickMesh, this.semiSphereMesh, this.candleFlameMesh );
    }
}

export { Candle };