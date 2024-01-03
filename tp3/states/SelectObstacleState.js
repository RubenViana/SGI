import { State } from "./State.js";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


class SelectObstacleState extends State {
    constructor(app, previousState) {
        super(app);
        this.previousState = previousState;

        // create obstacles park camera
        this.ObsCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        this.ObsCamera.position.set(490, 14, 460);
        this.ObsCamera.lookAt(480, 1, 450);
        this.app.cameras["ObstaclePark"] = this.ObsCamera;

        // create track overview camera
        this.trackOverviewCamera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 5000);
        this.trackOverviewCamera.position.set(300, 380, 300);
        this.trackOverviewCamera.lookAt(300, 0, 300);
        this.app.cameras["trackOverview"] = this.trackOverviewCamera;

        this.app.setActiveCamera("ObstaclePark");

        this.app.controls = new OrbitControls(this.app.activeCamera, this.app.renderer.domElement);
        this.app.controls.target.set(480, 1, 450);

        this.selectedObstacle = null;
    }

    update() {
        if (this.selectedObstacle != null) {
            this.selectedObstacle.scale.set(1.5, 1.5, 1.5);
        }
    }

    onPointerMove(event) {
        this.pointer = new THREE.Vector2();

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components

        //of the screen is the origin
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //console.log("Position x: " + this.pointer.x + " y: " + this.pointer.y);

        //2. set the picking ray from the camera position and mouse coordinates
        this.raycaster.setFromCamera(this.pointer, this.app.activeCamera);

        //3. compute intersections
        var intersects = this.raycaster.intersectObjects(this.app.obstacles.children);

        //4. highlight the picked object
        this.pickingObstacleHelper(intersects)
    }   

    onPointerDown(event) {
        this.pointer = new THREE.Vector2();

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components

        //of the screen is the origin
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //console.log("Position x: " + this.pointer.x + " y: " + this.pointer.y);

        //2. set the picking ray from the camera position and mouse coordinates
        this.raycaster.setFromCamera(this.pointer, this.app.activeCamera);

        // select obstacle
        if (this.selectedObstacle == null) {
            var intersects = this.raycaster.intersectObjects(this.app.obstacles.children);
            if (intersects.length > 0) {
                this.selectedObstacle = intersects[0].object.parent;
                this.selectedObstacle.scale.set(1.5, 1.5, 1.5);

                // change to view all track camera
                this.app.setActiveCamera("trackOverview");
                this.app.controls.target.set(300, 0, 300);
            }
        }
        else if (this.selectedObstacle != null) {
            var intersects = this.raycaster.intersectObjects(this.app.track.children);
            this.selectedObstacle.scale.set(1, 1, 1);
            if (intersects.length > 0) {
                this.selectedObstacle.position.set(intersects[0].point.x, 2, intersects[0].point.z);
                this.selectedObstacle.update();
                this.selectedObstacle = null;

                this.setState(this.previousState);
                this.previousState.clock.start();
                this.previousState.resetKeys();
                this.previousState.enemyClock.start();
                this.previousState.speedometerBackground.visible = true;
                this.previousState.speedometer.visible = true;
                this.app.setActiveCamera("CarThirdPerson");
            }
            else {
                this.app.setActiveCamera("ObstaclePark");
                this.app.controls.target.set(480, 1, 450);
            }
            this.selectedObstacle = null;
        }
    }
}

export { SelectObstacleState };