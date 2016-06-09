import lodash = require('lodash');

import Bot from '../../services/bot';

export interface IMessage {
  text: string;
  fromUser?: boolean;
  fromBot?: boolean;
}

export class TodoChatController {
  public messages: IMessage[] = [];
  private bot: Bot;

  constructor(
    private $scope: ng.IScope,
    private $element: JQuery
  ) {
    this.bot = new Bot(this.onRecieve);
  }

  $onInit() {
    this.$element.find('textarea').focus();
  }

  /**
   * Handle receiving a message from the bot.
   * @param message - The bot's reply.
   */
  private onRecieve = (message: string): void => {
    this.messages.push({
      text: message,
      fromBot: true
    });
  };

  /**
   * Handle the user sending a message by printing it and passing it to the bot.
   * @param command - The user's command.
   */
  public onSend(command: string): void {
    this.messages.push({
      text: command,
      fromUser: true
    });

    this.bot.handleCommand(command).catch(() => {
      // Handle bad messages.
      this.messages.push({
        text: 'What?',
        fromBot: true
      });

      this.$scope.$apply();
    });
  }
}

const todoChat: ng.IComponentOptions = {
  template: require('./todo-chat.html'),
  controller: TodoChatController
};

export default todoChat;