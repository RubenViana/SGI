import * as THREE from 'three';

class MyTrack extends THREE.Object3D {

    constructor() {
        super();

        // Texture track
        this.trackTexture = new THREE.TextureLoader().load('./objects/textures/track.png');
        this.trackTexture.wrapS = THREE.RepeatWrapping;
        this.trackTexture.wrapT = THREE.RepeatWrapping;
        this.trackTexture.colorSpace = THREE.SRGBColorSpace;

        // Material track
        this.trackMaterial = new THREE.MeshPhongMaterial({ map: this.trackTexture });
        this.trackMaterial.map.repeat.set(200, 3);

        this.wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        opacity: 0.3,
        wireframe: true,
        transparent: true,
        });

        this.lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

        // Track related attributes
        this.segments = 500;
        this.width = 22;
        this.textureRepeat = 1;
        this.showWireframe = false;
        this.showMesh = true;
        this.showLine = false;
        this.closedCurve = false;
        this.path = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-571, 0, 414),
          new THREE.Vector3(-570, 0, 476),
          new THREE.Vector3(-565, 0, 537),
          new THREE.Vector3(-439, 0, 578),
          new THREE.Vector3(-403, 0, 576),
          new THREE.Vector3(-385, 0, 555),
          new THREE.Vector3(-381, 0, 526),
          new THREE.Vector3(-379, 0, 501),
          new THREE.Vector3(-377, 0, 430),
          new THREE.Vector3(-371, 0, 387),
          new THREE.Vector3(-357, 0, 372),
          new THREE.Vector3(-336, 0, 367),
          new THREE.Vector3(-318, 0, 378),
          new THREE.Vector3(-312, 0, 409),
          new THREE.Vector3(-312, 0, 530),
          new THREE.Vector3(-306, 0, 565),
          new THREE.Vector3(-292, 0, 581),
          new THREE.Vector3(-273, 0, 587),
          new THREE.Vector3(-253, 0, 580),
          new THREE.Vector3(-238, 0, 567),
          new THREE.Vector3(-226, 0, 535),
          new THREE.Vector3(-219, 0, 501),
          new THREE.Vector3(-165, 0, 220),
          new THREE.Vector3(-148, 0, 189),
          new THREE.Vector3(-127, 0, 184),
          new THREE.Vector3(-110, 0, 197),
          new THREE.Vector3(-104, 0, 221),
          new THREE.Vector3(-113, 0, 357),
          new THREE.Vector3(-131, 0, 512),
          new THREE.Vector3(-129, 0, 553),
          new THREE.Vector3(-117, 0, 573),
          new THREE.Vector3(-97, 0, 580),
          new THREE.Vector3(-75, 0, 575),
          new THREE.Vector3(-59, 0, 563),
          new THREE.Vector3(-40, 0, 513),
          new THREE.Vector3(-17, 0, 348),
          new THREE.Vector3(-11, 0, 175),
          new THREE.Vector3(-31, 0, 35),
          new THREE.Vector3(-71, 0, 12),
          new THREE.Vector3(-127, 0, 8),
          new THREE.Vector3(-187, 0, 20),
          new THREE.Vector3(-218, 0, 72),
          new THREE.Vector3(-247, 0, 213),
          new THREE.Vector3(-258, 0, 262),
          new THREE.Vector3(-275, 0, 271),
          new THREE.Vector3(-293, 0, 263),
          new THREE.Vector3(-307, 0, 214),
          new THREE.Vector3(-323, 0, 74),
          new THREE.Vector3(-340, 0, 22),
          new THREE.Vector3(-360, 0, 10),
          new THREE.Vector3(-467, 0, 20),
          new THREE.Vector3(-534, 0, 84),
          new THREE.Vector3(-558, 0, 209),
          new THREE.Vector3(-427, 0, 221),
          new THREE.Vector3(-404, 0, 233),
          new THREE.Vector3(-395, 0, 249),
          new THREE.Vector3(-403, 0, 268),
          new THREE.Vector3(-444, 0, 281),
          new THREE.Vector3(-527, 0, 298),
          new THREE.Vector3(-572, 0, 341),
          new THREE.Vector3(-571, 0, 414)
        ]);
      
        // Track

        let geometry = new THREE.TubeGeometry(
            this.path,
            this.segments,
            this.width,
            3,
            this.closedCurve
          );
        this.mesh = new THREE.Mesh(geometry, this.trackMaterial);
        this.wireframe = new THREE.Mesh(geometry, this.wireframeMaterial);
      
        let points = this.path.getPoints(this.segments);
        let bGeometry = new THREE.BufferGeometry().setFromPoints(points);
      
        // Create the final object to add to the scene
        this.line = new THREE.Line(bGeometry, this.lineMaterial);
      
        this.curve = new THREE.Group();
      
        this.mesh.visible = this.showMesh;
        this.wireframe.visible = this.showWireframe;
        this.line.visible = this.showLine;
      
        this.curve.add(this.mesh);
        this.curve.add(this.wireframe);
        this.curve.add(this.line);
        this.curve.position.set(0, -1.4, 0);
      
        this.curve.rotateZ(Math.PI);
        this.curve.scale.set(1,0.2,1);
        this.add(this.curve);
    }
}

export { MyTrack };