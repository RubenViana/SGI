import * as THREE from 'three';

class Fireplace extends THREE.Object3D {

    constructor() {
        super();

        this.wallPaper = new THREE.TextureLoader().load('textures/wallpaper.png');
        this.wallPaper.wrapS = THREE.RepeatWrapping;
        this.wallPaper.wrapT = THREE.RepeatWrapping;
        this.wallPaper.repeat.set(1, 2);
        this.wallPaper.colorSpace = THREE.SRGBColorSpace;

        this.diffuseWallColor = "#f0f0f0"
        this.specularWallColor = "#000000"
        this.wallShininess = 10
        
        this.wallPaperMaterial = new THREE.MeshPhongMaterial({ color: this.diffuseWallColor,
            specular: this.specularWallColor, shininess: this.WallShininess , map: this.wallPaper});

        this.fireplace = new THREE.Mesh( new THREE.BoxGeometry(3, 5, 1), this.wallPaperMaterial );
        this.fireplace.position.y = 2.5;

        this.add(this.fireplace);
    }

}

export {Fireplace};