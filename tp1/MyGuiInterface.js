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

        // adds a folder to the gui interface for the camera
        const cameraFolder = this.datgui.addFolder('Camera')
        cameraFolder.add(this.app, 'activeCameraName', [ 'Perspective', 'Left', 'Top', 'Front' ] ).name("active camera")
        cameraFolder.add(this.app, 'targetName', [ 'Cake', 'Spring', 'Newspaper', 'Frames', 'Carocha', 'Jar', 'Window', 'TV', 'Snorlax' ]).name("target").onChange((target) => {this.app.controls.target.set(this.app.targets[target].x, this.app.targets[target].y, this.app.targets[target].z);})
        cameraFolder.open()


        // // adds a folder to the gui interface for the table
        // const tableFolder = this.datgui.addFolder('Table')
        // tableFolder.add(this.contents.table.position, 'x', -5, 5)
        // tableFolder.add(this.contents.table.position, 'y', -5, 5)
        // tableFolder.add(this.contents.table.position, 'z', -5, 5)
        // tableFolder.add(this.contents.table.rotation, 'y', 0, 2*Math.PI).name("rotation")
        // tableFolder.open()


        const spotLightAngle = {
            'angle': this.contents.spotLight.angle * 180 / Math.PI
        }

        // adds a folder to the gui interface for the spotLight
        const spotLightFolder = this.datgui.addFolder('Spot Light')
        spotLightFolder.add(this.contents, 'spotLightEnabled', true).name("On/Off").onChange(() => {this.contents.updateSpotLight()})
        spotLightFolder.add(this.contents, 'spotLightHelperEnabled', true).name("Helper").onChange(() => {this.contents.updateSpotLight()})
        const spotLightFolderMore = spotLightFolder.addFolder('More')
        spotLightFolderMore.addColor( this.contents.spotLight, 'color' ).onChange( (value) => { this.contents.updateSpotLightColor(value) } )
		spotLightFolderMore.add( this.contents.spotLight, 'intensity', 0, 40, 1 )
		spotLightFolderMore.add( this.contents.spotLight, 'distance', 0, 20 ).onChange(this.contents.updateSpotLight())
		spotLightFolderMore.add( spotLightAngle, 'angle', 0, 90 ).onChange( (value) => { this.contents.spotLight.angle = value * Math.PI / 180; this.contents.updateSpotLight() } )
		spotLightFolderMore.add( this.contents.spotLight, 'penumbra', 0, 1, 0.01 ).onChange(this.contents.updateSpotLight())
        spotLightFolderMore.add( this.contents.spotLight, 'decay', 0, 2, 0.01 ).onChange(() => {this.contents.updateSpotLight()})
        spotLightFolderMore.add( this.contents.spotLight.position, 'x', -10, 10).onChange(() => {this.contents.updateSpotLight()})
        spotLightFolderMore.add( this.contents.spotLight.position, 'y', -10, 10).onChange(() => {this.contents.updateSpotLight()})
        spotLightFolderMore.add( this.contents.spotLight.position, 'z', -10, 10).onChange(() => {this.contents.updateSpotLight()})
        spotLightFolderMore.add( this.contents.spotLight.target.position, 'x', -10, 10).name("target x").onChange( (value) => { this.contents.spotLight.target.position.set(value, this.contents.spotLight.target.position.y, this.contents.spotLight.target.position.z); this.contents.updateSpotLight() })
        spotLightFolderMore.add( this.contents.spotLight.target.position, 'y', -10, 10).name("target y").onChange( (value) => { this.contents.spotLight.target.position.set(this.contents.spotLight.target.position.x, value, this.contents.spotLight.target.position.z); this.contents.updateSpotLight() })
        spotLightFolderMore.add( this.contents.spotLight.target.position, 'z', -10, 10).name("target z").onChange( (value) => { this.contents.spotLight.target.position.set(this.contents.spotLight.target.position.x, this.contents.spotLight.target.position.y, value); this.contents.updateSpotLight() })
        spotLightFolderMore.close()
        spotLightFolder.open()

        // adds a folder to the gui interface for the directionalLight
        const directionalLightFolder = this.datgui.addFolder('Directional Light')
        directionalLightFolder.add(this.contents, 'directionalLightEnabled', true).name("On/Off").onChange(() => {this.contents.updateDirectionalLight()})
        directionalLightFolder.add(this.contents, 'directionalLightHelperEnabled', true).name("Helper").onChange(() => {this.contents.updateDirectionalLight()})
        const directionalLightFolderMore = directionalLightFolder.addFolder('More')
        directionalLightFolderMore.addColor( this.contents.directionalLight, 'color' ).onChange( (value) => { this.contents.updateDirectionalLightColor(value) } )
        directionalLightFolderMore.add( this.contents.directionalLight, 'intensity', 0, 40, 1 )
        // can add other properties here
        directionalLightFolderMore.close()
        spotLightFolder.open()

        // adds a enable/disable for room lights
        const roomLightsFolder = this.datgui.addFolder('Room Lights')
        roomLightsFolder.add(this.contents, 'roomLightsEnabled', true).name("On/Off").onChange(() => {this.contents.roomLights.forEach(x => {x.visible = this.contents.roomLightsEnabled});})
        const roomLightsFolderMore = roomLightsFolder.addFolder('More')
        roomLightsFolderMore.addColor( this.contents.roomLights[0], 'color' ).onChange( (value) => {this.contents.roomLights.forEach(x => {x.color.set(value)});} )
        roomLightsFolderMore.add( this.contents.roomLights[0], 'intensity', 0, 5, 1 ).onChange( (value) => {this.contents.roomLights.forEach(x => {x.intensity = value});} )
        roomLightsFolderMore.close()
        roomLightsFolder.open()


    }
}

export { MyGuiInterface };