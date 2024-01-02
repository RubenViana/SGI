import * as THREE from 'three';
import { OBB } from 'three/addons/math/OBB.js';

class MyTrees extends THREE.Object3D {

    constructor() {
        super();

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

        this.add(this.tree0, this.stem0, this.tree1, this.stem1, this.tree2, this.stem2, this.tree3, this.stem3, this.tree4, this.stem4,
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
            this.tree165, this.stem165, this.tree166, this.stem166, this.tree167, this.stem167, this.tree168, this.stem168, this.tree169, this.stem169)
    }
}

export { MyTrees };