import * as THREE from 'three';
import { MyAxis } from './MyAxis.js';
import { MyFileReader } from './parser/MyFileReader.js';
import { Primitive } from './Primitive.js';

class MyScene  {
    constructor(data) {
        this.data = data;
        this.nodes = Object.values(data.nodes);	
        this.mesh = new THREE.Group();
        this.lastMaterialSeen = null;
    }

    visit(node, parentMaterial) {
        switch(node.type) {
            case "node":
                console.log("\n\n---------- NODE " + node.id + " --------");
                console.log("node: ", node);
                let meshGroup = new THREE.Group();
                
                let pmaterial = parentMaterial;
                if (node.materialIds.length > 0) {
                    pmaterial = node.materialIds[0];
                    this.lastMaterialSeen = pmaterial;
                    console.log("parentMaterial: ", parentMaterial);
                }

                node.children.forEach(child => {
                    console.log("child: ", child);
                    meshGroup.add(this.visit(child, this.lastMaterialSeen));
                });

                node.transformations.forEach((transformation) => {
                    switch(transformation.type) {
                        case "S":
                            meshGroup.scale.set(transformation.scale[0], transformation.scale[1], transformation.scale[2]);
                            break;
                        case "T":
                            meshGroup.position.x += transformation.translate[0];
                            meshGroup.position.y += transformation.translate[1];
                            meshGroup.position.z += transformation.translate[2];

                            break;
                        case "R":
                            meshGroup.rotateX(transformation.rotation[0] * (Math.PI / 180));
                            meshGroup.rotateY(transformation.rotation[1] * (Math.PI / 180));
                            meshGroup.rotateZ(transformation.rotation[2] * (Math.PI / 180));
                            break;
                    }
                });

                return meshGroup;
            case "primitive":
                console.log("------- PRIMITVE ", node.subtype, " -------");
                console.log("node: ", node);
                let representations = node.representations[0];
                representations.type = node.subtype;

                var material = null;
                console.log("parentMaterial: ", parentMaterial);
                console.log("this.data.materials: ", this.data.materials);
                console.log("this.lastMaterialSeen: ", this.lastMaterialSeen);
                material = this.data.materials[this.lastMaterialSeen];
                
                console.log("material: ", material);

                let primitive = new Primitive(representations, material, this.data.textures[material.textureref]);
                primitive.build();

                return primitive.mesh;
            case "pointlight":
                const pointlight = new THREE.PointLight(new THREE.Color(node.color.r, node.color.g, node.color.b));
                pointlight.distance = node.distance;
                pointlight.decay = node.decay;
                pointlight.castShadow = node.castshadow;
                pointlight.position.set(node.position[0], node.position[1], node.position[2]);
                const pointlightHelper = new THREE.PointLightHelper(pointlight, 0.1);
                this.mesh.add(pointlightHelper);
                return pointlight;
            case "spotlight":
                const spotlight = new THREE.SpotLight(new THREE.Color(node.color.r, node.color.g, node.color.b));
                spotlight.intensity = node.intensity;
                spotlight.distance = node.distance;
                spotlight.decay = node.decay;
                spotlight.castShadow = node.castshadow;
                spotlight.position.set(node.position[0], node.position[1], node.position[2]);
                spotlight.target.position.set(node.target[0], node.target[1], node.target[2]);
                spotlight.penumbra = node.penumbra;
                spotlight.angle = node.angle;
                const spotlightHelper = new THREE.SpotLightHelper(spotlight, 0.1);
                this.mesh.add(spotlightHelper);
                return spotlight;
            case "directionallight":
                const directionallight = new THREE.DirectionalLight(`#${node.color}`, node.intensity);
                directionallight.position.set(node.position[0], node.position[1], node.position[2]);
                directionallight.castShadow = node.castShadow;
                directionallight.shadow.left = node.shadowleft;
                directionallight.shadow.right = node.shadowright;
                directionallight.shadow.bottom = node.shadowbottom;
                directionallight.shadow.top = node.shadowtop;
                directionallight.shadow.far = node.shadowfar;
                directionallight.shadow.mapSize.width = node.shadowmapsize;
                directionallight.shadow.mapSize.height = node.shadowmapsize;
                const directionallightHelper = new THREE.DirectionalLightHelper(directionallight, 0.1);
                this.mesh.add(directionallightHelper);
                return directionallight;
        }
    }
}

export { MyScene };