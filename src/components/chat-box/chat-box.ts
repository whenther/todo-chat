import lodash = require('lodash');

import {IMessage} from '../todo-chat/todo-chat';

export class ChatBoxController {
  // Bindings
  public messages: IMessage[];
}

const chatBox: ng.IComponentOptions = {
  bindings: {
    messages: '<'
  },
  template: require('./chat-box.html'),
  controller: ChatBoxController
};

export default chatBox;