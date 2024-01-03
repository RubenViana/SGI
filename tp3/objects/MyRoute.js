import * as THREE from 'three';

export class MyRoute extends THREE.Object3D
{
    constructor()
    {
        super()

        this.path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-571, 0, 414),
            new THREE.Vector3(-570, 0, 476),
            new THREE.Vector3(-565, 0, 537),
            new THREE.Vector3(-439, 0, 578),
            new THREE.Vector3(-403, 0, 576),
            new THREE.Vector3(-385, 0, 555),
            new THREE.Vector3(-381, 0, 526),
            new THREE.Vector3(-379, 0, 501),
            new THREE.Vector3(-377, 0, 430),
            new THREE.Vector3(-371, 0, 387),
            new THREE.Vector3(-357, 0, 372),
            new THREE.Vector3(-336, 0, 367),
            new THREE.Vector3(-318, 0, 378),
            new THREE.Vector3(-312, 0, 409),
            new THREE.Vector3(-312, 0, 530),
            new THREE.Vector3(-306, 0, 565),
            new THREE.Vector3(-292, 0, 581),
            new THREE.Vector3(-273, 0, 587),
            new THREE.Vector3(-253, 0, 580),
            new THREE.Vector3(-238, 0, 567),
            new THREE.Vector3(-226, 0, 535),
            new THREE.Vector3(-219, 0, 501),
            new THREE.Vector3(-165, 0, 220),
            new THREE.Vector3(-148, 0, 189),
            new THREE.Vector3(-127, 0, 184),
            new THREE.Vector3(-110, 0, 197),
            new THREE.Vector3(-104, 0, 221),
            new THREE.Vector3(-113, 0, 357),
            new THREE.Vector3(-131, 0, 512),
            new THREE.Vector3(-129, 0, 553),
            new THREE.Vector3(-117, 0, 573),
            new THREE.Vector3(-97, 0, 580),
            new THREE.Vector3(-75, 0, 575),
            new THREE.Vector3(-59, 0, 563),
            new THREE.Vector3(-40, 0, 513),
            new THREE.Vector3(-17, 0, 348),
            new THREE.Vector3(-11, 0, 175),
            new THREE.Vector3(-31, 0, 35),
            new THREE.Vector3(-71, 0, 12),
            new THREE.Vector3(-127, 0, 8),
            new THREE.Vector3(-187, 0, 20),
            new THREE.Vector3(-218, 0, 72),
            new THREE.Vector3(-247, 0, 213),
            new THREE.Vector3(-258, 0, 262),
            new THREE.Vector3(-275, 0, 271),
            new THREE.Vector3(-293, 0, 263),
            new THREE.Vector3(-307, 0, 214),
            new THREE.Vector3(-323, 0, 74),
            new THREE.Vector3(-340, 0, 22),
            new THREE.Vector3(-360, 0, 10),
            new THREE.Vector3(-467, 0, 20),
            new THREE.Vector3(-534, 0, 84),
            new THREE.Vector3(-558, 0, 209),
            new THREE.Vector3(-427, 0, 221),
            new THREE.Vector3(-404, 0, 233),
            new THREE.Vector3(-395, 0, 249),
            new THREE.Vector3(-403, 0, 268),
            new THREE.Vector3(-444, 0, 281),
            new THREE.Vector3(-527, 0, 298),
            new THREE.Vector3(-572, 0, 341),
            new THREE.Vector3(-571, 0, 414)
          ]);

        this.pathBot = new THREE.CatmullRomCurve3([
            new THREE.Vector3(25, 0.3, 25), // First curve
            new THREE.Vector3(180, 0.3, 25), // Second curve
            new THREE.Vector3(260, 0.3, 260), // Third curve
            new THREE.Vector3(290, 0.3, 260), // Third curve
            new THREE.Vector3(340, 0.3, 15), // Fourth curve
            new THREE.Vector3(480, 0.3, 15), //Fourth curve
            new THREE.Vector3(560, 0.3, 215), // Fifth curve
            new THREE.Vector3(400, 0.3, 215), // Sixth curve
            new THREE.Vector3(400, 0.3, 270), // Sixth curve
            new THREE.Vector3(570, 0.3, 320), // Seventh curve
            new THREE.Vector3(570, 0.3, 540), // Eighth curve 
            new THREE.Vector3(380, 0.3, 570), // Ninth curve
            new THREE.Vector3(360, 0.3, 370), // Tenth curve
            new THREE.Vector3(320, 0.3, 370), // Tenth curve
            new THREE.Vector3(290, 0.3, 570), // Eleventh curve
            new THREE.Vector3(240, 0.3, 570), // Eleventh curve
            new THREE.Vector3(150, 0.3, 180), // Twelfth curve
            new THREE.Vector3(110, 0.3, 180), // Twelfth curve
            new THREE.Vector3(130, 0.3, 570), // Thirteenth curve
            new THREE.Vector3(15, 0.3, 570), // Thirteenth curve
            new THREE.Vector3(18, 0.3, 320), // Thirteenth curve
          ]);


        let yAxis = new THREE.Vector3(0,1,0)
        this.pathBot_rotation = [
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(90)),
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(0)), // First Curve 
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-90)), // Second Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(0)), // Third Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(90)),// Third Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(0)), // Fourth Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-90)), // Fourth Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(180)), // Fifth Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-90)), // Sixth Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(0)), // Sixth Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-90)), // Seventh Curve  
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(180)), // Eighth Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(90)), // Ninth Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(180)), // Tenth Curve 
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-90)), // Tenth Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(180)), // Eleventh Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(90)), // Eleventh Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(180)), // Twelfth Curve 
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-90)), // Twelfth Curve 
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(180)), // Thirteenth Curve
            new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(90)), // Thirteenth Curve
        ]
    }
}