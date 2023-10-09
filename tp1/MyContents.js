import * as THREE from 'three';

import { MyAxis } from './MyAxis.js';

class MyContents {

    constructor(app) {

        this.app = app

        this.axis = null

    }

    init() {

        // create once

        if (this.axis === null) {

            // create and attach the axis to the scene

            this.axis = new MyAxis(this)

            this.app.scene.add(this.axis)

        }

        // variables to hold the curves

        this.polyline = null
        this.quadraticBezierCurve = null
        this.cubicBezierCurve = null
        this.catmullRomCurve = null
        
        // number of samples to use for the curves (not for polyline)

        this.numberOfSamples = 16

        // hull material and geometry

        this.hullMaterial =

            new THREE.MeshBasicMaterial({
                color: 0xffffff,

                opacity: 0.40, transparent: true
            });



        // curve recomputation

        this.recompute();

    }

    // Deletes the contents of the line if it exists and recreates them

    recompute() {

        if (this.polyline !== null) this.app.scene.remove(this.polyline)

        this.initPolyline()

        if (this.quadraticBezierCurve !== null)

            this.app.scene.remove(this.quadraticBezierCurve)

        this.initQuadraticBezierCurve()

        if (this.cubicBezierCurve !== null)

            this.app.scene.remove(this.cubicBezierCurve)

        this.initCubicBezierCurve()

        if (this.catmullRomCurve !== null)

            this.app.scene.remove(this.catmullRomCurve)

        this.initCatmullRomCurve()

    }



    drawHull(position, points) {



        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        let line = new THREE.Line(geometry, this.hullMaterial);

        // set initial position

        line.position.set(position.x, position.y, position.z)

        this.app.scene.add(line);

    }



    initPolyline() {

        // define vertex points

        let points = [

            new THREE.Vector3(-0.6, -0.6, 0.0),

            new THREE.Vector3(0.6, -0.6, -1.0),

            new THREE.Vector3(0.6, 0.6, 1.0),

            new THREE.Vector3(-0.6, 0.6, 2.0)

        ]

        let position = new THREE.Vector3(-4, 4, 0)

        this.drawHull(position, points);

        // define geometry

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        // create the line from material and geometry

        this.polyline = new THREE.Line(geometry,

            new THREE.LineBasicMaterial({ color: 0xff0000 }));

        // set initial position

        this.polyline.position.set(position.x, position.y, position.z)

        // add the line to the scene

        this.app.scene.add(this.polyline);

    }

    initQuadraticBezierCurve() {

        let points = [

            new THREE.Vector3(-0.6, -0.6, 0.0), // starting point

            new THREE.Vector3(0, 0.6, 0.0), // control point

            new THREE.Vector3(0.6, -0.6, 0.0)  // ending point

        ]

        let position = new THREE.Vector3(-2, 4, 0)

        this.drawHull(position, points);

        
        
            let curve =
        
                new THREE.QuadraticBezierCurve3( points[0], points[1], points[2])
        
            // sample a number of points on the curve
        
            let sampledPoints = curve.getPoints( this.numberOfSamples );
        
            this.curveGeometry = new THREE.BufferGeometry().setFromPoints( sampledPoints )
        
            this.lineMaterial = new THREE.LineBasicMaterial( { color: 0x00ff00 } )
        
            this.lineObj = new THREE.Line( this.curveGeometry, this.lineMaterial )
        
            this.lineObj.position.set(position.x,position.y,position.z)
        
            this.app.scene.add( this.lineObj );
        
        

    }

    initCubicBezierCurve() {

        let points = [

            new THREE.Vector3(-0.6, -0.6, 0.0), // starting point P1

            new THREE.Vector3( -0.6,  0.6,  0.2 ), // control point P2

            new THREE.Vector3( 0.6,  -0.6,  -0.2 ), // control point P3

            new THREE.Vector3(0.6, 0.6, 0.0)  // ending point P4

        ]

        let position = new THREE.Vector3(-4, 0, 0)

        this.drawHull(position, points);

        
        
            let curve =
        
                new THREE.CubicBezierCurve3( points[0], points[1], points[2], points[3])
        
            // sample a number of points on the curve
        
            let sampledPoints = curve.getPoints( this.numberOfSamples );
        
            this.curveGeometry = new THREE.BufferGeometry().setFromPoints( sampledPoints )
        
            this.lineMaterial = new THREE.LineBasicMaterial( { color: 0x00ff00 } )
        
            this.lineObj = new THREE.Line( this.curveGeometry, this.lineMaterial )
        
            this.lineObj.position.set(position.x,position.y,position.z)
        
            this.app.scene.add( this.lineObj );
        
        

    }

    initCatmullRomCurve() {
        let points = [

            new THREE.Vector3(-0.6,0,0),

            new THREE.Vector3(-0.3,0.6,0.3),

            new THREE.Vector3(0,0,0),

            new THREE.Vector3(0.3,-0.6,0.3),

            new THREE.Vector3(0.6,0,0),
            
            new THREE.Vector3(0.9,0.6,0.3),

            new THREE.Vector3(1.2,0,0)

        ]

        let position = new THREE.Vector3(0, 0, 0)

        this.drawHull(position, points);

        
        
            let curve =
        
                new THREE.CatmullRomCurve3(points)
        
            // sample a number of points on the curve
        
            let sampledPoints = curve.getPoints( 16 );
        
            this.curveGeometry = new THREE.BufferGeometry().setFromPoints( sampledPoints )
        
            this.lineMaterial = new THREE.LineBasicMaterial( { color: 0xffff00 } )
        
            this.lineObj = new THREE.Line( this.curveGeometry, this.lineMaterial )
        
            this.lineObj.position.set(position.x,position.y,position.z)
        
            this.app.scene.add( this.lineObj );
        
        

    }

    /**

     * updates the contents

     * this method is called from the render method of the app

     *

     */

    update() {

    }

}

export { MyContents }