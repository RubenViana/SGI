import * as THREE from 'three';
import { MyNurbsBuilder } from './MyNurbsBuilder.js';

class Jar extends THREE.Object3D {

    constructor() {
        super();

        const map = new THREE.TextureLoader().load( 'textures/jar.jpg' );
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 16;
        map.colorSpace = THREE.SRGBColorSpace;

        this.material = new THREE.MeshLambertMaterial( { map: map,
                        side: THREE.DoubleSide } );

        this.builder = new MyNurbsBuilder()


        this.controlPoints =

        [   // U = 0
            [ // V = 0..4;
                [ 0.5*Math.cos(0), 0.5*Math.sin(0), -1, 1 ],
                [ 0.5*Math.cos(0.125*Math.PI), 0.5*Math.sin(0.125*Math.PI), -1, 1 ],
                [ 0.5*Math.cos(0.25*Math.PI), 0.5*Math.sin(0.25*Math.PI), -1, 1 ],
                [ 0.5*Math.cos(0.375*Math.PI), 0.5*Math.sin(0.375*Math.PI), -1, 1 ],
                [ 0.5*Math.cos(0.5*Math.PI), 0.5*Math.sin(0.5*Math.PI), -1, 1 ],
                [ 0.5*Math.cos(0.625*Math.PI), 0.5*Math.sin(0.625*Math.PI), -1, 1 ],
                [ 0.5*Math.cos(0.75*Math.PI), 0.5*Math.sin(0.75*Math.PI), -1, 1 ],
                [ 0.5*Math.cos(0.875*Math.PI), 0.5*Math.sin(0.875*Math.PI), -1, 1 ],
                [ 0.5*Math.cos(1*Math.PI), 0.5*Math.sin(1*Math.PI), -1, 1 ]
            ],

            // U = 1
            [ // V = 0..4;
                [ 0.10*Math.cos(0), 0.05*Math.sin(0), 0, 1 ],
                [ 0.10*Math.cos(0.125*Math.PI), 0.10*Math.sin(0.125*Math.PI), 0, 1 ],
                [ 0.10*Math.cos(0.25*Math.PI), 0.10*Math.sin(0.25*Math.PI), 0, 1 ],
                [ 0.10*Math.cos(0.375*Math.PI), 0.10*Math.sin(0.375*Math.PI), 0, 1 ],
                [ 0.10*Math.cos(0.5*Math.PI), 0.10*Math.sin(0.5*Math.PI), 0, 1 ],
                [ 0.10*Math.cos(0.625*Math.PI), 0.10*Math.sin(0.625*Math.PI), 0, 1],
                [ 0.10*Math.cos(0.75*Math.PI), 0.10*Math.sin(0.75*Math.PI), 0, 1 ],
                [ 0.10*Math.cos(0.875*Math.PI), 0.10*Math.sin(0.875*Math.PI), 0, 1 ],
                [ 0.10*Math.cos(1*Math.PI), 0.10*Math.sin(1*Math.PI), 0, 1 ]
            ],

            // U = 2
            [ // V = 0..4
                [ Math.cos(0), Math.sin(0), 1, 1 ],
                [ Math.cos(0.125*Math.PI), Math.sin(0.125*Math.PI), 1, 1 ],
                [ Math.cos(0.25*Math.PI), Math.sin(0.25*Math.PI), 1, 1],
                [ Math.cos(0.375*Math.PI), Math.sin(0.375*Math.PI), 1, 1 ],
                [ Math.cos(0.5*Math.PI), Math.sin(0.5*Math.PI), 1, 1 ],
                [ Math.cos(0.625*Math.PI), Math.sin(0.625*Math.PI), 1, 1 ],
                [ Math.cos(0.75*Math.PI), Math.sin(0.75*Math.PI), 1, 1 ],
                [ Math.cos(0.875*Math.PI), Math.sin(0.875*Math.PI), 1, 1 ],
                [ Math.cos(1*Math.PI), Math.sin(1*Math.PI), 1, 1 ]
            ],

            // U = 3
            [ // V = 0..4
                [ 2*Math.cos(0), 2*Math.sin(0), 2, 1 ],
                [ 2*Math.cos(0.125*Math.PI), 2*Math.sin(0.125*Math.PI), 2, 1 ],
                [ 2*Math.cos(0.25*Math.PI), 2*Math.sin(0.25*Math.PI), 2, 1 ],
                [ 2*Math.cos(0.375*Math.PI), 2*Math.sin(0.375*Math.PI), 2, 1 ],
                [ 2*Math.cos(0.5*Math.PI), 2*Math.sin(0.5*Math.PI), 2, 1 ],
                [ 2*Math.cos(0.625*Math.PI), 2*Math.sin(0.625*Math.PI), 2, 1 ],
                [ 2*Math.cos(0.75*Math.PI), 2*Math.sin(0.75*Math.PI), 2, 1 ],
                [ 2*Math.cos(0.875*Math.PI), 2*Math.sin(0.875*Math.PI), 2, 1 ],
                [ 2*Math.cos(1*Math.PI), 2*Math.sin(1*Math.PI), 2, 1 ]
            ],

            // U = 4
            [ // V = 0..4
                [ 0.75*Math.cos(0), 0.75*Math.sin(0), 3, 1 ],
                [ 0.75*Math.cos(0.125*Math.PI), 0.75*Math.sin(0.125*Math.PI), 3, 1 ],
                [ 0.75*Math.cos(0.25*Math.PI), 0.75*Math.sin(0.25*Math.PI), 3, 1 ],
                [ 0.75*Math.cos(0.375*Math.PI), 0.75*Math.sin(0.375*Math.PI), 3, 1 ],
                [ 0.75*Math.cos(0.5*Math.PI), 0.75*Math.sin(0.5*Math.PI), 3, 1 ],
                [ 0.75*Math.cos(0.625*Math.PI), 0.75*Math.sin(0.625*Math.PI), 3, 1 ],
                [ 0.75*Math.cos(0.75*Math.PI), 0.75*Math.sin(0.75*Math.PI), 3, 1 ],
                [ 0.75*Math.cos(0.875*Math.PI), 0.75*Math.sin(0.875*Math.PI), 3, 1 ],
                [ 0.75*Math.cos(1*Math.PI), 0.75*Math.sin(1*Math.PI), 3, 1 ]
            ],
    
        ]

       
        // Two sides of the jar

        const surfaceData = this.builder.build(this.controlPoints, 4, 8, 24, 24, this.material)  
        const surfaceData2 = this.builder.build(this.controlPoints, 4, 8, 24, 24, this.material)

        const mesh = new THREE.Mesh( surfaceData, this.material );
        const mesh2 = new THREE.Mesh( surfaceData2, this.material );
        
        mesh.rotation.x = 0
        mesh.rotation.y = 0
        mesh.rotation.z = 0
        mesh.scale.set( 0.3, 0.3, 0.3 )

        mesh2.rotation.x = 0
        mesh2.rotation.y = 0
        mesh2.rotation.z = Math.PI
        mesh2.scale.set( 0.3, 0.3, 0.3 )

        this.add( mesh, mesh2 )

    }
}

export { Jar };