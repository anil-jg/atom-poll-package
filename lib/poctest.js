'use babel';

import PoctestView from './poctest-view';
import { CompositeDisposable } from 'atom';

export default {

  poctestView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.poctestView = new PoctestView(state.poctestViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.poctestView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'poctest:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.poctestView.destroy();
  },

  serialize() {
    return {
    };
    poctestViewState: this.poctestView.serialize()
  },

  toggle() {
    console.log('Poctest was toggled!');
    if(this.modalPanel.isVisible()){
      this.hideModal()
    }
    else {
      this.showModal()
    }
  },
  showModal(){
    var editor = atom.workspace.getActiveTextEditor();
    var selectedText = "";
    if(editor){
      selectedText = editor.getSelectedText();
    }
    this.poctestView.setCode(selectedText);
    this.modalPanel.show()
  },
  hideModal(){
    this.modalPanel.hide()
  }


};
