import Bot from "./Bot";

class Bot3 extends Bot {
    constructor() {
        super('Bot3');
        this.addCommand('random', this.randomNumber);
        this.addCommand('randomstr', this.randomString);
        this.addCommand('randomcolor', this.randomHexColor);
        this.addCommand('help', () => 'Commands for Bot3: random, randomString, hexColor, help');
    }

    randomNumber() {
        return Math.floor(Math.random() * 100);
    }

    randomString() {
        return Math.random().toString(36).substring(7);
    }

    async randomHexColor() {
        const hex = Math.floor(Math.random() * 16777215).toString(16);
        const response = await fetch(`https://www.thecolorapi.com/id?hex=` + hex);
        const data = await response.json();
        return `Random color: ${data.hex.value}`;
    }
}

export default Bot3;