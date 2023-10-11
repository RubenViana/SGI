import * as THREE from 'three';

class Carocha extends THREE.Object3D {

    constructor() {
        super();

        this.carocha = new THREE.Object3D();

        const startPoint = new THREE.Vector3(-4.0, -2.0, 0);
        const controlPoint = new THREE.Vector3(-4.0, 0, 0); 
        const controlPoint_2 = new THREE.Vector3(-1.0, 0, 0); 
        const endPoint = new THREE.Vector3(-1.0, -2.0, 0);

        const startPoint2 = new THREE.Vector3(-4.0, -2.0, 0);
        const controlPoint2 = new THREE.Vector3(-4.0, 0.5, 0); 
        const controlPoint2_1 = new THREE.Vector3(-2.5, 2.0, 0); 
        const endPoint2 = new THREE.Vector3(0, 2.0, 0);

        const startPoint3 = new THREE.Vector3(0, 2.0, 0);
        const controlPoint3_1 = new THREE.Vector3(1.0, 2.0, 0); 
        const controlPoint3_2 = new THREE.Vector3(2.0, 1.0, 0); 
        const endPoint3 = new THREE.Vector3(2.0, 0, 0);

        const startPoint4 = new THREE.Vector3(2.0, 0, 0);
        const controlPoint4_1 = new THREE.Vector3(3.0, 0, 0); 
        const controlPoint4_2 = new THREE.Vector3(4.0, -1.0, 0); 
        const endPoint4 = new THREE.Vector3(4.0, -2.0, 0);

        const startPoint5 = new THREE.Vector3(1.0, -2.0, 0);
        const controlPoint5_1 = new THREE.Vector3(1.0, 0, 0); 
        const controlPoint5_2 = new THREE.Vector3(4.0, 0, 0); 
        const endPoint5 = new THREE.Vector3(4.0, -2.0, 0);

        this.initCubicBezierCurve([startPoint, controlPoint, controlPoint_2, endPoint]);
        this.initCubicBezierCurve([startPoint2, controlPoint2, controlPoint2_1, endPoint2]);
        this.initCubicBezierCurve([startPoint3, controlPoint3_1, controlPoint3_2, endPoint3]);
        this.initCubicBezierCurve([startPoint4, controlPoint4_1, controlPoint4_2, endPoint4]);
        this.initCubicBezierCurve([startPoint5, controlPoint5_1, controlPoint5_2, endPoint5]);

        this.frameMaterial = new THREE.MeshPhongMaterial({ 
            color: "#000000",
            specular: "#101010",
            emissive: "#000000",
            shininess: 20
        })

        this.carocha.scale.set(0.2, 0.2, 0.2);
        this.carocha.position.z = -0.005;
        this.add(this.carocha);

        this.frame = this.createFrame(2, 1.25, 0.05, this.frameMaterial);
        this.add(this.frame);
    }

    initCubicBezierCurve(points) {

        let curve = new THREE.CubicBezierCurve3( points[0], points[1], points[2], points[3])
    
        // sample a number of points on the curve
    
        let sampledPoints = curve.getPoints( 50 );
        this.curveGeometry = new THREE.BufferGeometry().setFromPoints( sampledPoints )
        this.lineMaterial = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 1 } )
        this.lineObj = new THREE.Line( this.curveGeometry, this.lineMaterial )
    
        this.carocha.add( this.lineObj );
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

export {Carocha};