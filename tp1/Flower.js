import * as THREE from 'three';

class Flower extends THREE.Object3D {

    constructor() {
        super();

        this.flower = new THREE.Object3D();

        // Dirt texture

        const map = new THREE.TextureLoader().load( 'textures/dirt.jpeg' );
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 16;
        map.colorSpace = THREE.SRGBColorSpace;

        // Dirt related attributes

        this.dirtRadius = 4.5;
        this.dirtSegments = 24;
        this.dirt = new THREE.CircleGeometry( this.dirtRadius, this.dirtSegments );
        this.dirtMesh = new THREE.Mesh( this.dirt, new THREE.MeshPhongMaterial( { map: map } ) );
        this.dirtMesh.position.x = -3.0;
        this.dirtMesh.position.y = -1.1;
        this.dirtMesh.rotation.y = Math.PI / 2;
        this.dirtMesh.scale.set(0.3, 0.3, 0.3);
        this.flower.add(this.dirtMesh);

        // Flower Center related attributes

        this.radius =  0.7;  
        this.detail = 5;  
        this.flowerCenter = new THREE.IcosahedronGeometry( this.radius, this.detail );
        this.flowerCenterMesh = new THREE.Mesh( this.flowerCenter, new THREE.MeshPhongMaterial( { color: 0xffff00 } ) );
        this.flowerCenterMesh.position.x = 4.0;
        this.flowerCenterMesh.position.y = -2.0;
        this.flower.add(this.flowerCenterMesh);

        // Petals related attributes

        this.petalRadius =  0.1;  
        this.petaltubeRadius = 2.3;
        this.petalRadialSegments = 28;
        this.petalTubularSegments = 24;
        this.petal = new THREE.TorusGeometry( this.petalRadius, this.petaltubeRadius, this.petalRadialSegments, this.petalTubularSegments );
        this.petalMesh = new THREE.Mesh( this.petal, new THREE.MeshPhongMaterial( { color: 0xff0000 } ) );
        this.petalMesh.position.x = 5.0;
        this.petalMesh.position.y = -2.0;
        this.petalMesh.scale.set(0.3, 0.3, 0.3);
        this.flower.add(this.petalMesh);

        this.petal2 = new THREE.TorusGeometry( this.petalRadius, this.petaltubeRadius, this.petalRadialSegments, this.petalTubularSegments );
        this.petalMesh2 = new THREE.Mesh( this.petal2, new THREE.MeshPhongMaterial( { color: 0xff0000 } ) );
        this.petalMesh2.position.x = 3.0;
        this.petalMesh2.position.y = -2.0;
        this.petalMesh2.scale.set(0.3, 0.3, 0.3);
        this.flower.add(this.petalMesh2);

        this.petal3 = new THREE.TorusGeometry( this.petalRadius, this.petaltubeRadius, this.petalRadialSegments, this.petalTubularSegments );
        this.petalMesh3 = new THREE.Mesh( this.petal3, new THREE.MeshPhongMaterial( { color: 0xff0000 } ) );
        this.petalMesh3.position.x = 4.0;
        this.petalMesh3.position.y = -1.0;
        this.petalMesh3.scale.set(0.3, 0.3, 0.3);
        this.flower.add(this.petalMesh3);

        this.petal4 = new THREE.TorusGeometry( this.petalRadius, this.petaltubeRadius, this.petalRadialSegments, this.petalTubularSegments );
        this.petalMesh4 = new THREE.Mesh( this.petal4, new THREE.MeshPhongMaterial( { color: 0xff0000 } ) );
        this.petalMesh4.position.x = 4.0;
        this.petalMesh4.position.y = -3.0;
        this.petalMesh4.scale.set(0.3, 0.3, 0.3);
        this.flower.add(this.petalMesh4);

        // Stem related attributes

        const startPoint = new THREE.Vector3(-4.0, -2.0, 0);
        const controlPoint = new THREE.Vector3(-4.0, 0, 0); 
        const controlPoint_2 = new THREE.Vector3(0.0, 0, 0); 
        const endPoint = new THREE.Vector3(0.0, -2.0, 0);

        const startPoint2 = new THREE.Vector3(0.0, -2.0, 0);
        const controlPoint2 = new THREE.Vector3(0.0, -4.0, 0);
        const controlPoint2_1 = new THREE.Vector3(4.0, -4.0, 0);
        const endPoint2 = new THREE.Vector3(4.0, -2.0, 0);


        this.initCubicBezierCurve([startPoint, controlPoint, controlPoint_2, endPoint]);
        this.initCubicBezierCurve([startPoint2, controlPoint2, controlPoint2_1, endPoint2]);

        this.frameMaterial = new THREE.MeshPhongMaterial({ 
            color: "#000000",
            specular: "#101010",
            emissive: "#000000",
            shininess: 20
        })

        this.flower.scale.set(0.3, 0.3, 0.3);
        this.flower.position.z = -0.005;
        this.add(this.flower);

        // this.frame = this.createFrame(2, 1.25, 0.05, this.frameMaterial);
        // this.add(this.frame);
    }

    initCubicBezierCurve(points) {

        let curve = new THREE.CubicBezierCurve3( points[0], points[1], points[2], points[3])
    
        // sample a number of points on the curve
    
        let sampledPoints = curve.getPoints( 50 );
        this.curveGeometry = new THREE.BufferGeometry().setFromPoints( sampledPoints )
        this.lineMaterial = new THREE.LineBasicMaterial( { color: "#964B00", linewidth: 1 } )
        this.lineObj = new THREE.Line( this.curveGeometry, this.lineMaterial )
    
        this.flower.add( this.lineObj );
    }

    createFrame(width, height, depth, material) {
        // Create an Object3D to hold all the frame parts
        const frame = new THREE.Object3D();
      
        // Define the dimensions of the door frame parts
        const frameWidth = width;
        const frameHeight = height;
        const frameDepth = depth;
      
        // Create the main vertical parts of the door frame
        const leftVertical = new THREE.Mesh(new THREE.BoxGeometry(frameDepth, frameHeight, frameDepth), material);
        const rightVertical = leftVertical.clone();
      
        // Position the vertical parts
        leftVertical.position.x = -(frameWidth / 2) + frameDepth/2;
        rightVertical.position.x = frameWidth / 2 - frameDepth/2;
      
        // Create the horizontal parts of the door frame
        const topHorizontal = new THREE.Mesh(new THREE.BoxGeometry(frameWidth, frameDepth, frameDepth), material);
        const bottomHorizontal = topHorizontal.clone();
      
        // Position the horizontal parts
        topHorizontal.position.y = frameHeight / 2;
        bottomHorizontal.position.y = -(frameHeight / 2);

        const frameLandscapeBackground = new THREE.PlaneGeometry( frameWidth - 0.01, frameHeight - 0.01);
        const frameLandscapeBackgroundMesh = new THREE.Mesh( frameLandscapeBackground, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
        frameLandscapeBackgroundMesh.position.z = -0.01;
      
        // Add all parts to the frame Object3D
        frame.add(leftVertical);
        frame.add(rightVertical);
        frame.add(topHorizontal);
        frame.add(bottomHorizontal);
        frame.add(frameLandscapeBackgroundMesh);
      
        return frame;
      }
}

export { Flower };
