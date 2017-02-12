import Character from './Character';

class CharacterCanvas {
    constructor() {
        this.createCanvas()
        this.canvas;
    }

    createCanvas() {
        this.setEvents();
        this.isPlaying = false;
        this.score;
        this.highScore;
        this.characters = [];
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'letterCanvas';
        this.velocity = 2;


        // set context dims and bg
        this.canvas.style.backgroundColor = '#000000';
        this.canvas.width  = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;

        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = '36px serif';

        document.body.appendChild(this.canvas); 

        this.ctx.fillText('Hit space to start', 50, 90);          
    }

    startGame() {
        this.isPlaying = true;
        this.score = 0;
        this.highScore = this.getHighScore();
        this.createCharacters(10);
    }

    setEvents() {
        document.addEventListener('keyup', (event) => {
            // if key in array
            if(!this.isPlaying && event.keyCode == 32) {
                this.startGame();
            }


            for(let i = 0; i < this.characters.length; i++) {
                if(this.characters[i].characterChar == event.key){
                    this.characters[i].reset();
                    this.score += 1;
                }
            }
        });
    }

    createCharacters(number) {
        for(let i = 0; i < number; i++) {
            this.characters.push(new Character());
        }
        this.startGameLoop();
    }
    
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    startGameLoop() {
        this.clearCanvas();
        for(let i = 0; i < this.characters.length; i++) {
            let char = this.characters[i];
            this.ctx.font = '62px serif';
            this.ctx.fillText((char.characterChar).toString(), char.characterX, char.characterY);
            char.setyPos( char.characterY + this.velocity);

            // remove if off screen
            if( char.characterY > this.canvas.height ){
                this.characters.splice(i,1);
            }
        }
        
        // fontsize  for ui
        this.ctx.font = '36px serif';

        // start loop
        if(this.characters.length !== 0) {
            requestAnimationFrame(() => this.startGameLoop() );
        } else {
            this.isPlaying = false;
            this.ctx.fillText('GAME OVER', 50, 50);
            this.ctx.fillText('Hit space to restart', 50, 90);
            // write highscore
            if(this.score > this.getHighScore() ) {
                localStorage.setItem('textHighScore', this.score);
            }            
        }

        // display score
        this.ctx.fillText(`Score (${this.highScore.toString()}) : ` + (this.score).toString(), this.canvas.width - 250, this.canvas.height - 50);      
    }

    getHighScore() {
        return (localStorage.getItem('textHighScore') === null) ? 0 : (localStorage.getItem('textHighScore'))*1; 
    }

};
 
export default CharacterCanvas;