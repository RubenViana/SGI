import * as THREE from 'three';

export default class Speedometer extends THREE.Sprite {
    constructor(speed, width = 256, height = 128) {
        super();
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.material = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(this.canvas), transparent: true });
        this.updateSpeed(speed);
    }

    updateSpeed(speed, color = 'white') {
        const ctx = this.context;
        const canvas = this.canvas;
    
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    

        // Draw speedometer pointer based on speed
        const maxSpeed = 150; // Define your max speed here
        const angle = (speed / maxSpeed) * (Math.PI * 1.5) + Math.PI * (3 / 4);
        const pointerLength = canvas.width / 2 - 20;
    
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2 );
        ctx.lineTo(
            canvas.width / 2 + Math.cos(angle) * pointerLength,
            canvas.height / 2 + Math.sin(angle) * pointerLength
        );
        ctx.strokeStyle = 'red'; // Change the color of the pointer
        ctx.lineWidth = 10;
        ctx.stroke();
    
        // Update texture
        this.material.map.dispose();
        this.material.map = new THREE.CanvasTexture(canvas);
        this.material.map.needsUpdate = true;
    }
    
}

export { Speedometer };