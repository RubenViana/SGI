import { State } from "./State.js";
import { GamePauseState } from "./GamePauseState.js";
import { SelectObstacleState } from "./SelectObstacleState.js";
import * as THREE from "three";
import { Sprite } from "../sprites/Sprite.js";
import { Speedometer } from "../sprites/Speedometer.js";
import { GameOverState } from "./GameOverState.js";
import { MyFirework } from "../objects/MyFirework.js";
import { MyRoute } from "../objects/MyRoute.js";

class GamePlayState extends State {
    constructor(app, gameSettings) {
        super(app);
        this.name = "GamePlayState";
        this.gameSettings = gameSettings;
        this.fireworks = []
        
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
        };

        // clock
        this.elapsedTime = 0;
        this.clock = new THREE.Clock();

        // set vehicles to the starting position
        this.gameSettings.players[0].car.position.set(10, 0.3, 320);
        this.gameSettings.players[0].car.rotation.y = Math.PI/2;
        this.gameSettings.players[0].car.direction = Math.PI/2;
        this.gameSettings.players[1].car.position.set(18, 0.3, 320);
        this.gameSettings.players[1].car.rotation.y = Math.PI/2;
        this.gameSettings.players[1].car.direction = Math.PI/2;

        // save old position
        this.oldPosition = [];
        this.oldPosition[0] = this.gameSettings.players[0].car.position.clone();
        this.oldPosition[1] = this.gameSettings.players[1].car.position.clone();

        // create car camera
        this.carCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.carCamera.position.set(0, 5, -10); // adjust the position relative to the car
        this.carCamera.lookAt(this.gameSettings.players[0].car.position);
        this.app.cameras["CarThirdPerson"] = this.carCamera;

        this.carCamera2 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
        this.carCamera2.position.set(this.gameSettings.players[0].car.position.x, this.gameSettings.players[0].car.position.y, this.gameSettings.players[0].car.position.z);
        this.carCamera2.lookAt(this.gameSettings.players[0].car.position.x, this.gameSettings.players[0].car.position.y, this.gameSettings.players[0].car.position.z);
        this.app.cameras["CarFirstPerson"] = this.carCamera2;

        // set third person camera as active camera
        this.app.setActiveCamera("CarThirdPerson");

        this.app.scene.add(this.gameSettings.players[0].car);
        this.app.scene.add(this.gameSettings.players[1].car);

        //Add lapSprite sprite
        this.lapSprite = new Sprite("1 / 3");
        this.lapSprite.scale.set(100, 80, 1);
        this.lapSprite.position.set(window.innerWidth / 2.2, window.innerHeight / 2.2, 0); // Adjust position accordingly
        this.app.HUDscene.add(this.lapSprite);
        this.lapSprite.visible = false;

        this.timerSprite = new Sprite("0:00");
        this.timerSprite.scale.set(100, 80, 1);
        this.timerSprite.position.set(window.innerWidth / 40, window.innerHeight / 2.2, 0);
        this.app.HUDscene.add(this.timerSprite);
        this.timerSprite.visible = false;

        this.speedSprite = new Sprite("Speed: 0", 512 * 1.3, 256 * 1.3);
        this.speedSprite.scale.set(200, 100, 1);
        this.speedSprite.position.set(window.innerWidth / 2.2, -window.innerHeight / 3, 1); // Position bottom right
        this.app.HUDscene.add(this.speedSprite);
        this.speedSprite.visible = false;

        const map = new THREE.TextureLoader().load( "./objects/textures/speedometer.png" );
        const material = new THREE.SpriteMaterial( { map: map } );

        this.speedometerBackground = new THREE.Sprite( material );
        this.speedometerBackground.scale.set(512, 256 * 1.3, 1);
        this.speedometerBackground.position.set(window.innerWidth / 40, -window.innerHeight / 4, 1);
        this.app.HUDscene.add( this.speedometerBackground );

        this.speedometer = new Speedometer(0, 512 * 1.3, 256 * 1.3);
        this.speedometer.scale.set(350, 200, 0);
        this.speedometer.position.set(window.innerWidth / 40, -window.innerHeight / 4, 1); 
        this.app.HUDscene.add(this.speedometer);
        this.speedometer.visible = true;

        // sprite for powerUp speed
        this.speedPowerUp = new Sprite("Speed 2x", 512, 256);
        this.speedPowerUp.scale.set(200, 160, 1);
        this.speedPowerUp.position.set( - window.innerWidth/2.4, window.innerHeight / 2.2, 0);
        this.app.HUDscene.add(this.speedPowerUp);
        this.speedPowerUp.visible = false;

        this.speedPowerUpTimer = new Sprite("0 s");
        this.speedPowerUpTimer.scale.set(100*0.8, 80*0.8, 1);
        this.speedPowerUpTimer.position.set( - window.innerWidth/2.4, window.innerHeight / 2.4, 0);
        this.app.HUDscene.add(this.speedPowerUpTimer);
        this.speedPowerUpTimer.visible = false;

        // sprite for added time
        this.extraTime = new Sprite("0");
        this.extraTime.scale.set(100*0.8, 80*0.8, 1);
        this.extraTime.position.set(window.innerWidth/40, window.innerHeight / 2.4, 0);
        this.app.HUDscene.add(this.extraTime);
        this.extraTime.visible = false;

        // sprite for obstacle speed
        this.speedObstacle = new Sprite("Speed 0.3x", 512, 256);
        this.speedObstacle.scale.set(200, 160, 1);
        this.speedObstacle.position.set( - window.innerWidth/2.4, window.innerHeight / 2.2, 0);
        this.app.HUDscene.add(this.speedObstacle);
        this.speedObstacle.visible = false;

        this.speedObstacleTimer = new Sprite("0 s");
        this.speedObstacleTimer.scale.set(100*0.8, 80*0.8, 1);
        this.speedObstacleTimer.position.set( - window.innerWidth/2.4, window.innerHeight / 2.4, 0);
        this.app.HUDscene.add(this.speedObstacleTimer);
        this.speedObstacleTimer.visible = false;


        this.enemyMixer = null
        this.enemyClock = new THREE.Clock();
        this.difficultyLevel = this.gameSettings.difficulty * 0.1
        this.createEnemyAnimation();
        this.startEnemyAnimation();
    }

    update() {
        // update clock
        this.elapsedTime += this.clock.getDelta();

        if (this.gameSettings.players[0].laps == 3 || this.gameSettings.players[1].laps == 3) {
            // add new fireworks every 5% of the calls
            if(Math.random()  < 0.05 ) {
                this.fireworks.push(new MyFirework(this.app, this))
                //console.log("firework added")
            }

            // for each fireworks 
            for( let i = 0; i < this.fireworks.length; i++ ) {
                // is firework finished?
                if (this.fireworks[i].done) {
                    // remove firework 
                    this.fireworks.splice(i,1) 
                    //console.log("firework removed")
                    continue 
                }
                // otherwise upsdate  firework
                this.fireworks[i].update()
            }
        }

        // game logic

        // check if car crosses the finish line -> lap++
        // if laps == gameSettings.laps -> time = clock.getTime
        // when both players laps == gameSettings.laps -> game over
        // check which player has the best time -> determine winner
        // got to game over state

        // check if car is out of bounds -> decrease car v_max
        // check car collision with other car -> decrease car insta velocity

        // check car collision with power up -> add power up to car
        // check car collision with obstacle -> delay car
        
        this.updateCar();
        this.crossFinishLine();
        this.updateCollisions();
        this.updateCarCamera();

        this.updateEnemyPosition();
        this.updateEnemyAnimation();

        // tmp car2 update
        this.gameSettings.players[1].car.update();

        if (this.pwuTimeout != null){
            if ((this.elapsedTime - this.pwuTimeout) >= 3) {
                this.speedPowerUp.visible = false;
                this.speedPowerUpTimer.visible = false;
                this.pwuTimeout = null;

                this.gameSettings.players[0].car.v_max = this.gameSettings.players[0].car.v_max_default;
            }
        } 

        if (this.obsTimeout != null){
            if ((this.elapsedTime - this.obsTimeout) >= 3) {
                this.speedObstacle.visible = false;
                this.speedObstacleTimer.visible = false;
                this.obsTimeout = null;

                this.gameSettings.players[0].car.v_max = this.gameSettings.players[0].car.v_max_default;
            }
        }


        for (let i = 0; i < this.gameSettings.players.length; i++) {
            if (this.gameSettings.players[i].laps == this.gameSettings.laps + 1) { 
                this.gameSettings.players[i].time = this.elapsedTime + this.gameSettings.players[i].addedTime;
            }
        }

        if (this.gameSettings.players[0].laps == this.gameSettings.laps + 1 && this.gameSettings.players[1].laps == this.gameSettings.laps) {
            // console.log("Game over!");
            this.setState(new GameOverState(this.app, this.gameSettings));
        }
        

        this.updateHUD();
    }

    //Create and defines enemy vehicle animation
    createEnemyAnimation(){

        //Create Position KF Track
        let positions = [...this.gameSettings.players[1].car.position]
        let posIndex = 0
        let posIndexs = [0]
        this.pathBot = new MyRoute();
        for(let position of this.pathBot.pathBot.points){
            positions.push(...position)
            posIndexs.push(++posIndex)
        }

        const positionKF = new THREE.VectorKeyframeTrack('.position', posIndexs, positions,
            THREE.InterpolateLinear  /* THREE.InterpolateLinear (default), THREE.InterpolateDiscrete,*/
        )

        //Create Rotation KF Track
        let quarterions = []
        let index = 0
        let indexs = []
        for(let rotation of this.pathBot.pathBot_rotation){
            quarterions.push(...rotation)
            indexs.push(index++)
        }

        const quaternionKF = new THREE.QuaternionKeyframeTrack('.quaternion', indexs, quarterions);

        //Create clips for animation (position and rotation)
        const positionClip = new THREE.AnimationClip('positionAnimation', posIndex, [positionKF])
        const rotationClip = new THREE.AnimationClip('rotationAnimation', index, [quaternionKF])

        // Create an AnimationMixer
        this.enemyMixer = new THREE.AnimationMixer(this.gameSettings.players[1].car)

        // Create AnimationActions for each clip
        this.enemyActionAnimation = this.enemyMixer.clipAction(positionClip)
        this.enemyActionAnimation.setLoop(THREE.LoopRepeat);
        this.enemyActionAnimation.repetitions = 4;

        this.enemyRotationAnimation = this.enemyMixer.clipAction(rotationClip)
        this.enemyRotationAnimation.setLoop(THREE.LoopRepeat);
        this.enemyRotationAnimation.repetitions = 4;
    }

    // Plays enemy Animation
    startEnemyAnimation() {
        // Play both animations
        if (this.enemyActionAnimation && this.enemyRotationAnimation) {
            this.enemyActionAnimation.play();
            this.enemyRotationAnimation.play();
        }
    }



    //Updates enemy position
    updateEnemyPosition(){
        this.gameSettings.players[1].car.position.copy(this.gameSettings.players[1].car.position)
    }

    //Updates adversary mixer clock 
    updateEnemyAnimation() {
        if (this.enemyMixer) {
          this.enemyMixer.update(this.enemyClock.getDelta()*this.difficultyLevel);
        }
    }

    crossFinishLine() {
        //finishLine = 14,12,300
        for (let i = 0; i < this.gameSettings.players.length; i++) {
            const position = this.gameSettings.players[i].car.position;

            if (position.x > -7 && position.x < 35 && this.oldPosition[i].z >= 300 && position.z <= 300) {
                // console.log("Crossed finish line!");
                this.gameSettings.players[i].laps++;
            }
            
            this.oldPosition[i] = position.clone();
        }
    }

    updateCollisions() {
        const car = this.gameSettings.players[0].car.hitbox;
        const carObb = car.userData.obb;

        // collision with power ups
        for ( let i = 0; i < this.gameSettings.powerUps.children.length; i ++ ) {
            const objectToTest = this.gameSettings.powerUps.children[ i ];
            const obbToTest = objectToTest.userData.obb;
            if ( carObb.intersectsOBB( obbToTest ) === true ) {
                // select a obstacle to place on the track
                this.clock.stop(); // quick fix for stopping the clock
                this.enemyClock.stop();
                this.speedometer.visible = false;
                this.speedometerBackground.visible = false;
                this.setState(new SelectObstacleState(this.app, this));
                
                if (objectToTest.type === "speed") {
                    // console.log("Collision with speed power up detected!");
                    
                    this.speedObstacle.visible = false;
                    this.speedObstacleTimer.visible = false;
                    this.obsTimeout = null;
                    
                    this.gameSettings.players[0].car.v_max = this.gameSettings.players[0].car.v_max_default * 2;
                    this.speedPowerUp.visible = true;
                    this.speedPowerUpTimer.visible = true;
                    this.pwuTimeout = this.elapsedTime;
                    
                }
                else if (objectToTest.type === "time") {
                    // console.log("Collision with time power up detected!");
                    this.gameSettings.players[0].addedTime -= 2;
                    this.extraTime.visible = true;
                }

                // only for testing
                // this.gameSettings.players[0].car.hitbox.material.visible = true;

                // make power up invisible for 30 sec
                this.gameSettings.powerUps.remove(objectToTest);
                setTimeout(() => {
                    this.gameSettings.powerUps.add(objectToTest);
                }, 30000);
            }
        }

        // collision with obstacles
        for ( let i = 0; i < this.gameSettings.obstacles.children.length; i ++ ) {
            const objectToTest = this.gameSettings.obstacles.children[ i ];
            const obbToTest = objectToTest.userData.obb;
            if ( carObb.intersectsOBB( obbToTest ) === true ) {
                if (objectToTest.type === "speed") {
                    // console.log("Collision with speed obstacle detected!");

                    this.speedPowerUp.visible = false;
                    this.speedPowerUpTimer.visible = false;
                    this.pwuTimeout = null;

                    this.gameSettings.players[0].car.v_max = this.gameSettings.players[0].car.v_max_default * 0.7;
                    this.speedObstacle.visible = true;
                    this.speedObstacleTimer.visible = true;
                    this.obsTimeout = this.elapsedTime;
                    
                }
                else if (objectToTest.type === "time") {
                    // console.log("Collision with time obstacle detected!");
                    this.gameSettings.players[0].addedTime += 2;
                    this.extraTime.visible = true;
                }

                // only for testing
                // this.gameSettings.players[0].car.hitbox.material.visible = true;

                // return the obstacle to the obstacles park
                objectToTest.resetPosition();
            }
        }

        // collision with car
        const car2 = this.gameSettings.players[1].car.hitbox;
        const carObb2 = car2.userData.obb;
        if ( carObb.intersectsOBB( carObb2 ) === true ) {
            // console.log("Collision with car detected!");

            this.gameSettings.players[0].car.position.x -= (this.gameSettings.players[0].car.velocity * Math.cos(-this.gameSettings.players[0].car.direction)) * 2;
            this.gameSettings.players[0].car.position.z -= (this.gameSettings.players[0].car.velocity * Math.sin(-this.gameSettings.players[0].car.direction)) * 2;
            this.gameSettings.players[0].car.velocity = 0;

            // only for testing
            this.gameSettings.players[0].car.hitbox.material.visible = true;

            this.gameSettings.players[0].car.v_max = this.gameSettings.players[0].car.v_max_default * 0.3;
            setTimeout(() => {
                this.gameSettings.players[0].car.v_max = this.gameSettings.players[0].car.v_max_default;
            }, 3000);
        }

        // collision with other plane objects
        this.checkCollision(this.gameSettings.plane.children);

        // collision with track
        // need to redo this, its a mess
        if (this.gameSettings.track.isInsideTrack(this.gameSettings.players[0].car)){
            // console.log("inside");
            if (this.gameSettings.players[0].car.v_max === this.gameSettings.players[0].car.v_max_default / 2) {
                this.gameSettings.players[0].car.v_max = this.gameSettings.players[0].car.v_max_default;
            }
        }
        else {
            // console.log("outside");
            this.gameSettings.players[0].car.v_max = this.gameSettings.players[0].car.v_max_default / 2;
        }
    }

    checkCollision(list) {
        const car = this.gameSettings.players[0].car.hitbox;
        const carObb = car.userData.obb;
        for ( let i = 0; i < list.length; i ++ ) {
            const objectToTest = list[ i ];
            
            if (objectToTest.type === "Mesh") {
                const obbToTest = objectToTest.userData.obb;
                if ( carObb.intersectsOBB( obbToTest ) === true ) {
                    console.log("Collision with plane object detected!");

                    this.gameSettings.players[0].car.position.x -= (this.gameSettings.players[0].car.velocity * Math.cos(-this.gameSettings.players[0].car.direction)) * 2;
                    this.gameSettings.players[0].car.position.z -= (this.gameSettings.players[0].car.velocity * Math.sin(-this.gameSettings.players[0].car.direction)) * 2;
                    this.gameSettings.players[0].car.velocity = 0;

                    // only for testing
                    this.gameSettings.players[0].car.hitbox.material.visible = true;
                }
            }
            else {
                this.checkCollision(objectToTest.children);
            }
            
        }
    }


    updateCarCamera() {
        if (this.app.activeCameraName == "CarThirdPerson"){
            this.updateCarThirdPersonCamera();
        }
        else if (this.app.activeCameraName == "CarFirstPerson"){
            this.updateCarFirstPersonCamera();
        }
    }

    updateCarThirdPersonCamera() {
        // Set the car camera's position to follow the car
        const car = this.gameSettings.players[0].car;
        const distance = 10; // Distance from the car
        const yOffset = 5; // Vertical offset from the car

        const angle = car.rotation.y;
        const offsetX = distance * Math.cos(-angle);
        const offsetZ = distance * Math.sin(-angle);

        this.carCamera.position.x = car.position.x - offsetX;
        this.carCamera.position.y = car.position.y + yOffset;
        this.carCamera.position.z = car.position.z - offsetZ;

        this.app.controls.target = car.position;
        this.app.controls.enabled = false;
    }

    updateCarFirstPersonCamera() {
        const angle = this.gameSettings.players[0].car.rotation.y;
        const distance = 10;
        const car = this.gameSettings.players[0].car;

        const offsetX = distance * Math.cos(-angle);
        const offsetZ = distance * Math.sin(-angle);

        this.carCamera2.position.set(car.position.x, car.position.y + 2, car.position.z);
        this.carCamera2.lookAt(car.position.x + offsetX, car.position.y + 1, car.position.z + offsetZ);

        this.app.controls.target = new THREE.Vector3(car.position.x + offsetX, car.position.y + 2, car.position.z + offsetZ);
        this.app.controls.enabled = false;
    }

    toggleCamera() {
        if (this.app.activeCameraName == "CarThirdPerson"){
            this.app.setActiveCamera("CarFirstPerson");
        }
        else if (this.app.activeCameraName == "CarFirstPerson"){
            this.app.setActiveCamera("CarThirdPerson");
        }
    }

    onKeyPress(event) {
        switch (event.keyCode) {
            case 112: // p
                // document.getElementById("gameHUD").style.display = "none";
                this.clock.stop(); // quick fix for stopping the clock
                this.enemyClock.stop();
                this.setState(new GamePauseState(this.app, this));
                break;
            case 99: // c
                this.toggleCamera();
                break;
        }
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case 87: // w
                this.keys.forward = true;
                break;
            case 65: // a
                this.keys.left = true;
                break;
            case 83: // s
                this.keys.backward = true;
                break;
            case 68: // d
                this.keys.right = true;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case 87: // w
                this.keys.forward = false;
                break;
            case 65: // a
                this.keys.left = false;
                break;
            case 83: // s
                this.keys.backward = false;
                break;
            case 68: // d
                this.keys.right = false;
                break;
        }
    }

    updateCar() {
        // update car position
        if (this.keys.forward) {
            this.gameSettings.players[0].car.accelerate_forward();
        }

        if (this.keys.backward) {
            this.gameSettings.players[0].car.accelerate_backward();
        }

        if (!this.keys.forward && !this.keys.backward){
            this.gameSettings.players[0].car.decelerate();
        }

        if (this.keys.left) {
            this.gameSettings.players[0].car.turnLeft();
        }

        if (this.keys.right) {
            this.gameSettings.players[0].car.turnRight();
        }

        if (!this.keys.left && !this.keys.right){
            this.gameSettings.players[0].car.unTurn();
        }

        // update car position
        this.gameSettings.players[0].car.update();
    }

    updateHUD() {

        if (this.gameSettings.track.isInsideTrack(this.gameSettings.players[0].car)){
            this.speedSprite.updateText(`Speed: ${(Math.abs(this.gameSettings.players[0].car.velocity) * 10).toFixed(0)}`, '#ffffff');
        }
        else {
            this.speedSprite.updateText(`Speed: ${(Math.abs(this.gameSettings.players[0].car.velocity) * 10).toFixed(0)}`, '#800000');
        }

        this.timerSprite.updateText(`${this.elapsedTime.toFixed(2)}`, '#ffffff');

        this.speedometer.updateSpeed(Math.abs(this.gameSettings.players[0].car.velocity)*100);
        this.speedSprite.visible = true;

        this.lapSprite.updateText(`${this.gameSettings.players[0].laps} / 3`);
        this.lapSprite.visible = true;

        this.timerSprite.visible = true;

        // NOT WORKING PROPERLY
        this.speedPowerUp.updateText(`Speed 2x`, '#00ff00');
        if (this.speedPowerUp.visible) {
            this.speedPowerUpTimer.updateText(`${3 - (this.elapsedTime - this.pwuTimeout).toFixed(0)} s`);
        }

        this.speedObstacle.updateText(`Speed 0.7x`, '#ff0000');
        if (this.speedObstacle.visible) {
            this.speedObstacleTimer.updateText(`${3 - (this.elapsedTime - this.obsTimeout).toFixed(0)} s`);
        }

        const addedTime = this.gameSettings.players[0].addedTime;
        if (addedTime > 0) {
            this.extraTime.updateText(`+${addedTime}`, '#ff0000');
        }
        else if (addedTime < 0) {
            this.extraTime.updateText(`${addedTime}`, '#00ff00');
        }
        else {
            this.extraTime.visible = false;
        }
    }

    resetKeys() {
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
        };
    }

}

export { GamePlayState };