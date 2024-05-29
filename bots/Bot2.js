import Bot from './Bot.js';

class Bot2 extends Bot {
    constructor() {
        super('Bot2');
        this.addCommand('lastwinner', this.fetchLastWinner);
        this.addCommand('nextrace', this.fetchNextRace);
        this.addCommand('goat', () => 'Lewis Hamilton');
        this.addCommand('help', () => 'Commands for Bot2: name, hello, bitcoin, help');
    }

    async fetchLastWinner() {
        const response = await fetch('https://ergast.com/api/f1/current/last/results.json');
        const data = await response.json();
        return `Last winner : ${data.MRData.RaceTable.Races[0].Results[0].Driver.givenName} ${data.MRData.RaceTable.Races[0].Results[0].Driver.familyName}`;
    }

    async fetchNextRace() {
        const response = await fetch('https://ergast.com/api/f1/current/next.json');
        const data = await response.json();
        return `Next Race : ${data.MRData.RaceTable.Races[0].raceName}`;
    }


}

export default Bot2;