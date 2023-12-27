import * as THREE from 'three'

class MyVehicle extends THREE.Object3D {
    constructor(v_max, v_min, acceleration, deceleration, s_max) {
        super();
        this.v_max = 1;
        this.v_min = -0.5;
        this.velocity = 0;
        this.acceleration = 0.06;
        this.deceleration = 0.03;
        this.direction = 0;
        this.steering = 0;
        this.steering_speed = Math.PI / 70;
        this.s_max = Math.PI / 4;

        this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
        this.geometry = new THREE.BoxGeometry(3, 1, 2);
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.material2 = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false });
        this.geometry2 = new THREE.BoxGeometry(1, 1, 1);
        this.mesh2 = new THREE.Mesh(this.geometry2, this.material2);
        this.mesh2.position.set(1.2, 0.5, 0);

        const geometry = new THREE.CylinderGeometry( 0.5, 0.5, 0.2, 32 ); 
        this.tyreLeft = new THREE.Mesh( geometry, this.material2 );
        this.tyreLeft.rotation.x = Math.PI / 2;
        this.tyreLeft.position.set(1.1, 0, -1.1);
        
        this.tyreRight = new THREE.Mesh( geometry, this.material2 );
        this.tyreRight.rotation.x = Math.PI / 2;
        this.tyreRight.position.set(1.1, 0, 1.1);

        this.add(this.mesh, this.mesh2, this.tyreLeft, this.tyreRight);
    }

    accelerate_forward() {
        if (this.velocity < this.v_max) {
            this.velocity += this.acceleration;
        }
    }

    accelerate_backward() {
        if (this.velocity > this.v_min) {
            this.velocity -= this.acceleration;
        }
    }

    decelerate() {
        if (this.velocity > 0) {
            this.velocity -= this.deceleration;
        }
        if (this.velocity < 0) {
            this.velocity += this.deceleration;
        }
        if (this.velocity < 0.1 && this.velocity > -0.1) {
            this.velocity = 0;
        }
    }

    turnLeft() {
        if(this.steering < this.s_max) {
            this.steering += this.steering_speed;
            this.tyreLeft.rotation.z = -this.steering;
            this.tyreRight.rotation.z = -this.steering;
        }

        if(this.velocity < 0) {
            this.direction -= this.steering_speed;
            this.rotation.y = this.direction;
        }
        else if(this.velocity > 0) {
            this.direction += this.steering_speed
            this.rotation.y = this.direction;
        }
    }

    turnRight() {
        if(this.steering > -this.s_max) {
            this.steering -= this.steering_speed;
            this.tyreLeft.rotation.z = -this.steering;
            this.tyreRight.rotation.z = -this.steering;
        }

        if(this.velocity < 0) {
            this.direction += this.steering_speed;
            this.rotation.y = this.direction;
        }
        else if(this.velocity > 0) {
            this.direction -= this.steering_speed
            this.rotation.y = this.direction;
        }
    }

    unTurn() {
        if (this.steering > 0) {
            this.steering -= this.steering_speed;
            this.tyreLeft.rotation.z = -this.steering_speed;
            this.tyreRight.rotation.z = -this.steering_speed;
        }
        else if (this.steering < 0) {
            this.steering += this.steering_speed;
            this.tyreRight.rotation.z = this.steering_speed;
            this.tyreLeft.rotation.z = this.steering_speed;
        }
    }

    update() {
        // Update position based on velocity and current rotation
        this.position.x += this.velocity * Math.cos(-this.direction);
        this.position.z += this.velocity * Math.sin(-this.direction);
    }

}

export { MyVehicle };