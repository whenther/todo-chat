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
      callback: () => {
        this.send('Pong.');
      }
    });
  }

  public handleCommand = (command) => {
    return this.nlc.handleCommand(command);
  };
}

export default Bot;