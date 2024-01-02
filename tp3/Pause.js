import * as THREE from 'three';

export default class PauseMenu extends THREE.Sprite {
    constructor(width = 256, height = 128) {
        super();
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.material = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(this.canvas), transparent: true });
        this.updateText();
    }

    updateText(color = 'white') {
        const ctx = this.context;
        const canvas = this.canvas;
        
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set text properties
        ctx.font = 'Bold 80px Games';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("Pause", canvas.width / 2, canvas.height / 2 + 5); // Center the text

        // Update texture
        this.material.map.dispose();
        this.material.map = new THREE.CanvasTexture(canvas);
        this.material.map.needsUpdate = true;
    }
}

export { PauseMenu };
