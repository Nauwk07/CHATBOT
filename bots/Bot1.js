import Bot from './Bot.js';

class Bot1 extends Bot {
    constructor() {
        super('Bot1');
        this.addCommand('name', () => 'My name is Arnaud');
        this.addCommand('hello', () => 'Hello from Arnaud');
        this.addCommand('bitcoin', this.fetchBitcoinPrice);
        this.addCommand('help', () => 'Commands for Bot Arnaud: name, hello, bitcoin, help');
    }

    async fetchBitcoinPrice() {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.json();
        return `Bitcoin price: ${data.bpi.USD.rate} USD`;
    }
}

export default Bot1;
