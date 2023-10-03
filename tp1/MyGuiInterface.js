import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { MyApp } from './MyApp.js';
import { MyContents } from './MyContents.js';

/**
    This class customizes the gui interface for the app
*/
class MyGuiInterface  {

    /**
     * 
     * @param {MyApp} app The application object 
     */
    constructor(app) {
        this.app = app
        this.datgui =  new GUI();
        this.contents = null
    }

    /**
     * Set the contents object
     * @param {MyContents} contents the contents objects 
     */
    setContents(contents) {
        this.contents = contents
    }

    /**
     * Initialize the gui interface
     */
    init() {
        // add a folder to the gui interface for the box
        const boxFolder = this.datgui.addFolder( 'Box' );
        // note that we are using a property from the contents object 
        boxFolder.add(this.contents, 'boxMeshSize', 0, 10).name("size").onChange( () => { this.contents.rebuildBox() } );
        boxFolder.add(this.contents, 'boxEnabled', true).name("enabled");
        boxFolder.add(this.contents.boxDisplacement, 'x', -5, 5);
        boxFolder.add(this.contents.boxDisplacement, 'y', -5, 5);
        boxFolder.add(this.contents.boxDisplacement, 'z', -5, 5);
        boxFolder.open();
        
        const data = {  
            'diffuse color': this.contents.diffusePlaneColor,
            'specular color': this.contents.specularPlaneColor,
            'spot light color': this.contents.spotLightColor 
        };

        // adds a folder to the gui interface for the plane
        const planeFolder = this.datgui.addFolder( 'Plane' );
        planeFolder.addColor( data, 'diffuse color' ).onChange( (value) => { this.contents.updateDiffusePlaneColor(value) } );
        planeFolder.addColor( data, 'specular color' ).onChange( (value) => { this.contents.updateSpecularPlaneColor(value) } );
        planeFolder.add(this.contents, 'planeShininess', 0, 1000).name("shininess").onChange( (value) => { this.contents.updatePlaneShininess(value) } );
        planeFolder.open();

        // adds a folder to the gui interface for the camera
        const cameraFolder = this.datgui.addFolder('Camera')
        cameraFolder.add(this.app, 'activeCameraName', [ 'Perspective', 'Left', 'Top', 'Front' ] ).name("active camera");
        // note that we are using a property from the app 
        cameraFolder.add(this.app.activeCamera.position, 'x', 0, 10).name("x coord");
        cameraFolder.open();

        // adds a folder to the gui interface for the spot light
        const lightFolder = this.datgui.addFolder( 'Spot light' );
        lightFolder.addColor( data, 'spot light color' ).onChange( (value) => { this.contents.updateSpotLightColor(value) } );
        lightFolder.add(this.contents, 'intensity', 0, 40, 1).name("intensity (cd)").onChange( (value) => { this.contents.updateSpotLightIntensity(value) } );
        lightFolder.add(this.contents, 'distance', 0, 20, 1).name("distance").onChange( (value) => { this.contents.updateSpotLightDistance(value) } );
        lightFolder.add(this.contents, 'spotAngle', 0, 90, 1).name("spot Angle").onChange( (value) => { this.contents.updateSpotLightAngle(value) } );
        lightFolder.add(this.contents, 'penumbra', 0, 1, 0.01).name("penumbra").onChange( (value) => { this.contents.updateSpotLightPenumbra(value) } );
        lightFolder.add(this.contents, 'decay', 0, 2, 1).name("decay").onChange( (value) => { this.contents.updateSpotLightDecay(value) } );
        lightFolder.open();
    }
}

export { MyGuiInterface };