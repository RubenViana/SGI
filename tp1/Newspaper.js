import * as THREE from 'three';
import { MyNurbsBuilder } from './MyNurbsBuilder.js';

class Newspaper extends THREE.Object3D {

    constructor() {
        super();

        const map = new THREE.TextureLoader().load( 'textures/ronaldoNews.jpeg' );
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 16;
        map.colorSpace = THREE.SRGBColorSpace;

        this.material = new THREE.MeshLambertMaterial( { map: map,
                        side: THREE.DoubleSide } );

        this.builder = new MyNurbsBuilder()

        this.controlPoints =

        [   // U = 0
            [ // V = 0..1;
                [ -0.25, -0.5, 0.0, 1 ],
                [ -0.25,  0.5, 0.0, 1 ]
            ],

            // U = 1
            [ // V = 0..1
                [ 0, -0.5, -0.15, 1 ],
                [ 0,  0.5, -0.15, 1 ]
            ],

            // U = 2
            [ // V = 0..1
                [ 0.25, -0.5, 0.0, 1 ],
                [ 0.25,  0.5, 0.0, 1 ]
            ]
    
        ]

       

        const surfaceData = this.builder.build(this.controlPoints, 2, 1, 24, 24, this.material)  

        const mesh = new THREE.Mesh( surfaceData, this.material );
        
        mesh.rotation.x = 0
        mesh.rotation.y = 0
        mesh.rotation.z = 0
        mesh.scale.set( 0.7, 0.7, 0.7 )

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.add( mesh )

    }
}

export { Newspaper };