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
        this.trackMaterial.map.repeat.set(3, 3);

        this.wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        opacity: 0.3,
        wireframe: true,
        transparent: true,
        });

        this.lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

        // Track related attributes
        this.segments = 500;
        this.width = 12;
        this.textureRepeat = 100;
        this.showWireframe = true;
        this.showMesh = true;
        this.showLine = true;
        this.closedCurve = false;
        this.path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-337, 0, 431),
            new THREE.Vector3(-325, 0, 533),
            new THREE.Vector3(-318, 0, 558),
            new THREE.Vector3(-308, 0, 579),
            new THREE.Vector3(-283, 0, 585),
            new THREE.Vector3(-260, 0, 580),
            new THREE.Vector3(-249, 0, 561),
            new THREE.Vector3(-240, 0, 538),
            new THREE.Vector3(-233, 0, 511),
            new THREE.Vector3(-177, 0, 256),
            new THREE.Vector3(-163, 0, 245),
            new THREE.Vector3(-147, 0, 241),
            new THREE.Vector3(-136, 0, 253),
            new THREE.Vector3(-128, 0, 278),
            new THREE.Vector3(-123, 0, 389),
            new THREE.Vector3(-126, 0, 509),
            new THREE.Vector3(-123, 0, 556),
            new THREE.Vector3(-122, 0, 578),
            new THREE.Vector3(-114, 0, 590),
            new THREE.Vector3(-94, 0, 583),
            new THREE.Vector3(-77, 0, 569),
            new THREE.Vector3(-61, 0, 545),
            new THREE.Vector3(-50, 0, 520),
            new THREE.Vector3(-26, 0, 432),
            new THREE.Vector3(-14, 0, 290),
            new THREE.Vector3(-22, 0, 132),
            new THREE.Vector3(-53, 0, 30),
            new THREE.Vector3(-99, 0, 14),
            new THREE.Vector3(-148, 0, 17),
            new THREE.Vector3(-183, 0, 45),
            new THREE.Vector3(-241, 0, 192),
            new THREE.Vector3(-264, 0, 246),
            new THREE.Vector3(-278, 0, 253),
            new THREE.Vector3(-294, 0, 245),
            new THREE.Vector3(-313, 0, 192),
            new THREE.Vector3(-340, 0, 35),
            new THREE.Vector3(-350, 0, 22),
            new THREE.Vector3(-371, 0, 13),
            new THREE.Vector3(-467, 0, 28),
            new THREE.Vector3(-531, 0, 90),
            new THREE.Vector3(-550, 0, 210),
            new THREE.Vector3(-430, 0, 236),
            new THREE.Vector3(-414, 0, 245),
            new THREE.Vector3(-408, 0, 259),
            new THREE.Vector3(-416, 0, 274),
            new THREE.Vector3(-438, 0, 285),
            new THREE.Vector3(-522, 0, 319),
            new THREE.Vector3(-559, 0, 372),
            new THREE.Vector3(-546, 0, 504),
            new THREE.Vector3(-485, 0, 558),
            new THREE.Vector3(-404, 0, 582),
            new THREE.Vector3(-388, 0, 576),
            new THREE.Vector3(-380, 0, 559),
            new THREE.Vector3(-376, 0, 542),
            new THREE.Vector3(-375, 0, 521),
            new THREE.Vector3(-374, 0, 455),
            new THREE.Vector3(-372, 0, 431),
            new THREE.Vector3(-366, 0, 415),
            new THREE.Vector3(-352, 0, 404),
            new THREE.Vector3(-343, 0, 413),
            new THREE.Vector3(-337, 0, 431)
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
      
        this.curve.rotateZ(Math.PI);
        this.curve.scale.set(1,0.2,1);
        this.add(this.curve);
    }
}

export { MyTrack };