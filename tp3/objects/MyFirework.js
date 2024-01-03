import * as THREE from 'three'

class MyFirework {
    constructor(app, scene) {
        this.app = app
        this.scene = scene

        this.done     = false 
        this.dest     = [] 
        
        this.vertices = null
        this.colors   = null
        this.geometry = null
        this.points   = null
        
        this.material = new THREE.PointsMaterial({
            size: 1,
            color: 0xffffff,
            opacity: 1,
            vertexColors: true,
            transparent: true,
            depthTest: false,
        })
        
        this.height = 30
        this.speed = 60

        this.launch();
    }

    launch() {
        // Gerar uma cor aleatória para cada fogos de artifício lançado
        const color = new THREE.Color();
        color.setHSL(THREE.MathUtils.randFloat(0.1, 0.9), 1, 0.9);
        this.material.color = color;
        color.setHSL( THREE.MathUtils.randFloat( 0.1, 0.9 ), 1, 0.9 )
        let colors = [ color.r, color.g, color.b ]

        let x = THREE.MathUtils.randFloat( -10, 10 ) 
        let y = THREE.MathUtils.randFloat( this.height * 0.9, this.height * 1.1)
        let z = THREE.MathUtils.randFloat( -5, 5 ) 
        this.dest.push( x, y, z ) 
        let vertices = [0,0,0]
        
        this.geometry = new THREE.BufferGeometry()
        this.geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(vertices), 3 ) );
        this.geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array(colors), 3 ) );
        this.points = new THREE.Points( this.geometry, this.material )
        this.points.castShadow = true;
        this.points.receiveShadow = true;
        this.app.scene.add( this.points )  
        //console.log("firework launched")
    }

    explode(origin, n, rangeBegin, rangeEnd) {
        // Remove a partícula existente
        this.app.scene.remove(this.points);

        // Gerar nova geometria de partículas para simular a explosão
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];

        for (let i = 0; i < n; i++) {
            // Criar partículas em direções radiais
            const u = Math.random() * 2 * Math.PI;
            const v = Math.random() * 2 - 1;
            const radius = rangeBegin + Math.random() * (rangeEnd - rangeBegin);

            const x = origin[0] + radius * Math.cos(u) * Math.sqrt(1 - v * v);
            const y = origin[1] + radius * Math.sin(u) * Math.sqrt(1 - v * v);
            const z = origin[2] + radius * v;

            positions.push(x, y, z);

            // Definir cores para as partículas
            for (let i = 0; i < n; i++) {
                // Gerar cores aleatórias para as novas partículas na explosão
                const color = new THREE.Color();
                color.setHSL(THREE.MathUtils.randFloat(0.1, 0.9), 1, 0.9);
                colors.push(color.r, color.g, color.b);
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        // Criar nova instância de Points com a nova geometria
        this.points = new THREE.Points(geometry, this.material);
        this.app.scene.add(this.points);

        setTimeout(() => {
            this.reset();
            this.done = true;
        }, 1000);
    }
    
    /**
     * cleanup
     */
    reset() {
        //console.log("firework reseted")
        this.app.scene.remove( this.points )  
        this.dest     = [] 
        this.vertices = null
        this.colors   = null 
        this.geometry = null
        this.points   = null
    }

    /**
     * update firework
     * @returns 
     */
    update() {
        
        // do only if objects exist
        if( this.points && this.geometry )
        {
            let verticesAtribute = this.geometry.getAttribute( 'position' )
            let vertices = verticesAtribute.array
            let count = verticesAtribute.count

            // lerp particle positions 
            let j = 0
            for( let i = 0; i < vertices.length; i+=3 ) {
                vertices[i  ] += ( this.dest[i  ] - vertices[i  ] ) / this.speed
                vertices[i+1] += ( this.dest[i+1] - vertices[i+1] ) / this.speed
                vertices[i+2] += ( this.dest[i+2] - vertices[i+2] ) / this.speed
            }
            verticesAtribute.needsUpdate = true
            
            // only one particle?
            if( count === 1 ) {
                //is YY coordinate higher close to destination YY? 
                if( Math.ceil( vertices[1] ) > ( this.dest[1] * 0.95 ) ) {
                    // add n particles departing from the location at (vertices[0], vertices[1], vertices[2])
                    this.explode(vertices, 20, this.height * 0.1, this.height * 0.16) 
                    return 
                }
            }
            
            // are there a lot of particles (aka already exploded)?
            if( count > 1 ) {
                // fade out exploded particles 
                this.material.opacity -= 0.015 
                this.material.needsUpdate = true
            }
            
            // remove, reset and stop animating 
            if( this.material.opacity <= 0 )
            {
                this.reset() 
                this.done = true 
                return 
            }
        }
    }
}

export { MyFirework }