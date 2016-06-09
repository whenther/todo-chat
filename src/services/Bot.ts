import NLC = require('natural-language-commander');

class Bot {
  private nlc: NLC;

  constructor(
    private send: (message: string) => void
  ) {
    this.nlc = new NLC();

    this.nlc.registerIntent({
      intent: 'PING_PONG',
      utterances: [
        'ping'
      ],
      callback: () => this.send('Pong.')
    });

    this.nlc.registerIntent({
      intent: 'ADD',
      slots: [
        {
          name: 'Item',
          type: 'STRING'
        }
      ],
      utterances: [
        'add {Item} to my list',
        'put {Item} to my list',
        'add {Item} to the list',
        'put {Item} to the list',
        'add {Item} to my todo list',
        'put {Item} on my todo list',
        'add {Item} to the todo list',
        'put {Item} on the todo list',
        'remind me to {Item}'
      ],
      callback: (item) => {
        this.send(`Okay, added ${item} to your list!`);
      }
    });
  }

  public handleCommand = (command) => {
    return this.nlc.handleCommand(command);
  };
}

export default Bot;