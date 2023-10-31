import * as THREE from 'three';
import { NURBSSurface } from 'three/addons/curves/NURBSSurface.js';
import { MyNurbsBuilder } from './MyNurbsBuilder.js';

class Primitive {
    constructor(geometryData, material, textPath) {
        this.geometryData = geometryData;
        this.material = new THREE.MeshPhongMaterial({ color: `rgb(${material.color.r}, ${material.color.g}, ${material.color.b})`, specular: `rgb(${material.specular.r}, ${material.specular.g}, ${material.specular.b})`, emissive: `rgb(${material.emissive.r}, ${material.emissive.g}, ${material.emissive.b})`, shininess: material.shininess });
        this.builder = new MyNurbsBuilder();

        if (material.textureref != null) {
            console.log("textPath.filepath: ", textPath.filepath);
            this.material.map = new THREE.TextureLoader().load(textPath.filepath);
        }
    }

    build() {
        switch(this.geometryData.type) {
            case "cylinder":
                this.geometry = new THREE.CylinderGeometry(this.geometryData.top, this.geometryData.base, this.geometryData.height, this.geometryData.slices, this.geometryData.stacks, this.geometryData.capsclose, this.geometryData.thetastart, this.geometryData.thetalength)
                break;
            case "rectangle":
                this.geometry = new THREE.PlaneGeometry(this.geometryData.xy2[0] - this.geometryData.xy1[0], this.geometryData.xy2[1] - this.geometryData.xy1[1], this.geometryData.parts_x, this.geometryData.parts_y)
                break;
            case "nurbs":
                // console.log("NURB: geometryData - ", this.geometryData, " - material: ", this.material, " - textPath: ", this.textPath);

                // // Convert control points to the format expected by THREE.NURBSSurface
                // console.log("this.geometryData.controlpoints: ", this.geometryData.controlpoints);
                // let controlPoints = [   
                //     // U = 0
                //     [ // V = 0..1;
                //         [ 0, 0, -0.125, 1 ],
                //         [ 0.25, 0, 0, 1 ],
                //         [ 0, 0, 0.125, 1 ],
                //     ],
                //     // U = 1
                //     [ // V = 0..1
                //         [ 0, 0.25, -0.125, 1 ],
                //         [ 0.25, 0.25, 0, 1 ],
                //         [ 0,  0.25, 0.125, 1 ]
                //     ],
                //     // U = 2
                //     [ // V = 0..1
                //         [ -0.25, 1, -0.125, 1 ],
                //         [ 0, 1.02, 0, 1 ],
                //         [ -0.25, 1, 0.125, 1 ]
                //     ]
                // ];

                // this.geometry = this.builder.build(
                //     controlPoints,
                //     this.geometryData.degree_u, // U degree
                //     this.geometryData.degree_v, // V degree
                //     this.geometryData.parts_u, 
                //     this.geometryData.parts_v, 
                //     this.material
                // );

                break;
            case "box":
                this.geometry = new THREE.BoxGeometry(this.geometryData.parts_x, this.geometryData.parts_y, this.geometryData.parts_z)
                break;
        }

        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }
}

export { Primitive };