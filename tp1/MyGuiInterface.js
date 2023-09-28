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

        // enable/disable the axis
        this.datgui.add(this.contents, 'axisEnabled', true).name("Axis");

        // add a folder to the gui interface for the box
        const boxFolder = this.datgui.addFolder( 'Box' );
        // note that we are using a property from the contents object 
        boxFolder.add(this.contents, 'boxMeshSize', 0, 10).name("size").onChange( () => { this.contents.rebuildBox() } );
        boxFolder.add(this.contents, 'boxEnabled', true).name("enabled");
        boxFolder.add(this.contents.boxDisplacement, 'x', -5, 5)
        boxFolder.add(this.contents.boxDisplacement, 'y', -5, 5)
        boxFolder.add(this.contents.boxDisplacement, 'z', -5, 5)
        boxFolder.close()
        
        /*
        const data = {  
            'diffuse color': this.contents.diffusePlaneColor,
            'specular color': this.contents.specularPlaneColor,
        };

        // adds a folder to the gui interface for the plane
        const planeFolder = this.datgui.addFolder( 'Plane' );
        planeFolder.addColor( data, 'diffuse color' ).onChange( (value) => { this.contents.updateDiffusePlaneColor(value) } );
        planeFolder.addColor( data, 'specular color' ).onChange( (value) => { this.contents.updateSpecularPlaneColor(value) } );
        planeFolder.add(this.contents, 'planeShininess', 0, 1000).name("shininess").onChange( (value) => { this.contents.updatePlaneShininess(value) } );
        planeFolder.open();
        */

        // adds a folder to the gui interface for the camera
        const cameraFolder = this.datgui.addFolder('Camera')
        cameraFolder.add(this.app, 'activeCameraName', [ 'Perspective', 'Left', 'Top', 'Front' ] ).name("active camera")
        // note that we are using a property from the app 
        cameraFolder.add(this.app.activeCamera.position, 'x', 0, 10).name("x coord")
        cameraFolder.open()

        // adds a folder to the gui interface for the table
        const tableFolder = this.datgui.addFolder('Table')
        tableFolder.add(this.contents.table.position, 'x', -5, 5)
        tableFolder.add(this.contents.table.position, 'y', -5, 5)
        tableFolder.add(this.contents.table.position, 'z', -5, 5)
        tableFolder.add(this.contents.table.rotation, 'y', 0, 2*Math.PI).name("rotation")
        tableFolder.open()


        const spotLightAngle = {
            'angle': this.contents.spotLight.angle * 180 / Math.PI
        }

        // adds a folder to the gui interface for the spotLight
        const spotLightFolder = this.datgui.addFolder('Spot Light')
        spotLightFolder.addColor( this.contents.spotLight, 'color' ).onChange( (value) => { this.contents.updateSpotLightColor(value) } )
		spotLightFolder.add( this.contents.spotLight, 'intensity', 0, 40, 1 )
		spotLightFolder.add( this.contents.spotLight, 'distance', 0, 20 ).onChange(this.contents.updateSpotLight())
		spotLightFolder.add( spotLightAngle, 'angle', 0, 90 ).onChange( (value) => { this.contents.spotLight.angle = value * Math.PI / 180; this.contents.updateSpotLight() } )
		spotLightFolder.add( this.contents.spotLight, 'penumbra', 0, 1, 0.01 ).onChange(this.contents.updateSpotLight())
        spotLightFolder.add( this.contents.spotLight, 'decay', 0, 2, 0.01 ).onChange(() => {this.contents.updateSpotLight()})
        spotLightFolder.add( this.contents.spotLight.position, 'x', -10, 10).onChange(() => {this.contents.updateSpotLight()})
        spotLightFolder.add( this.contents.spotLight.position, 'y', -10, 10).onChange(() => {this.contents.updateSpotLight()})
        spotLightFolder.add( this.contents.spotLight.position, 'z', -10, 10).onChange(() => {this.contents.updateSpotLight()})
        spotLightFolder.add( this.contents.spotLight.target.position, 'x', -10, 10).name("target x").onChange( (value) => { this.contents.spotLight.target.position.set(value, this.contents.spotLight.target.position.y, this.contents.spotLight.target.position.z); this.contents.updateSpotLight() })
        spotLightFolder.add( this.contents.spotLight.target.position, 'y', -10, 10).name("target y").onChange( (value) => { this.contents.spotLight.target.position.set(this.contents.spotLight.target.position.x, value, this.contents.spotLight.target.position.z); this.contents.updateSpotLight() })
        spotLightFolder.add( this.contents.spotLight.target.position, 'z', -10, 10).name("target z").onChange( (value) => { this.contents.spotLight.target.position.set(this.contents.spotLight.target.position.x, this.contents.spotLight.target.position.y, value); this.contents.updateSpotLight() })
        spotLightFolder.open()
    }
}

export { MyGuiInterface };