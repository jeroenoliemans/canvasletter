class Character {
    constructor() {
        this.characterX;
        this.characterY;
        this.characterChar;
        this.reset();
    }

    reset() {
        this.characterX = (Math.floor(Math.random()*(document.body.clientWidth)-30) + 15);
        this.characterY  = 0 - Math.floor(Math.random()*1000);
        this.characterChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }

    setyPos(newy) {
        this.characterY = newy 
    }
};
 
export default Character;

