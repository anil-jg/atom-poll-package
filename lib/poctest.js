'use babel';

import PoctestView from './poctest-view';
import PoctestLogin from './poctest-login';
import { CompositeDisposable } from 'atom';

export default {

  poctestView: null,
  pollLogin: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.poctestView = new PoctestView(state.poctestViewState);
    this.poctestLogin = new PoctestLogin(state.poctestLoginState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.poctestView.getElement(),
      visible: false
    });
    this.loginPanel = atom.workspace.addModalPanel({
      item: this.poctestLogin.getElement(),
      visible: false
    });
    document.addEventListener("login",this.handleLogin.bind(this));
    document.addEventListener("quiz-created",this.handleQuizCreate.bind(this));

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
    this.poctestLogin.destroy();
  },

  serialize() {
    return {
    };
    poctestViewState: this.poctestView.serialize();
    poctestLoginState: this.poctestLogin.serialize();
  },

  toggle() {
    console.log('Poctest was toggled!');
    if(localStorage.accessToken){
      this.toggleFormModal();
    }
    else {
      this.toggleLoginModal()
    }
  },
  toggleFormModal(){
    if(this.modalPanel.isVisible()){
        this.hideFormModal()
    }
    else {
        this.showFormModal()
    }
  },

  toggleLoginModal(){
    if(this.loginPanel.isVisible()){
        this.hideLoginModal()
    }
    else {
        this.showLoginModal()
    }
  },

  showLoginModal(){
    this.modalPanel.hide()
    this.loginPanel.show()
  },
  hideLoginModal(){
    this.loginPanel.hide()
  },
  showFormModal(){
    var editor = atom.workspace.getActiveTextEditor();
    var selectedText = "";
    if(editor){
      selectedText = editor.getSelectedText();
    }
    this.poctestView.clear();
    this.poctestView.setCode(selectedText);
    this.loginPanel.show()
    this.modalPanel.show()
  },
  hideFormModal(){
    this.modalPanel.hide()
  },
  handleLogin(){
      this.showFormModal()
  },
  handleQuizCreate(){
      this.hideFormModal();
  }

};
