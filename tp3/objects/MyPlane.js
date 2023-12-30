import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';
import { MyLimiters } from "./MyLimiters.js";

class MyPlane extends THREE.Object3D {

    constructor() {
        super();

        // Texture plane
        this.planeTexture = new THREE.TextureLoader().load('./objects/textures/plane.png');
        this.planeTexture.wrapS = THREE.RepeatWrapping;
        this.planeTexture.wrapT = THREE.RepeatWrapping;
        this.planeTexture.colorSpace = THREE.SRGBColorSpace;

        // Material plane (box)
        this.planeWidth = 2000;
        this.planeHeight = 2000;
        this.planeDepth = 1;
        this.planeMaterial = new THREE.MeshPhongMaterial({map: this.planeTexture });
        this.planeMaterial.map.repeat.set(500, 500);

        // Plane
        this.planeGeometry = new THREE.BoxGeometry(this.planeWidth, this.planeHeight, this.planeDepth);
        this.planeGeometry.userData.obb = new OBB();
        this.planeGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.planeWidth / 2, this.planeHeight / 2, this.planeDepth / 2));
        this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
        this.plane.position.set(500, 0, 400);
        this.plane.rotation.x = -Math.PI / 2;
        this.plane.userData.obb = new OBB();
        this.plane.updateMatrix();
        this.plane.updateMatrixWorld();
        this.plane.userData.obb.copy(this.planeGeometry.userData.obb);
        this.plane.userData.obb.applyMatrix4(this.plane.matrixWorld);

        // Texture goal
        this.goalTexture = new THREE.TextureLoader().load('./objects/textures/goal.png');
        this.goalTexture.wrapS = THREE.RepeatWrapping;
        this.goalTexture.wrapT = THREE.RepeatWrapping;
        this.goalTexture.colorSpace = THREE.SRGBColorSpace;
        this.goalTexture.repeat.set(2, 1);

        // Material goal (box)
        this.goalWidth = 50;
        this.goalHeight = 3;
        this.goalDepth = 0.1;
        this.goalMaterial = new THREE.MeshPhongMaterial({map: this.goalTexture });

        // Goal
        this.goalGeometry = new THREE.BoxGeometry(this.goalWidth, this.goalHeight, this.goalDepth);
        this.goalGeometry.userData.obb = new OBB();
        this.goalGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.goalWidth / 2, this.goalHeight / 2, this.goalDepth / 2));
        this.goal = new THREE.Mesh(this.goalGeometry, this.goalMaterial);
        this.goal.position.set(14, 12, 300);
        this.goal.userData.obb = new OBB();
        this.goal.updateMatrix();
        this.goal.updateMatrixWorld();
        this.goal.userData.obb.copy(this.goalGeometry.userData.obb);
        this.goal.userData.obb.applyMatrix4(this.goal.matrixWorld);


        // Texture goal post
        this.goalPostTexture = new THREE.TextureLoader().load('./objects/textures/post.png');
        this.goalPostTexture.wrapS = THREE.RepeatWrapping;
        this.goalPostTexture.wrapT = THREE.RepeatWrapping;
        this.goalPostTexture.colorSpace = THREE.SRGBColorSpace;

        // Material goal post (Cylinder)
        this.goalPostRadiusTop = 0.3;
        this.goalPostRadiusBottom = 0.3;
        this.goalPostHeight = 11;
        this.goalPostRadialSegments = 32;
        this.goalPostMaterial = new THREE.MeshPhongMaterial({map: this.goalPostTexture });

        // Goal post
        this.goalPostGeometry = new THREE.CylinderGeometry(this.goalPostRadiusTop, this.goalPostRadiusBottom, this.goalPostHeight, this.goalPostRadialSegments);
        this.goalPostGeometry.userData.obb = new OBB();
        this.goalPostGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.goalPostRadiusTop / 2, this.goalPostHeight / 2, this.goalPostRadiusBottom / 2));
        this.goalPostLeft = new THREE.Mesh(this.goalPostGeometry, this.goalPostMaterial);
        this.goalPostLeft.position.set(-7, 5, 300);
        this.goalPostLeft.userData.obb = new OBB();
        this.goalPostLeft.updateMatrix();
        this.goalPostLeft.updateMatrixWorld();
        this.goalPostLeft.userData.obb.copy(this.goalPostGeometry.userData.obb);
        this.goalPostLeft.userData.obb.applyMatrix4(this.goalPostLeft.matrixWorld);

        this.goalPostRight = new THREE.Mesh(this.goalPostGeometry, this.goalPostMaterial);
        this.goalPostRight.position.set(35, 5, 300);
        this.goalPostRight.userData.obb = new OBB();
        this.goalPostRight.updateMatrix();
        this.goalPostRight.updateMatrixWorld();
        this.goalPostRight.userData.obb.copy(this.goalPostGeometry.userData.obb);
        this.goalPostRight.userData.obb.applyMatrix4(this.goalPostRight.matrixWorld);

        // Texture wall
        this.wallTexture = new THREE.TextureLoader().load('./objects/textures/wall.png');
        this.wallTexture.wrapS = THREE.RepeatWrapping;
        this.wallTexture.wrapT = THREE.RepeatWrapping;
        this.wallTexture.colorSpace = THREE.SRGBColorSpace;
        this.wallTexture.repeat.set(30, 1);

        // PitStop Separator (Box)
        this.separatorWidth = 3;
        this.separatorHeight = 5;
        this.separatorDepth = 400;
        this.separatorMaterial = new THREE.MeshPhongMaterial({ map: this.wallTexture });

        this.separatorGeometry = new THREE.BoxGeometry(this.separatorWidth, this.separatorHeight, this.separatorDepth);
        this.separatorGeometry.userData.obb = new OBB();
        this.separatorGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.separatorWidth / 2, this.separatorHeight / 2, this.separatorDepth / 2));

        this.separator = new THREE.Mesh(this.separatorGeometry, this.separatorMaterial);
        this.separator.position.set(50, 2.5, 300);
        this.separator.rotation.y = Math.PI/60;
        this.separator.userData.obb = new OBB();
        this.separator.updateMatrix();
        this.separator.updateMatrixWorld();
        this.separator.userData.obb.copy(this.separatorGeometry.userData.obb);
        this.separator.userData.obb.applyMatrix4(this.separator.matrixWorld);

        // Texture road
        this.roadTexture = new THREE.TextureLoader().load('./objects/textures/pitRoad.png');
        this.roadTexture.wrapS = THREE.RepeatWrapping;
        this.roadTexture.wrapT = THREE.RepeatWrapping;
        this.roadTexture.colorSpace = THREE.SRGBColorSpace;
        this.roadTexture.repeat.set(1, 30);

        // PitStop Road (Box)
        this.roadWidth = 9;
        this.roadHeight = 1.1;
        this.roadDepth = 550;
        this.roadMaterial = new THREE.MeshPhongMaterial({ map: this.roadTexture });

        this.roadGeometry = new THREE.BoxGeometry(this.roadWidth, this.roadHeight, this.roadDepth);
        this.roadGeometry.userData.obb = new OBB();
        this.roadGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.roadWidth / 2, (this.roadHeight- 0.1) / 2, this.roadDepth / 2));
        this.road = new THREE.Mesh(this.roadGeometry, this.roadMaterial);
        this.road.position.set(58, 0, 300);
        this.road.rotation.y = Math.PI/60;
        this.road.userData.obb = new OBB();
        this.road.updateMatrix();
        this.road.updateMatrixWorld();
        this.road.userData.obb.copy(this.roadGeometry.userData.obb);
        this.road.userData.obb.applyMatrix4(this.road.matrixWorld);

        // PitStop/Garage Left and Right Wall (Box)
        this.wallWidth = 8;
        this.wallHeight = 19;
        this.wallDepth = 10;
        this.wallMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

        this.wallGeometry = new THREE.BoxGeometry(this.wallWidth, this.wallHeight, this.wallDepth);
        this.wallGeometry.userData.obb = new OBB();
        this.wallGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.wallWidth / 2, this.wallHeight / 2, this.wallDepth / 2));
        this.wallLeft = new THREE.Mesh(this.wallGeometry, this.wallMaterial);
        this.wallLeft.position.set(74.5, 4, 265.5);
        this.wallLeft.rotation.y = Math.PI/60;
        this.wallLeft.rotation.z = Math.PI/2;
        this.wallLeft.userData.obb = new OBB();
        this.wallLeft.updateMatrix();
        this.wallLeft.updateMatrixWorld();
        this.wallLeft.userData.obb.copy(this.wallGeometry.userData.obb);
        this.wallLeft.userData.obb.applyMatrix4(this.wallLeft.matrixWorld);
        this.wallRight = new THREE.Mesh(this.wallGeometry, this.wallMaterial);
        this.wallRight.position.set(85.5, 4, 474.5);
        this.wallRight.rotation.y = Math.PI/60;
        this.wallRight.rotation.z = Math.PI/2;
        this.wallRight.userData.obb = new OBB();
        this.wallRight.updateMatrix();
        this.wallRight.updateMatrixWorld();
        this.wallRight.userData.obb.copy(this.wallGeometry.userData.obb);
        this.wallRight.userData.obb.applyMatrix4(this.wallRight.matrixWorld);

        //PitStop Top Wall (Box)
        this.wallTopWidth = 4;
        this.wallTopHeight = 20;
        this.wallTopDepth = 220;
        this.wallTopMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

        this.wallTopGeometry = new THREE.BoxGeometry(this.wallTopWidth, this.wallTopHeight, this.wallTopDepth);
        this.wallTopGeometry.userData.obb = new OBB();
        this.wallTopGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.wallTopWidth / 2, this.wallTopHeight / 2, this.wallTopDepth / 2));
        this.wallTop = new THREE.Mesh(this.wallTopGeometry, this.wallTopMaterial);
        this.wallTop.position.set(80, 10, 370);
        this.wallTop.rotation.y = Math.PI/60;
        this.wallTop.rotation.z = Math.PI/2;
        this.wallTop.userData.obb = new OBB();
        this.wallTop.updateMatrix();
        this.wallTop.updateMatrixWorld();
        this.wallTop.userData.obb.copy(this.wallTopGeometry.userData.obb);
        this.wallTop.userData.obb.applyMatrix4(this.wallTop.matrixWorld);

        //PitStop Back Wall (Box)
        this.wallBackWidth = 4;
        this.wallBackHeight = 10;
        this.wallBackDepth = 210;
        this.wallBackMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

        this.wallBackGeometry = new THREE.BoxGeometry(this.wallBackWidth, this.wallBackHeight, this.wallBackDepth);
        this.wallBackGeometry.userData.obb = new OBB();
        this.wallBackGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.wallBackWidth / 2, this.wallBackHeight / 2, this.wallBackDepth / 2));
        this.wallBack = new THREE.Mesh(this.wallBackGeometry, this.wallBackMaterial);
        this.wallBack.position.set(87.5, 5, 370);
        this.wallBack.rotation.y = Math.PI/60;
        this.wallBack.userData.obb = new OBB();
        this.wallBack.updateMatrix();
        this.wallBack.updateMatrixWorld();
        this.wallBack.userData.obb.copy(this.wallBackGeometry.userData.obb);
        this.wallBack.userData.obb.applyMatrix4(this.wallBack.matrixWorld);

        // Texture pillar
        this.pillarTexture = new THREE.TextureLoader().load('./objects/textures/pillar.png');
        this.pillarTexture.wrapS = THREE.RepeatWrapping;
        this.pillarTexture.wrapT = THREE.RepeatWrapping;
        this.pillarTexture.colorSpace = THREE.SRGBColorSpace;

        // PitStop Pillar (Box)
        this.pillarWidth = 18;
        this.pillarHeight = 8;
        this.pillarDepth = 1;
        this.pillarMaterial = new THREE.MeshPhongMaterial({ map: this.pillarTexture });

        this.pillarGeometry = new THREE.BoxGeometry(this.pillarWidth, this.pillarHeight, this.pillarDepth);
        this.pillarGeometry.userData.obb = new OBB();
        this.pillarGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.pillarWidth / 2, this.pillarHeight / 2, this.pillarDepth / 2));
        const totalPillars = 19; 
        const startXpillars = 75;
        const startZpillars = 280.5;
        const gapXpillars = 0.5;
        const gapZpillars = 10;

        for (let i = 0; i < totalPillars; i++) {
            const currentZ = startZpillars + i * gapZpillars;
            const currentX = startXpillars + i * gapXpillars;
            const pillar = new THREE.Mesh(this.pillarGeometry, this.pillarMaterial);
            pillar.position.set(currentX, 4, currentZ);
            pillar.rotation.y = Math.PI / 60;
            pillar.userData.obb = new OBB();
            pillar.updateMatrix();
            pillar.updateMatrixWorld();
            pillar.userData.obb.copy(this.pillarGeometry.userData.obb);
            pillar.userData.obb.applyMatrix4(pillar.matrixWorld);
            this[`pillar${i}`] = pillar;
        }

        // Texture lake
        this.lakeTexture = new THREE.TextureLoader().load('./objects/textures/lake.png');
        this.lakeTexture.wrapS = THREE.RepeatWrapping;
        this.lakeTexture.wrapT = THREE.RepeatWrapping;
        this.lakeTexture.colorSpace = THREE.SRGBColorSpace;
        this.lakeTexture.repeat.set(50, 50);

        // Lake Bottom (Circle)
        this.lakeRadius = 50;
        this.lakeSegments = 32;
        this.lakeMaterial = new THREE.MeshPhongMaterial({ map: this.lakeTexture });

        this.lakeGeometry = new THREE.CircleGeometry(this.lakeRadius, this.lakeSegments);
        this.lakeGeometry.userData.obb = new OBB();
        this.lakeGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.lakeRadius / 2, 0.6 / 2, this.lakeRadius / 2));
        this.lake = new THREE.Mesh(this.lakeGeometry, this.lakeMaterial);
        this.lake.position.set(480, 0.6, 450);
        this.lake.rotation.x = -Math.PI / 2;
        this.lake.userData.obb = new OBB();
        this.lake.updateMatrix();
        this.lake.updateMatrixWorld();
        this.lake.userData.obb.copy(this.lakeGeometry.userData.obb);
        this.lake.userData.obb.applyMatrix4(this.lake.matrixWorld);

        // Lake Top (Circle)
        this.lakeTopRadius = 40;
        this.lakeTopSegments = 32;
        this.lakeTopMaterial = new THREE.MeshPhongMaterial({ map: this.lakeTexture });

        this.lakeTopGeometry = new THREE.CircleGeometry(this.lakeTopRadius, this.lakeTopSegments);
        this.lakeTopGeometry.userData.obb = new OBB();
        this.lakeTopGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.lakeTopRadius / 2, 0.6 / 2, this.lakeTopRadius / 2));
        this.lakeTop = new THREE.Mesh(this.lakeTopGeometry, this.lakeTopMaterial);
        this.lakeTop.position.set(430, 0.6, 120);
        this.lakeTop.rotation.x = -Math.PI / 2;
        this.lakeTop.userData.obb = new OBB();
        this.lakeTop.updateMatrix();
        this.lakeTop.updateMatrixWorld();
        this.lakeTop.userData.obb.copy(this.lakeTopGeometry.userData.obb);
        this.lakeTop.userData.obb.applyMatrix4(this.lakeTop.matrixWorld);

        // Texture tree
        this.treeTexture = new THREE.TextureLoader().load('./objects/textures/leaves.png');
        this.treeTexture.wrapS = THREE.RepeatWrapping;
        this.treeTexture.wrapT = THREE.RepeatWrapping;
        this.treeTexture.colorSpace = THREE.SRGBColorSpace;
        this.treeTexture.repeat.set(1, 2);

        // Tree (Cone)
        this.treeRadius = 2;
        this.treeHeight = 15;
        this.treeRadialSegments = 32;
        this.treeMaterial = new THREE.MeshPhongMaterial({ map: this.treeTexture });

        this.treeGeometry = new THREE.ConeGeometry(this.treeRadius, this.treeHeight, this.treeRadialSegments);
        this.treeGeometry.userData.obb = new OBB();
        this.treeGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.treeRadius / 2, this.treeHeight / 2, this.treeRadius / 2));
        const totalTrees = 60; 
        const treesPerRow = 6;
        const startX = 100;
        const startZ = 75;
        const gapX = 10;
        const gapZ = 5;

        for (let i = 0; i < totalTrees; i++) {
            const row = Math.floor(i / treesPerRow);
            const col = i % treesPerRow;
            
            const tree = new THREE.Mesh(this.treeGeometry, this.treeMaterial);
            tree.position.set(startX + col * gapX, 10, startZ + row * gapZ);
            tree.userData.obb = new OBB();
            tree.updateMatrix();
            tree.updateMatrixWorld();
            tree.userData.obb.copy(this.treeGeometry.userData.obb);
            tree.userData.obb.applyMatrix4(tree.matrixWorld);
            this[`tree${i}`] = tree;
        }

        // Tree middle (Cone)

        const totalMiddleTrees = 110;
        const startXmiddle = 220;
        const startZmiddle = 10;
        const gapXmiddle = 0.5;
        const gapZmiddle = 5;

        for (let i = 60; i < totalMiddleTrees; i++) {
            const tree = new THREE.Mesh(this.treeGeometry, this.treeMaterial);
            tree.position.set(startXmiddle + i * gapXmiddle, 10, startZmiddle + i * gapZmiddle);
            tree.userData.obb = new OBB();
            tree.updateMatrix();
            tree.updateMatrixWorld();
            tree.userData.obb.copy(this.treeGeometry.userData.obb);
            tree.userData.obb.applyMatrix4(tree.matrixWorld);
            this[`tree${i}`] = tree;
        }

        // Tree Lake (Cone)
        const totalLakeTrees = 60;
        const startXlake = 410;
        const startZlake = 340;

        for (let i = 0; i < totalLakeTrees; i++) {
            const row = Math.floor(i / treesPerRow);
            const col = i % treesPerRow;
            
            const tree = new THREE.Mesh(this.treeGeometry, this.treeMaterial);
            tree.position.set(startXlake + col * gapX, 10, startZlake + row * gapZ);
            tree.userData.obb = new OBB();
            tree.updateMatrix();
            tree.updateMatrixWorld();
            tree.userData.obb.copy(this.treeGeometry.userData.obb);
            tree.userData.obb.applyMatrix4(tree.matrixWorld);
            this[`tree${i+110}`] = tree;
        }

        // Texture tree stem
        this.stemTexture = new THREE.TextureLoader().load('./objects/textures/stem.png');
        this.stemTexture.wrapS = THREE.RepeatWrapping;
        this.stemTexture.wrapT = THREE.RepeatWrapping;
        this.stemTexture.colorSpace = THREE.SRGBColorSpace;

        // Tree Stem (Cylinder)
        this.stemRadiusTop = 0.5;
        this.stemRadiusBottom = 0.5;
        this.stemHeight = 6;
        this.stemRadialSegments = 32;
        this.stemMaterial = new THREE.MeshPhongMaterial({ map: this.stemTexture });
        
        this.stemGeometry = new THREE.CylinderGeometry(this.stemRadiusTop, this.stemRadiusBottom, this.stemHeight, this.stemRadialSegments);
        this.stemGeometry.userData.obb = new OBB();
        this.stemGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.stemRadiusTop / 2, this.stemHeight / 2, this.stemRadiusBottom / 2));
        for (let i = 0; i < totalTrees; i++) {
            const row = Math.floor(i / treesPerRow);
            const col = i % treesPerRow;
            
            const stem = new THREE.Mesh(this.stemGeometry, this.stemMaterial);
            stem.position.set(startX + col * gapX, 3, startZ + row * gapZ);
            stem.userData.obb = new OBB();
            stem.updateMatrix();
            stem.updateMatrixWorld();
            stem.userData.obb.copy(this.stemGeometry.userData.obb);
            stem.userData.obb.applyMatrix4(stem.matrixWorld);
            this[`stem${i}`] = stem;
        }

        // Tree middle Stem (Cylinder)

        for (let i = 60; i < totalMiddleTrees; i++) {
            const stem = new THREE.Mesh(this.stemGeometry, this.stemMaterial);
            stem.position.set(startXmiddle + i * gapXmiddle, 3, startZmiddle + i * gapZmiddle);
            stem.userData.obb = new OBB();
            stem.updateMatrix();
            stem.updateMatrixWorld();
            stem.userData.obb.copy(this.stemGeometry.userData.obb);
            stem.userData.obb.applyMatrix4(stem.matrixWorld);
            this[`stem${i}`] = stem;
        }
        
        // Tree Lake Stem (Cylinder)

        for (let i = 0; i < totalLakeTrees; i++) {
            const row = Math.floor(i / treesPerRow);
            const col = i % treesPerRow;
            
            const stem = new THREE.Mesh(this.stemGeometry, this.stemMaterial);
            stem.position.set(startXlake + col * gapX, 3, startZlake + row * gapZ);
            stem.userData.obb = new OBB();
            stem.updateMatrix();
            stem.updateMatrixWorld();
            stem.userData.obb.copy(this.stemGeometry.userData.obb);
            stem.userData.obb.applyMatrix4(stem.matrixWorld);
            this[`stem${i+110}`] = stem;
        }

        // Texture advertising board
        this.advertisingBoardTexture = new THREE.TextureLoader().load('./objects/textures/advertisingBoard.png');
        this.advertisingBoardTexture.wrapS = THREE.RepeatWrapping;
        this.advertisingBoardTexture.wrapT = THREE.RepeatWrapping;
        this.advertisingBoardTexture.colorSpace = THREE.SRGBColorSpace;
        this.advertisingBoardTexture.repeat.set(6, 1);

        // Advertising Board (Box)

        this.advertisingBoardWidth = 120;
        this.advertisingBoardHeight = 10;
        this.advertisingBoardDepth = 1;
        this.advertisingBoardMaterial = new THREE.MeshPhongMaterial({ map: this.advertisingBoardTexture });

        this.advertisingBoardGeometry = new THREE.BoxGeometry(this.advertisingBoardWidth, this.advertisingBoardHeight, this.advertisingBoardDepth);
        this.advertisingBoardGeometry.userData.obb = new OBB();
        this.advertisingBoardGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.advertisingBoardWidth / 2, this.advertisingBoardHeight / 2, this.advertisingBoardDepth / 2));
        this.advertisingBoard = new THREE.Mesh(this.advertisingBoardGeometry, this.advertisingBoardMaterial);
        this.advertisingBoard.position.set(205, 5, 225);
        this.advertisingBoard.rotation.y = -Math.PI / 3;
        this.advertisingBoard.userData.obb = new OBB();
        this.advertisingBoard.updateMatrix();
        this.advertisingBoard.updateMatrixWorld();
        this.advertisingBoard.userData.obb.copy(this.advertisingBoardGeometry.userData.obb);
        this.advertisingBoard.userData.obb.applyMatrix4(this.advertisingBoard.matrixWorld);

        // Texture rocks
        this.rockTexture = new THREE.TextureLoader().load('./objects/textures/rock.png');
        this.rockTexture.wrapS = THREE.RepeatWrapping;
        this.rockTexture.wrapT = THREE.RepeatWrapping;
        this.rockTexture.colorSpace = THREE.SRGBColorSpace;

        // Rocks Sperators (Octahedron)
        this.rockRadius = 10;
        this.rockDetail = 2;
        this.rockMaterial = new THREE.MeshPhongMaterial({ map: this.rockTexture });

        this.rockGeometry = new THREE.OctahedronGeometry(this.rockRadius, this.rockDetail);
        this.rockGeometry.userData.obb = new OBB();
        this.rockGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.rockRadius / 2, this.rockRadius / 2, this.rockRadius / 2));
        const totalRocks = 18; // Change this number as needed
        const startXrocks = 140;
        const startZrocks = 250;
        const gapXrocks = 2.5;
        const gapZrocks = 21;

        for (let i = 0; i < totalRocks; i++) {
            const rock = new THREE.Mesh(this.rockGeometry, this.rockMaterial);
            rock.position.set(startXrocks + i * gapXrocks, 0, startZrocks + i * gapZrocks);
            rock.userData.obb = new OBB();
            rock.updateMatrix();
            rock.updateMatrixWorld();
            rock.userData.obb.copy(this.rockGeometry.userData.obb);
            rock.userData.obb.applyMatrix4(rock.matrixWorld);
            this[`rock${i}`] = rock;
        }

        // Rocks Middle (Octahedron)
        const totalMiddleRocks = 28;
        const startXmiddleRocks = 210;
        const startZmiddleRocks = -380;
        const gapXmiddleRocks = 2.5;
        const gapZmiddleRocks = 21;
        
        for (let i = 18; i < totalMiddleRocks; i++) {
            const rock = new THREE.Mesh(this.rockGeometry, this.rockMaterial);
            rock.position.set(startXmiddleRocks + i * gapXmiddleRocks, 0, startZmiddleRocks + i * gapZmiddleRocks);
            rock.userData.obb = new OBB();
            rock.updateMatrix();
            rock.updateMatrixWorld();
            rock.userData.obb.copy(this.rockGeometry.userData.obb);
            rock.userData.obb.applyMatrix4(rock.matrixWorld);
            this[`rock${i}`] = rock;
        }

        // Texture box
        this.boxTexture = new THREE.TextureLoader().load('./objects/textures/box.png');
        this.boxTexture.wrapS = THREE.RepeatWrapping;
        this.boxTexture.wrapT = THREE.RepeatWrapping;
        this.boxTexture.colorSpace = THREE.SRGBColorSpace;
        this.boxTexture.repeat.set(50, 10);

        // Box Separator (Box)
        this.boxWidth = 8;
        this.boxHeight = 5;
        this.boxDepth = 200;
        this.boxMaterial = new THREE.MeshPhongMaterial({ map: this.boxTexture });

        this.boxGeometry = new THREE.BoxGeometry(this.boxWidth, this.boxHeight, this.boxDepth);
        this.boxGeometry.userData.obb = new OBB();
        this.boxGeometry.userData.obb.halfSize.copy(new THREE.Vector3(this.boxWidth / 2, this.boxHeight / 2, this.boxDepth / 2));
        this.box = new THREE.Mesh(this.boxGeometry, this.boxMaterial);
        this.box.position.set(345, 2.5, 510);
        this.box.userData.obb = new OBB();
        this.box.updateMatrix();
        this.box.updateMatrixWorld();
        this.box.userData.obb.copy(this.boxGeometry.userData.obb);
        this.box.userData.obb.applyMatrix4(this.box.matrixWorld);


        // Limiters (Box)
        // First Curve
        this.limiters4 = new MyLimiters();
        this.limiters4.position.set(80, 0, 605);
        this.limiters5 = new MyLimiters();
        this.limiters5.position.set(54, 0, 590);
        this.limiters5.rotateY(-Math.PI / 5);
        this.limiters6 = new MyLimiters();
        this.limiters6.position.set(111, 0, 605);
        this.limiters6.rotateY(Math.PI / 5);

        // Second Curve
        this.limiters1 = new MyLimiters();
        this.limiters1.position.set(120, 0, 160);
        this.limiters2 = new MyLimiters();
        this.limiters2.position.set(94, 0, 175);
        this.limiters2.rotateY(Math.PI / 5);
        this.limiters3 = new MyLimiters();
        this.limiters3.position.set(151, 0, 160);
        this.limiters3.rotateY(-Math.PI / 5);

        // Third Curve
        this.limiters7 = new MyLimiters();
        this.limiters7.position.set(265, 0, 615);
        this.limiters8 = new MyLimiters();
        this.limiters8.position.set(296, 0, 615);
        this.limiters8.rotateY(Math.PI / 5);
        this.limiters9 = new MyLimiters();
        this.limiters9.position.set(238, 0, 600);
        this.limiters9.rotateY(-Math.PI / 5);

        // Fourth Curve
        this.limiters10 = new MyLimiters();
        this.limiters10.position.set(330, 0, 340);
        this.limiters11 = new MyLimiters();
        this.limiters11.position.set(361, 0, 340);
        this.limiters11.rotateY(-Math.PI / 5);
        this.limiters12 = new MyLimiters();
        this.limiters12.position.set(304, 0, 355);
        this.limiters12.rotateY(Math.PI / 5);

        // Fifth Curve
        this.limiters13 = new MyLimiters();
        this.limiters13.position.set(400, 0, 605);
        this.limiters14 = new MyLimiters();
        this.limiters14.position.set(374, 0, 590);
        this.limiters14.rotateY(-Math.PI / 5);
        this.limiters15 = new MyLimiters();
        this.limiters15.position.set(431, 0, 605);

        // Sixth Curve
        this.limiters16 = new MyLimiters();
        this.limiters16.position.set(573, 0, 564);
        this.limiters16.rotateY(Math.PI / 5);
        this.limiters17 = new MyLimiters();
        this.limiters17.position.set(596, 0, 544);
        this.limiters17.rotateY(Math.PI / 2);
        this.limiters18 = new MyLimiters();
        this.limiters18.position.set(596, 0, 513);
        this.limiters18.rotateY(Math.PI / 2);

        // Seventh Curve
        this.limiters19 = new MyLimiters();
        this.limiters19.position.set(580, 0, 300);
        this.limiters19.rotateY(-Math.PI / 3);
        this.limiters20 = new MyLimiters();
        this.limiters20.position.set(555, 0, 282);
        this.limiters20.rotateY(-Math.PI / 5);
        this.limiters21 = new MyLimiters();
        this.limiters21.position.set(528, 0, 267);
        this.limiters21.rotateY(-Math.PI / 7);

        // Eighth Curve
        this.limiters22 = new MyLimiters();
        this.limiters22.position.set(370, 0, 260);
        this.limiters22.rotateY(Math.PI / 2);
        this.limiters23 = new MyLimiters();
        this.limiters23.position.set(370, 0, 229);
        this.limiters23.rotateY(Math.PI / 3);
        this.limiters24 = new MyLimiters();
        this.limiters24.position.set(370, 0, 267);
        this.limiters24.rotateY(-Math.PI / 3);

        // Ninth Curve
        this.limiters25 = new MyLimiters();
        this.limiters25.position.set(548, 0, 245);
        this.limiters25.rotateY(Math.PI / 7);
        this.limiters26 = new MyLimiters();
        this.limiters26.position.set(575, 0, 230);
        this.limiters26.rotateY(Math.PI / 3);
        this.limiters27 = new MyLimiters();
        this.limiters27.position.set(589, 0, 203);
        this.limiters27.rotateY(Math.PI / 2);

        // Tenth Curve
        this.limiters28 = new MyLimiters();
        this.limiters28.position.set(345, 0, -18);
        this.limiters29 = new MyLimiters();  
        this.limiters29.position.set(319, 0, -3);
        this.limiters29.rotateY(Math.PI / 5);
        this.limiters30 = new MyLimiters();
        this.limiters30.position.set(316, 0, 2);
        this.limiters30.rotateY(-Math.PI / 1.5);

        // Eleventh Curve
        this.limiters31 = new MyLimiters();
        this.limiters31.position.set(260, 0, 300);
        this.limiters32 = new MyLimiters();
        this.limiters32.position.set(234, 0, 285);
        this.limiters32.rotateY(-Math.PI / 5);
        this.limiters33 = new MyLimiters();
        this.limiters33.position.set(291, 0, 300);
        this.limiters33.rotateY(Math.PI / 5);

        // Twelfth Curve
        this.limiters34 = new MyLimiters();
        this.limiters34.position.set(150, 0, -18);
        this.limiters35 = new MyLimiters();
        this.limiters35.position.set(180, 0, -15);
        this.limiters35.rotateY(-Math.PI / 5);
        this.limiters36 = new MyLimiters();
        this.limiters36.position.set(205, 0, 3);
        this.limiters36.rotateY(-Math.PI / 4);

        // Thirteenth Curve
        this.limiters37 = new MyLimiters();
        this.limiters37.position.set(40, 0, -5);
        this.limiters37.rotateY(Math.PI / 7);
        this.limiters38 = new MyLimiters();
        this.limiters38.position.set(14, 0, 12);
        this.limiters38.rotateY(Math.PI / 5);
        this.limiters39 = new MyLimiters();
        this.limiters39.position.set(-2, 0, 38);
        this.limiters39.rotateY(Math.PI / 3);

        this.limiters1.update();
        this.limiters2.update();
        this.limiters3.update();
        this.limiters4.update();
        this.limiters5.update();
        this.limiters6.update();
        this.limiters7.update();
        this.limiters8.update();
        this.limiters9.update();
        this.limiters10.update();
        this.limiters11.update();
        this.limiters12.update();
        this.limiters13.update();
        this.limiters14.update();
        this.limiters15.update();
        this.limiters16.update();
        this.limiters17.update();
        this.limiters18.update();
        this.limiters19.update();
        this.limiters20.update();
        this.limiters21.update();
        this.limiters22.update();
        this.limiters23.update();
        this.limiters24.update();
        this.limiters25.update();
        this.limiters26.update();
        this.limiters27.update();
        this.limiters28.update();
        this.limiters29.update();
        this.limiters30.update();
        this.limiters31.update();
        this.limiters32.update();
        this.limiters33.update();
        this.limiters34.update();
        this.limiters35.update();
        this.limiters36.update();
        this.limiters37.update();
        this.limiters38.update();
        this.limiters39.update();


        this.add(this.plane,
                this.goal, this.goalPostLeft, this.goalPostRight,
                this.separator,
                this.road,
                this.wallLeft, this.wallRight, this.wallTop, this.wallBack,
                this.pillar0, this.pillar1, this.pillar2, this.pillar3, this.pillar4, this.pillar5, this.pillar6, this.pillar7, this.pillar8, this.pillar9,
                this.pillar10, this.pillar11, this.pillar12, this.pillar13, this.pillar14, this.pillar15, this.pillar16, this.pillar17, this.pillar18,
                this.lake,
                this.lakeTop,
                this.tree0, this.stem0, this.tree1, this.stem1, this.tree2, this.stem2, this.tree3, this.stem3, this.tree4, this.stem4,
                this.tree5, this.stem5, this.tree6, this.stem6, this.tree7, this.stem7, this.tree8, this.stem8, this.tree9, this.stem9,
                this.tree10, this.stem10, this.tree11, this.stem11, this.tree12, this.stem12, this.tree13, this.stem13, this.tree14, this.stem14,
                this.tree15, this.stem15, this.tree16, this.stem16, this.tree17, this.stem17, this.tree18, this.stem18, this.tree19, this.stem19,
                this.tree20, this.stem20, this.tree21, this.stem21, this.tree22, this.stem22, this.tree23, this.stem23, this.tree24, this.stem24,
                this.tree25, this.stem25, this.tree26, this.stem26, this.tree27, this.stem27, this.tree28, this.stem28, this.tree29, this.stem29,
                this.tree30, this.stem30, this.tree31, this.stem31, this.tree32, this.stem32, this.tree33, this.stem33, this.tree34, this.stem34,
                this.tree35, this.stem35, this.tree36, this.stem36, this.tree37, this.stem37, this.tree38, this.stem38, this.tree39, this.stem39,
                this.tree40, this.stem40, this.tree41, this.stem41, this.tree42, this.stem42, this.tree43, this.stem43, this.tree44, this.stem44,
                this.tree45, this.stem45, this.tree46, this.stem46, this.tree47, this.stem47, this.tree48, this.stem48, this.tree49, this.stem49,
                this.tree50, this.stem50, this.tree51, this.stem51, this.tree52, this.stem52, this.tree53, this.stem53, this.tree54, this.stem54,
                this.tree55, this.stem55, this.tree56, this.stem56, this.tree57, this.stem57, this.tree58, this.stem58, this.tree59, this.stem59,
                this.tree60, this.stem60, this.tree61, this.stem61, this.tree62, this.stem62, this.tree63, this.stem63, this.tree64, this.stem64,
                this.tree65, this.stem65, this.tree66, this.stem66, this.tree67, this.stem67, this.tree68, this.stem68, this.tree69, this.stem69,
                this.tree70, this.stem70, this.tree71, this.stem71, this.tree72, this.stem72, this.tree73, this.stem73, this.tree74, this.stem74,
                this.tree75, this.stem75, this.tree76, this.stem76, this.tree77, this.stem77, this.tree78, this.stem78, this.tree79, this.stem79,
                this.tree80, this.stem80, this.tree81, this.stem81, this.tree82, this.stem82, this.tree83, this.stem83, this.tree84, this.stem84,
                this.tree85, this.stem85, this.tree86, this.stem86, this.tree87, this.stem87, this.tree88, this.stem88, this.tree89, this.stem89,
                this.tree90, this.stem90, this.tree91, this.stem91, this.tree92, this.stem92, this.tree93, this.stem93, this.tree94, this.stem94,
                this.tree95, this.stem95, this.tree96, this.stem96, this.tree97, this.stem97, this.tree98, this.stem98, this.tree99, this.stem99,
                this.tree100, this.stem100, this.tree101, this.stem101, this.tree102, this.stem102, this.tree103, this.stem103, this.tree104, this.stem104,
                this.tree105, this.stem105, this.tree106, this.stem106, this.tree107, this.stem107, this.tree108, this.stem108, this.tree109, this.stem109,
                this.tree110, this.stem110, this.tree111, this.stem111, this.tree112, this.stem112, this.tree113, this.stem113, this.tree114, this.stem114,
                this.tree115, this.stem115, this.tree116, this.stem116, this.tree117, this.stem117, this.tree118, this.stem118, this.tree119, this.stem119,
                this.tree120, this.stem120, this.tree121, this.stem121, this.tree122, this.stem122, this.tree123, this.stem123, this.tree124, this.stem124,
                this.tree125, this.stem125, this.tree126, this.stem126, this.tree127, this.stem127, this.tree128, this.stem128, this.tree129, this.stem129,
                this.tree130, this.stem130, this.tree131, this.stem131, this.tree132, this.stem132, this.tree133, this.stem133, this.tree134, this.stem134,
                this.tree135, this.stem135, this.tree136, this.stem136, this.tree137, this.stem137, this.tree138, this.stem138, this.tree139, this.stem139,
                this.tree140, this.stem140, this.tree141, this.stem141, this.tree142, this.stem142, this.tree143, this.stem143, this.tree144, this.stem144,
                this.tree145, this.stem145, this.tree146, this.stem146, this.tree147, this.stem147, this.tree148, this.stem148, this.tree149, this.stem149,
                this.tree150, this.stem150, this.tree151, this.stem151, this.tree152, this.stem152, this.tree153, this.stem153, this.tree154, this.stem154,
                this.tree155, this.stem155, this.tree156, this.stem156, this.tree157, this.stem157, this.tree158, this.stem158, this.tree159, this.stem159,
                this.tree160, this.stem160, this.tree161, this.stem161, this.tree162, this.stem162, this.tree163, this.stem163, this.tree164, this.stem164,
                this.tree165, this.stem165, this.tree166, this.stem166, this.tree167, this.stem167, this.tree168, this.stem168, this.tree169, this.stem169,
                this.advertisingBoard,
                this.rock0, this.rock1, this.rock2, this.rock3, this.rock4, this.rock5, this.rock6, this.rock7, this.rock8, this.rock9, this.rock10,
                this.rock11, this.rock12, this.rock13, this.rock14, this.rock15, this.rock16, this.rock17, this.rock18, this.rock19, this.rock20,
                this.rock21, this.rock22, this.rock23, this.rock24, this.rock25, this.rock26, this.rock27,
                this.box,
                // this.limiters1, this.limiters2, this.limiters3, this.limiters4, this.limiters5, this.limiters6, this.limiters7, this.limiters8, this.limiters9,
                // this.limiters10, this.limiters11, this.limiters12, this.limiters13, this.limiters14, this.limiters15, this.limiters16, this.limiters17, this.limiters18,
                // this.limiters19, this.limiters20, this.limiters21, this.limiters22, this.limiters23, this.limiters24, this.limiters25, this.limiters26, this.limiters27,
                // this.limiters28, this.limiters29, this.limiters30, this.limiters31, this.limiters32, this.limiters33, this.limiters34, this.limiters35, this.limiters36,
                // this.limiters37, this.limiters38, this.limiters39
                 );
    }
}

export { MyPlane };