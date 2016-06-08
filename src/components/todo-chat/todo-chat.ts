import lodash = require('lodash');
import NLC = require('natural-language-commander');

export class TodoChatController {
  private nlc = new NLC();
}

const todoChat: ng.IComponentOptions = {
  template: require('./todo-chat.html'),
  controller: TodoChatController
};

export default todoChat;