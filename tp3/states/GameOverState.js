import { State } from "./State.js";
import { GamePlayState } from "./GamePlayState.js";
import { InitState } from "./InitState.js";
import { Sprite } from "../sprites/Sprite.js";
import * as THREE from "three";

class GameOverState extends State {
    constructor(app, gameSettings) {
        super(app);
        this.name = "GameOverState";
        this.app = app;
        //this.previousState = previousState;
        this.gameSettings = gameSettings;

        this.timerSprite = new Sprite(`Time: ${(this.gameSettings.players[0].time).toFixed(2)}`, 900, 256);
        this.timerSprite.scale.set(200, 80, 1);
        this.timerSprite.position.set(window.innerWidth / 40, window.innerHeight / 3, 0);
        this.app.HUDscene.add(this.timerSprite);
        this.timerSprite.visible = false;

        this.timerAdversarySprite = new Sprite(`Time enemy: ${(this.gameSettings.players[1].time).toFixed(2)}`, 900, 256);
        this.timerAdversarySprite.scale.set(200, 80, 1);
        this.timerAdversarySprite.position.set(window.innerWidth / 40, window.innerHeight / 3.5, 0);
        this.app.HUDscene.add(this.timerAdversarySprite);
        this.timerAdversarySprite.visible = false;

        if (this.gameSettings.players[0].time < this.gameSettings.players[1].time) {
            this.winner = new Sprite("You Won!", 900, 256);
            this.winner.scale.set(200, 80, 1);
            this.winner.position.set(window.innerWidth / 40, window.innerHeight / 4, 0);
            this.app.HUDscene.add(this.winner);
            this.winner.visible = false;
            this.loser = new Sprite("Enemy Lost!", 900, 256);
            this.loser.scale.set(100, 80, 1);
            this.loser.position.set(window.innerWidth / 40, window.innerHeight / 5, 0);
            this.app.HUDscene.add(this.loser);
            this.loser.visible = false;
        }
        else {
            this.loser = new Sprite("You Lost!", 900, 256);
            this.loser.scale.set(200, 80, 1);
            this.loser.position.set(window.innerWidth / 40, window.innerHeight / 4, 0);
            this.app.HUDscene.add(this.loser);
            this.loser.visible = false;
            this.winner = new Sprite("Enemy Won!", 900, 256);
            this.winner.scale.set(200, 80, 1);
            this.winner.position.set(window.innerWidth / 40, window.innerHeight / 5, 0);
            this.app.HUDscene.add(this.winner);
            this.winner.visible = false;
        }

        this.difficulty = new Sprite(`Difficulty: ${this.gameSettings.difficulty}`, 900, 256);
        this.difficulty.scale.set(200, 80, 1);
        this.difficulty.position.set(window.innerWidth / 40, window.innerHeight / 6, 0);
        this.app.HUDscene.add(this.difficulty);
        this.difficulty.visible = false;
        
    }

    update() {
        //document.getElementById("pauseHUD").style.display = "flex";
        
        //this.carWinner.visible = true;
        //this.carLoser.visible = true;
        this.timerSprite.visible = true;
        this.timerAdversarySprite.visible = true;
        this.difficulty.visible = true;
        this.winner.visible = true;
        this.loser.visible = true;

        /**
         * updates the contents
         * this method is called from the render method of the app
         * 
         */
            // add new fireworks every 5% of the calls
            /*
            if(Math.random()  < 0.01 ) {
                this.fireworks.push(new MyFirework(this.app, this))
                console.log("firework added")
            }

            // for each fireworks 
            for( let i = 0; i < this.fireworks.length; i++ ) {
                // is firework finished?
                if (this.fireworks[i].done) {
                    // remove firework 
                    this.fireworks.splice(i,1) 
                    console.log("firework removed")
                    continue 
                }
                // otherwise upsdate  firework
                this.fireworks[i].update()
            }*/
    
    }

    onKeyPress(event) {
        switch (event.keyCode) {
            case 98: // b
                //document.getElementById("GamePlayState").style.display = "none";

                while (this.app.HUDscene.children.length > 0 ) {
                    const obj = this.app.HUDscene.children[0]; // Pega o primeiro objeto da lista
                    this.app.HUDscene.remove(obj); // Remove o objeto da cena
                    //obj.dispose(); // Limpa as referências para o objeto (opcional, se necessário)
                }

                // game settings
                this.gameSettingsInit = {
                    laps: 3,
                    difficulty: 1,
                    track: this.app.track,
                    plane: this.app.plane,
                    powerUps: this.app.powerUps,
                    obstacles: this.app.obstacles,
                    players: [
                        {
                            name: "Player 1",
                            car: null,
                            time: 0,
                            timeDiscount: 0,
                            laps: 0,
                            place: 0,
                        },
                        {
                            name: "Player 2",
                            car: null,
                            time: 0,
                            timeDiscount: 0,
                            laps: 0,
                            place: 0,
                        }
                    ]
                }; 

                this.gameSettingsInit.players[0].car = this.gameSettings.players[0].car;
                this.gameSettingsInit.players[1].car = this.gameSettings.players[1].car;

                this.setState(new GamePlayState(this.app, this.gameSettingsInit)); // if the keys were pressed, they will still be pressed!!!
                break;
            case 109:  // m
                // Obtém a lista de objetos na cena HUDscene
                const objectsToRemove = this.app.HUDscene.children;

                // Verifica quantos objetos existem na cena antes da remoção
                console.log(this.app.HUDscene.children.length); 

                // Loop para remover todos os objetos da cena
                while (this.app.HUDscene.children.length > 0 || this.app.scene.children.length > 0) {
                    const obj = this.app.HUDscene.children[0]; // Pega o primeiro objeto da lista
                    const obj2 = this.app.scene.children[0]; // Pega o primeiro objeto da lista
                    this.app.HUDscene.remove(obj); // Remove o objeto da cena
                    this.app.scene.remove(obj2); // Remove o objeto da cena
                    //obj.dispose(); // Limpa as referências para o objeto (opcional, se necessário)
                }

                // add an ambient light
                const ambientLight = new THREE.AmbientLight( 0x555555, 4 );
                this.app.scene.add( ambientLight );
                
                // add a sun light
                this.directionalLight = new THREE.DirectionalLight(0xf8e45c, 10);
                this.directionalLight.castShadow = true;
                this.app.scene.add(this.directionalLight);
                this.directionalLight.position.set(-0, 30, 0); // Adjust the position of the light source
                this.directionalLightHelper = new THREE.DirectionalLightHelper( this.directionalLight );
                this.app.scene.add( this.directionalLightHelper );

                // Verifica quantos objetos existem na cena após a remoção
                console.log(this.app.HUDscene.children.length);

                this.setState(new InitState(this.app));
                break;
        }

    }
}

export { GameOverState };