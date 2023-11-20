import * as THREE from 'three';
import { MyObjectBuilder } from './MyObjectBuilder.js';

// Class definition for a 3D graph
class MyGraph {
    // Constructor to initialize the graph with data
    constructor(data) {
        this.data = data; // The input data for the graph
        this.nodes = new Map(); // Map to store nodes for reuse
        this.materials = new Map(); // Map to store materials for reuse
        this.textures = new Map(); // Map to store textures for reuse
        this.group = new THREE.Group(); // Three.js group to hold the 3D objects

        // Initialize textures and materials
        this.initTextures();
        this.initMaterials();
    }

    // Method to build the 3D graph
    build() {
        const root = this.data.getNode(this.data.rootId); // Get the root node from the data
        if (root) {
            this.group = this.visit(root); // Start visiting nodes from the root
            return this.group; // Return the completed group
        } else {
            console.error("Root node not found!"); // Log an error if the root node is not found
        }
    }

    // Recursive method to visit nodes and build the 3D scene
    visit(node) {
        // If the node has already been visited, return a clone
        if (this.nodes.has(node.id)) {
            return this.nodes.get(node.id).clone();
        }

        // If the node is undefined, create a new empty object
        if (node == undefined) {
            console.warn("node is undefined");
            return new THREE.Object3D();
        }

        // Create a new Three.js group to hold objects for the current node
        const nodeGroup = new THREE.Group();

        // Iterate through the children of the node and process each
        for (let childData of node.children) {
            let child;

            // Handle default shadow properties if not specified in the child data
            if (childData.castshadows == null || childData.receiveshadows == null) {
                childData.receiveShadows = node.receiveShadows ?? false;
                childData.castShadows = node.castShadows ?? false;
            }

            // Based on the type of child, create the appropriate object
            switch (childData.type) {
                case "node":
                    // If the child is a node, recursively visit the child
                    if (childData.materialIds.length === 0) {
                        childData.materialIds = node.materialIds;
                    }
                    child = this.visit(childData);
                    break;
                case "primitive":
                    // If the child is a primitive, create an object using a custom builder
                    const materialData = this.data.getMaterial(node.materialIds[0]);
                    const materialObj = this.materials.get(node.materialIds[0]);
                    const textureObj = this.textures.get(materialData.textureref ?? null);
                    child = new MyObjectBuilder(childData, materialData, materialObj, textureObj);

                    // Set shadow properties for the child
                    child.castShadow = childData.castShadows;
                    child.receiveShadow = childData.receiveShadows;
                    break;
                // Handle different types of lights
                case "spotlight":
                case "pointlight":
                case "directionallight":
                    child = this.light(childData);
                    break;
                case "lod":
                    // Handle Level of Detail (LOD) nodes
                    let lod = new THREE.LOD();
                    for (let i = 0; i < childData.children.length; i++) {
                        let child_ = childData.children[i];
                        if (child_.type === "lodnoderef") {
                            if (child_.node.materialIds.length === 0) {
                                child_.node.materialIds = node.materialIds;
                            }
                            let childMesh = this.visit([child_.node]);
                            lod.addLevel(childMesh, child_.mindist);
                        }
                    }
                    child = lod;
                    break;
                case "model3d":
                    // TODO: implement model3d
                    break;
                default:
                    console.error("Unknown node type: ", childData.type);
                    break;
            }

            // Add the child to the current node group and store it in the map
            if (child !== undefined) {
                nodeGroup.add(child);
                this.nodes.set(childData.id, child);
            }
        }

        // Apply transformations to the node group based on the node's transformation data
        node.transformations.forEach((transformation) => {
            switch (transformation.type) {
                case "T":
                    nodeGroup.translateX(transformation.translate[0])
                    nodeGroup.translateY(transformation.translate[1])
                    nodeGroup.translateZ(transformation.translate[2])
                    break;
                case "R":
                    nodeGroup.rotateX(transformation.rotation[0] * (Math.PI / 180))
                    nodeGroup.rotateY(transformation.rotation[1] * (Math.PI / 180))
                    nodeGroup.rotateZ(transformation.rotation[2] * (Math.PI / 180))
                    break;
                case "S":
                    nodeGroup.scale.set(transformation.scale[0], transformation.scale[1], transformation.scale[2])
                    break;
                default:
                    console.warn("unknown transformation type: " + transformation.type)
                    break;
            }
        });

        // Return the constructed node group
        return nodeGroup;
    }

    // Method to create a light based on the provided light data
    light(lightData) {
        let light;
        switch (lightData.type) {
            case "spotlight":
                // Create a spotlight
                light = new THREE.SpotLight(lightData.color)
                const target = new THREE.Object3D();
                target.position.set(...lightData.target);
                light.angle = lightData.angle;
                light.penumbra = lightData.penumbra;
                light.position.set(lightData.position[0], lightData.position[1], lightData.position[2]);
                light.visible = lightData.enabled ?? true;
                light.intensity = lightData.intensity ?? 1.0;
                light.distance = lightData.distance ?? 1000;
                light.decay = lightData.decay ?? 2.0;
                light.castShadow = lightData.castShadows;
                light.shadow.camera.far = lightData.shadowfar ?? 500.0;
                light.shadow.mapSize = new THREE.Vector2(lightData.shadowmapsize, lightData.shadowmapsize);
                const helper = new THREE.SpotLightHelper(light);
                light.add(helper);
                light.target = target;
                break;
            case "pointlight":
                // Create a point light
                light = new THREE.PointLight()
                light.color = new THREE.Color(lightData.color);
                light.position.set(lightData.position[0], lightData.position[1], lightData.position[2]);
                light.visible = lightData.enabled ?? true;
                light.intensity = lightData.intensity ?? 1.0;
                light.distance = lightData.distance ?? 1000;
                light.decay = lightData.decay ?? 2.0;
                light.castShadow = lightData.castShadows;
                light.shadow.camera.far = lightData.shadowfar ?? 500.0;
                light.shadow.mapSize = new THREE.Vector2(lightData.shadowmapsize, lightData.shadowmapsize) ?? Vector2(512, 512);
                const pointLightHelper = new THREE.PointLightHelper(light);
                light.add(pointLightHelper)
                break;
            case "directionallight":
                // Create a directional light
                light = new THREE.DirectionalLight(lightData.color);
                light.shadow.camera.left = lightData.shadowleft ?? -5;
                light.shadow.camera.right = lightData.shadowright ?? -5;
                light.shadow.camera.bottom = lightData.shadowbottom ?? -5;
                light.shadow.camera.top = lightData.shadowtop ?? -5;
                light.position.set(lightData.position[0], lightData.position[1], lightData.position[2]);
                light.visible = lightData.enabled ?? true;
                light.intensity = lightData.intensity ?? 1.0;
                light.distance = lightData.distance ?? 1000;
                light.decay = lightData.decay ?? 2.0;
                light.castShadow = lightData.castShadows;
                light.shadow.camera.far = lightData.shadowfar ?? 500.0;
                light.shadowbottom = lightData.shadowbottom ?? -5;
                light.shadowleft = lightData.shadowleft ?? -5;
                light.shadowright = lightData.shadowright ?? 5;
                light.shadowtop = lightData.shadowtop ?? 5;
                light.shadow.mapSize = new THREE.Vector2(lightData.shadowmapsize, lightData.shadowmapsize);
                const directionalLightHelper = new THREE.DirectionalLightHelper(light);
                light.add(directionalLightHelper)
                break;
        }

        return light;
    }

    // Method to initialize textures based on data
    initTextures() {
        for (let key in this.data.textures) {
            let texture = this.data.textures[key];
            let textureObject;

            // Check if the texture is a video texture
            if (texture.isVideo) {
                let video = document.getElementById('video');
                video.src = texture.filepath;
                textureObject = new THREE.VideoTexture(video);
            } else {
                textureObject = new THREE.TextureLoader().load(texture.filepath);
            }

            // Set texture properties based on data
            textureObject.magFilter = texture.magFilter == "NearestFilter" ? THREE.NearestFilter : THREE.LinearFilter;
            switch (texture.minFilter) {
                case "NearestFilter":
                    textureObject.minFilter = THREE.NearestFilter;
                    break;
                case "LinearFilter":
                    textureObject.minFilter = THREE.LinearFilter;
                    break;
                // Additional cases for different minFilter options
            }
            textureObject.anisotropy = texture.anisotropy;

            textureObject.generateMipmaps = false;

            if (texture.mipmaps) {
                let mipmapArray = [
                    texture?.mipmap0, texture?.mipmap1, texture?.mipmap2, texture?.mipmap3,
                    texture?.mipmap4, texture?.mipmap5, texture?.mipmap6, texture?.mipmap7
                ];

                for (let i = 0; i < mipmapArray.length; i++) {
                    if (mipmapArray[i]) {
                        // Load mipmap images and set them in the textureObject
                        new THREE.TextureLoader().load(
                            mipmapArray[i],
                            function (mipmapTex) {
                                const canvas = document.createElement('canvas');
                                const context = canvas.getContext('2d');
                                context.scale(1, 1);

                                const img = mipmapTex.image;
                                canvas.width = img.width;
                                canvas.height = img.height;

                                context.drawImage(img, 0, 0);

                                textureObject.mipmaps[i] = canvas;
                            },
                            undefined,
                            function (error) {
                                console.error(error);
                            }
                        );
                    }
                }
            }

            // Add the textureObject to the textures map
            this.textures.set(texture.id, textureObject);
        }
    }

    // Method to initialize materials based on data
    initMaterials() {
        for (let key in this.data.materials) {
            let material = this.data.materials[key];
            let materialObject = new THREE.MeshPhongMaterial();

            // Set material properties based on data
            materialObject.color = new THREE.Color(material.color.r, material.color.g, material.color.b);
            materialObject.specular = new THREE.Color(material.specular.r, material.specular.g, material.specular.b);
            materialObject.emissive = new THREE.Color(material.emissive.r, material.emissive.g, material.emissive.b);
            materialObject.shininess = material.shininess;
            materialObject.wireframe = material.wireframe ?? false;

            if (material.shading === "flat") {
                materialObject.flatShading = true;
            } else if (material.shading === "smoooth" || material.shading === "none") {
                materialObject.flatShading = false;
            }

            if (material.textureref != null) {
                let materialTextureref = this.textures.get(material.textureref);
                materialTextureref.wrapS = materialTextureref.wrapT = THREE.RepeatWrapping;
            }

            materialObject.side = material.twosided ? THREE.DoubleSide : THREE.FrontSide;
            materialObject.map = this.textures.get(material.textureref ?? null);
            materialObject.bumpMap = this.textures.get(material.bumpref) ?? null;
            materialObject.bumpScale = material.bumpscale ?? 1.0;
            materialObject.specularMap = this.textures.get(material.specularref) ?? null;

            // Add the materialObject to the materials map
            this.materials.set(material.id, materialObject);
        }
    }

    // Method to load an image and create a mipmap for a texture at the specified level
    loadMipmap(parentTexture, level, path) {
        // Load texture. On loaded, create the mipmap for the specified level
        new THREE.TextureLoader().load(path,
            function (mipmapTexture) // onLoad callback
            {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                ctx.scale(1, 1);

                const img = mipmapTexture.image
                canvas.width = img.width;
                canvas.height = img.height

                // Draw the image on the canvas
                ctx.drawImage(img, 0, 0)

                // Set the mipmap image in the parent texture at the appropriate level
                parentTexture.mipmaps[level] = canvas
            },
            undefined, // onProgress callback currently not supported
            function (err) {
                console.error('Unable to load the image ' + path + ' as mipmap level ' + level + ".", err)
            }
        )
    }

    /**
     * load an image and create a mipmap to be added to a texture at the defined level.
     * In between, add the image some text and control squares. These items become part of the picture
     * 
     * @param {*} parentTexture the texture to which the mipmap is added
     * @param {*} level the level of the mipmap
     * @param {*} path the path for the mipmap image
    // * @param {*} size if size not null inscribe the value in the mipmap. null by default
    // * @param {*} color a color to be used for demo
     */
    loadMipmap(parentTexture, level, path)
    {
        // load texture. On loaded call the function to create the mipmap for the specified level 
        new THREE.TextureLoader().load(path, 
            function(mipmapTexture)  // onLoad callback
            {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                ctx.scale(1, 1);
                
                // const fontSize = 48
                const img = mipmapTexture.image         
                canvas.width = img.width;
                canvas.height = img.height

                // first draw the image
                ctx.drawImage(img, 0, 0 )
                             
                // set the mipmap image in the parent texture in the appropriate level
                parentTexture.mipmaps[level] = canvas
            },
            undefined, // onProgress callback currently not supported
            function(err) {
                console.error('Unable to load the image ' + path + ' as mipmap level ' + level + ".", err)
            }
        )
    }
}

export { MyGraph };