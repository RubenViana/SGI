import * as THREE from 'three';
import { MyNurbsBuilder } from './MyNurbsBuilder.js';

class MyObjectBuilder{
    constructor(data, material, materialObj, textureObj) {
        this.geometryData = data;
        this.materialData = material;
        this.materialObj = materialObj;
        this.textureObj = textureObj;

        let geometry;
        switch(this.geometryData.subtype) {
            case "rectangle":
                if (this.textureObj != null) {
                    this.textureObj.wrapS = this.textureObj.wrapT = THREE.RepeatWrapping;
                    this.textureObj.repeat.set((this.geometryData.representations[0].xy2[0] - this.geometryData.representations[0].xy1[0]) / this.materialData.texlength_s, (this.geometryData.representations[0].xy2[1] - this.geometryData.representations[0].xy1[1]) / this.materialData.texlength_t);
                    this.materialObj.map = this.textureObj;
                }

                const x = this.geometryData.representations[0].xy2[0] - this.geometryData.representations[0].xy1[0];
                const y = this.geometryData.representations[0].xy2[1] - this.geometryData.representations[0].xy1[1];
                geometry = new THREE.PlaneGeometry(x, y, this.geometryData.representations[0].parts_x ?? 1, this.geometryData.representations[0].parts_y ?? 1);
                
                const xWidth = Math.abs(this.geometryData.representations[0].xy1[0] - this.geometryData.representations[0].xy2[0]);
                const yWidth = Math.abs(this.geometryData.representations[0].xy1[1] - this.geometryData.representations[0].xy2[1]);
                const xMin = Math.min(this.geometryData.representations[0].xy1[0], this.geometryData.representations[0].xy2[0]);
                const yMin = Math.min(this.geometryData.representations[0].xy1[1], this.geometryData.representations[0].xy2[1]);
                geometry.translate(xMin + xWidth / 2, yMin + yWidth / 2, 0);
                break;
            case "cylinder":
                geometry = new THREE.CylinderGeometry(this.geometryData.representations[0].top, this.geometryData.representations[0].base, this.geometryData.representations[0].height, this.geometryData.representations[0].slices, this.geometryData.representations[0].stacks, this.geometryData.representations[0].capsclose, this.geometryData.representations[0].thetastart, this.geometryData.representations[0].thetalength);
                break;
            case "sphere":
                geometry = new THREE.SphereGeometry(this.geometryData.representations[0].radius, this.geometryData.representations[0].slices, this.geometryData.representations[0].stacks, this.geometryData.representations[0].phistart, this.geometryData.representations[0].philength, this.geometryData.representations[0].thetastart, this.geometryData.representations[0].thetalength);
                break;
            case "triangle":
                this.geometry = new THREE.Geometry();
                let x2 = this.geometryData.representations[0].xy2[0] - this.geometryData.representations[0].xy1[0];
                let y2 = this.geometryData.representations[0].xy2[1] - this.geometryData.representations[0].xy1[1];
                let z2 = this.geometryData.representations[0].xy2[2] - this.geometryData.representations[0].xy1[2];
                let triangle = new THREE.Triangle(x2, y2, z2);
                let normal = triangle.normal();
                geometry.vertices.push(triangle.a, triangle.b, triangle.c);
                geometry.faces.push(new THREE.Face3(0, 1, 2, normal));
                break;
            case "nurbs":
                let points = []
                let count_v = 0
                let count_u = 0
                let temp = []
                for (const controlpoint of this.geometryData.representations[0].controlpoints) {
                    temp.push(Object.values(controlpoint).slice(0, -1))
                    count_v++
                    if (count_v == this.geometryData.representations[0].degree_v + 1) {
                        points.push(temp)
                        temp = []
                        count_v = 0
                        count_u++
                    }
                    if (count_u == this.geometryData.representations[0].degree_u + 1) {
                        break
                    }
                }

                const builder = new MyNurbsBuilder();
                geometry = builder.build(points, this.geometryData.representations[0].degree_u, this.geometryData.representations[0].degree_v, this.geometryData.representations[0].parts_u, this.geometryData.representations[0].parts_v)
                break;
            case "box":
                geometry = new THREE.BoxGeometry(this.geometryData.representations[0].xyz2[0] - this.geometryData.representations[0].xyz1[0], this.geometryData.representations[0].xyz2[1] - this.geometryData.representations[0].xyz1[1], this.geometryData.representations[0].xyz2[2] - this.geometryData.representations[0].xyz1[2], this.geometryData.representations[0].parts_x, this.geometryData.representations[0].parts_y, this.geometryData.representations[0].parts_z);
                break;
            case "polygon":
                geometry = this.createPolygonGeometry(this.geometryData.representations[0].stacks, this.geometryData.representations[0].slices, this.geometryData.representations[0].radius, this.geometryData.representations[0].color_c, this.geometryData.representations[0].color_p);
                break;
            default:
                console.error("Unknown primitive type: ", this.geometryData.subtype);
                break;
        }

        // texture common properties
        if (this.textureObj != null) {
            this.materialObj.map = this.textureObj;
            // this.materialObj.wireframe = true;
        }

        return new THREE.Mesh(geometry, this.materialObj);
    }

    // Function to create the polygon geometry

    interpolate(start, end, percentage) {
        return start + (end - start) * percentage;
    }

    interpolateColor(startColor, endColor, percentage) {
        let color = [
            this.interpolate(startColor.r, endColor.r, percentage),
            this.interpolate(startColor.g, endColor.g, percentage),
            this.interpolate(startColor.b, endColor.b, percentage)
        ];

        return color;
    }

    createPolygonGeometry(stacks, slices, radius, color_c, color_p) {
        this.radius = radius;
        this.color_c = new THREE.Color(color_c.r, color_c.g, color_c.b);
        this.color_p = new THREE.Color(color_p.r, color_p.g, color_p.b);
        this.stacks = stacks;
        this.slices = slices;

        this.materialObj.vertexColors = true;

        let geometry = new THREE.BufferGeometry();
        let points = [0, 0, 0];
        let normals = [0, 0, 1];
        let colors = [this.color_c[0], this.color_c[1], this.color_c[2]];
        let indexes = [];
        let uvCenterU = 0.5;
        let uvCenterV = 0.5;
        let uvRadius = 0.5;
        const uvs = [uvCenterU, uvCenterV];

        let stackPercentage = 1 / this.stacks;
        const stackRadius = this.radius / this.stacks;
        let stackColor = this.interpolateColor(this.color_c, this.color_p, stackPercentage);

        // Cycle for the 1st stack
        for (let currentSliceIndex = 0; currentSliceIndex < this.slices; currentSliceIndex++) {
            const angle = (currentSliceIndex / this.slices) * (2 * Math.PI);
            const x = stackRadius * Math.cos(angle);
            const y = stackRadius * Math.sin(angle);
            points.push(x, y, 0);
            normals.push(0, 0, 1);
            
            const currentSliceIdx = 1 + (currentSliceIndex % this.slices);
            const nextSliceIdx = 1 + ((currentSliceIndex + 1) % this.slices);
            indexes.push(0, currentSliceIdx, nextSliceIdx);
            colors.push(...stackColor);
            uvs.push(uvCenterU + uvRadius * stackPercentage * Math.cos(angle), 
                     uvCenterV + uvRadius * stackPercentage * Math.sin(angle));
        }

        for (let currentStackIndex = 1; currentStackIndex < this.stacks; currentStackIndex++) {
            let currentRadius = (currentStackIndex + 1) * stackRadius;
            stackPercentage = (1 + currentStackIndex) / this.stacks;
            stackColor = this.interpolateColor(this.color_c, this.color_p, stackPercentage);

            for (let currentSliceIndex = 0; currentSliceIndex < this.slices; currentSliceIndex++) {
                const angle = (currentSliceIndex / this.slices) * (2 * Math.PI);
                const x = currentRadius * Math.cos(angle);
                const y = currentRadius * Math.sin(angle);

                points.push(x, y, 0);
                normals.push(0, 0, 1);
                colors.push(...stackColor);
                
                const currentSlicePreviousStackIdx = 1 + ((currentStackIndex - 1) * this.slices) + (currentSliceIndex % this.slices);
                const nextSlicePreviousStackIdx = 1 + ((currentStackIndex - 1) * this.slices) + ((currentSliceIndex + 1) % this.slices);

                const currentSliceIdx = 1 + (currentStackIndex * this.slices) + (currentSliceIndex % this.slices);
                const nextSliceIdx = 1 + (currentStackIndex * this.slices) + ((currentSliceIndex + 1) % this.slices);

                indexes.push(currentSliceIdx, nextSliceIdx, nextSlicePreviousStackIdx);
                indexes.push(currentSliceIdx, nextSlicePreviousStackIdx, currentSlicePreviousStackIdx);
                uvs.push(uvCenterU + uvRadius * stackPercentage * Math.cos(angle),
                         uvCenterU + uvRadius * stackPercentage * Math.sin(angle));
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3));
        geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
        geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indexes), 1));
        geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));

        return geometry;
    }

}

export { MyObjectBuilder };