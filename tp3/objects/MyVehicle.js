import * as THREE from 'three'

class MyVehicle extends THREE.Object3D {
    constructor() {
        super();
        this.v_max = 2;
        this.v_min = -1;
        this.velocity = 0;
        this.acceleration = 0.1;
        this.deceleration = 0.03;
        this.steering = 0;

        this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
        this.geometry = new THREE.BoxGeometry(3, 1, 2);
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.material2 = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false });
        this.geometry2 = new THREE.BoxGeometry(1, 1, 1);
        this.mesh2 = new THREE.Mesh(this.geometry2, this.material2);
        this.mesh2.position.set(1.2, 0.5, 0);

        this.add(this.mesh, this.mesh2);
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
        this.steering += this.acceleration;
        this.rotation.y = this.steering;
    }

    turnRight() {
        this.steering -= this.acceleration;
        this.rotation.y = this.steering;
    }

    update() {
        // Update position based on velocity and current rotation
        this.position.x += this.velocity * Math.cos(-this.rotation.y);
        this.position.z += this.velocity * Math.sin(-this.rotation.y);
    }

}

export { MyVehicle };