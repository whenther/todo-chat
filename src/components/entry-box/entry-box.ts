import lodash = require('lodash');

export class EntryBoxController {
  public command: string;
  private onSend: (args: { command: string }) => void;

  constructor(
    private $element: JQuery
  ) {
    
  }

  $onInit() {
    this.$element.find('textarea').focus();
  }

  public sendCommand(event: JQueryEventObject) {
    if (event.keyCode === 13) {
      this.onSend({command: this.command});

      event.preventDefault();
    }
  }
}

const entryBox: ng.IComponentOptions = {
  bindings: {
    onSend: '&'
  },
  template: require('./entry-box.html'),
  controller: EntryBoxController
};

export default entryBox;