class Bot {
    constructor(name) {
        this.name = name;
        this.commands = {};
    }

    addCommand(trigger, action) {
        this.commands[trigger] = action;
    }

    async respond(message) {
        const command = this.commands[message];
        if (command) {
            return await command();
        }
        return null;
    }
}

export default Bot;
