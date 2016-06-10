import _ = require('lodash');
import NLC = require('natural-language-commander');

import Todo from './Todo';

class Bot {
  private nlc: NLC;
  private todo: Todo;
  /** The message to send when nothing matches. */
  private failMessage = 'What?';

  constructor(
    private send: (message: string) => void
  ) {
    this.nlc = new NLC();
    this.todo = new Todo();

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
        'remind me to {Item}',
        'have me {Item}',
        'get me to {Item}',
        'make me {Item}',
        'add {Item}'
      ],
      callback: (item: string) => {
        const success = this.todo.addItem(item);

        if (success) {
          this.send(`Okay, added ${item} to your todo list!`);
        } else {
          this.send(`Sorry, ${item} is already on your todo list!`);
        }
      }
    });

    this.nlc.registerIntent({
      intent: 'LIST',
      slots: [
        {
          name: 'Item',
          type: 'STRING'
        }
      ],
      utterances: [
        `what's on my todo list`,
        `what is on my todo list`,
        `what's on my list`,
        `what is on my list`,
        `what's on the todo list`,
        `what is on the todo list`,
        `what's on the list`,
        `what is on the list`,
        `what do I have to do`,
        `do I have to do anything`,
        `do I have anything to do`
      ],
      callback: () => {
        const list = this.todo.listItems();

        // Handle empty list.
        if (!list.length) {
          this.send(`Looks like you've got nothing to do!`);
          return;
        }

        // Describe list.
        this.send(`Here's what's on your todo list:`);

        // List each item.
        _.forEach(list, (item: string): void => {
          this.send(item);
        });
      }
    });
  }

  public handleCommand = (command) => {
    return this.nlc.handleCommand(command)
      .catch(() => this.send(this.failMessage));
  };
}

export default Bot;