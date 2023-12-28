import * as THREE from 'three';

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
        this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
        this.plane.position.set(500, 0, 400);
        this.plane.rotation.x = -Math.PI / 2;

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
        this.goal = new THREE.Mesh(this.goalGeometry, this.goalMaterial);
        this.goal.position.set(14, 12, 300);

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
        this.goalPostLeft = new THREE.Mesh(this.goalPostGeometry, this.goalPostMaterial);
        this.goalPostLeft.position.set(-7, 5, 300);

        this.goalPostRight = new THREE.Mesh(this.goalPostGeometry, this.goalPostMaterial);
        this.goalPostRight.position.set(35, 5, 300);

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
        this.separator = new THREE.Mesh(this.separatorGeometry, this.separatorMaterial);
        this.separator.position.set(50, 2.5, 300);
        this.separator.rotation.y = Math.PI/60;

        // Texture road
        this.roadTexture = new THREE.TextureLoader().load('./objects/textures/pitRoad.png');
        this.roadTexture.wrapS = THREE.RepeatWrapping;
        this.roadTexture.wrapT = THREE.RepeatWrapping;
        this.roadTexture.colorSpace = THREE.SRGBColorSpace;
        this.roadTexture.repeat.set(1, 30);

        // PitStop Road (Box)
        this.roadWidth = 9;
        this.roadHeight = 1.5;
        this.roadDepth = 550;
        this.roadMaterial = new THREE.MeshPhongMaterial({ map: this.roadTexture });

        this.roadGeometry = new THREE.BoxGeometry(this.roadWidth, this.roadHeight, this.roadDepth);
        this.road = new THREE.Mesh(this.roadGeometry, this.roadMaterial);
        this.road.position.set(58, 0, 300);
        this.road.rotation.y = Math.PI/60;

        // PitStop/Garage Left and Right Wall (Box)
        this.wallWidth = 8;
        this.wallHeight = 19;
        this.wallDepth = 10;
        this.wallMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

        this.wallGeometry = new THREE.BoxGeometry(this.wallWidth, this.wallHeight, this.wallDepth);
        this.wallLeft = new THREE.Mesh(this.wallGeometry, this.wallMaterial);
        this.wallLeft.position.set(74.5, 4, 265.5);
        this.wallLeft.rotation.y = Math.PI/60;
        this.wallLeft.rotation.z = Math.PI/2;
        this.wallRight = new THREE.Mesh(this.wallGeometry, this.wallMaterial);
        this.wallRight.position.set(85.5, 4, 474.5);
        this.wallRight.rotation.y = Math.PI/60;
        this.wallRight.rotation.z = Math.PI/2;

        //PitStop Top Wall (Box)
        this.wallTopWidth = 4;
        this.wallTopHeight = 20;
        this.wallTopDepth = 220;
        this.wallTopMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

        this.wallTopGeometry = new THREE.BoxGeometry(this.wallTopWidth, this.wallTopHeight, this.wallTopDepth);
        this.wallTop = new THREE.Mesh(this.wallTopGeometry, this.wallTopMaterial);
        this.wallTop.position.set(80, 10, 370);
        this.wallTop.rotation.y = Math.PI/60;
        this.wallTop.rotation.z = Math.PI/2;

        //PitStop Back Wall (Box)
        this.wallBackWidth = 4;
        this.wallBackHeight = 10;
        this.wallBackDepth = 210;
        this.wallBackMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

        this.wallBackGeometry = new THREE.BoxGeometry(this.wallBackWidth, this.wallBackHeight, this.wallBackDepth);
        this.wallBack = new THREE.Mesh(this.wallBackGeometry, this.wallBackMaterial);
        this.wallBack.position.set(87.5, 5, 370);
        this.wallBack.rotation.y = Math.PI/60;

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
        this.lake = new THREE.Mesh(this.lakeGeometry, this.lakeMaterial);
        this.lake.position.set(480, 0.6, 450);
        this.lake.rotation.x = -Math.PI / 2;

        // Lake Top (Circle)
        this.lakeTopRadius = 40;
        this.lakeTopSegments = 32;
        this.lakeTopMaterial = new THREE.MeshPhongMaterial({ map: this.lakeTexture });

        this.lakeTopGeometry = new THREE.CircleGeometry(this.lakeTopRadius, this.lakeTopSegments);
        this.lakeTop = new THREE.Mesh(this.lakeTopGeometry, this.lakeTopMaterial);
        this.lakeTop.position.set(430, 0.6, 120);
        this.lakeTop.rotation.x = -Math.PI / 2;

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
        
        for (let i = 0; i < totalTrees; i++) {
            const row = Math.floor(i / treesPerRow);
            const col = i % treesPerRow;
            
            const stem = new THREE.Mesh(this.stemGeometry, this.stemMaterial);
            stem.position.set(startX + col * gapX, 3, startZ + row * gapZ);
            this[`stem${i}`] = stem;
        }

        // Tree middle Stem (Cylinder)

        for (let i = 60; i < totalMiddleTrees; i++) {
            const stem = new THREE.Mesh(this.stemGeometry, this.stemMaterial);
            stem.position.set(startXmiddle + i * gapXmiddle, 3, startZmiddle + i * gapZmiddle);
            this[`stem${i}`] = stem;
        }
        
        // Tree Lake Stem (Cylinder)

        for (let i = 0; i < totalLakeTrees; i++) {
            const row = Math.floor(i / treesPerRow);
            const col = i % treesPerRow;
            
            const stem = new THREE.Mesh(this.stemGeometry, this.stemMaterial);
            stem.position.set(startXlake + col * gapX, 3, startZlake + row * gapZ);
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
        this.advertisingBoardDepth = 0.1;
        this.advertisingBoardMaterial = new THREE.MeshPhongMaterial({ map: this.advertisingBoardTexture });

        this.advertisingBoardGeometry = new THREE.BoxGeometry(this.advertisingBoardWidth, this.advertisingBoardHeight, this.advertisingBoardDepth);
        this.advertisingBoard = new THREE.Mesh(this.advertisingBoardGeometry, this.advertisingBoardMaterial);
        this.advertisingBoard.position.set(205, 5, 225);
        this.advertisingBoard.rotation.y = -Math.PI / 3;

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
        const totalRocks = 18; // Change this number as needed
        const startXrocks = 140;
        const startZrocks = 250;
        const gapXrocks = 2.5;
        const gapZrocks = 21;

        for (let i = 0; i < totalRocks; i++) {
            const rock = new THREE.Mesh(this.rockGeometry, this.rockMaterial);
            rock.position.set(startXrocks + i * gapXrocks, 0, startZrocks + i * gapZrocks);
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
        this.box = new THREE.Mesh(this.boxGeometry, this.boxMaterial);
        this.box.position.set(345, 2.5, 510);

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
                 );
    }
}

export { MyPlane };