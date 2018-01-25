'use babel';

import PoctestView from './poctest-view';
<<<<<<< HEAD
import PoctestLogin from './poctest-login';
=======
>>>>>>> 11ca9c22151e4a6ffc6ec43bb5c3d5717630189e
import { CompositeDisposable } from 'atom';

export default {

  poctestView: null,
<<<<<<< HEAD
  pollLogin: null,
=======
>>>>>>> 11ca9c22151e4a6ffc6ec43bb5c3d5717630189e
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.poctestView = new PoctestView(state.poctestViewState);
<<<<<<< HEAD
    this.poctestLogin = new PoctestLogin(state.poctestLoginState);
=======
>>>>>>> 11ca9c22151e4a6ffc6ec43bb5c3d5717630189e
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.poctestView.getElement(),
      visible: false
    });
<<<<<<< HEAD
    this.loginPanel = atom.workspace.addModalPanel({
      item: this.poctestLogin.getElement(),
      visible: false
    });
    document.addEventListener("login",this.handleLogin.bind(this));
    document.addEventListener("quiz-created",this.handleQuizCreate.bind(this));
=======
>>>>>>> 11ca9c22151e4a6ffc6ec43bb5c3d5717630189e

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
<<<<<<< HEAD
    this.poctestLogin.destroy();
=======
>>>>>>> 11ca9c22151e4a6ffc6ec43bb5c3d5717630189e
  },

  serialize() {
    return {
    };
<<<<<<< HEAD
    poctestViewState: this.poctestView.serialize();
    poctestLoginState: this.poctestLogin.serialize();
=======
    poctestViewState: this.poctestView.serialize()
>>>>>>> 11ca9c22151e4a6ffc6ec43bb5c3d5717630189e
  },

  toggle() {
    console.log('Poctest was toggled!');
<<<<<<< HEAD
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
=======
    if(this.modalPanel.isVisible()){
      this.hideModal()
    }
    else {
      this.showModal()
    }
  },
  showModal(){
>>>>>>> 11ca9c22151e4a6ffc6ec43bb5c3d5717630189e
    var editor = atom.workspace.getActiveTextEditor();
    var selectedText = "";
    if(editor){
      selectedText = editor.getSelectedText();
    }
<<<<<<< HEAD
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

=======
    this.poctestView.setCode(selectedText);
    this.modalPanel.show()
  },
  hideModal(){
    this.modalPanel.hide()
  }


>>>>>>> 11ca9c22151e4a6ffc6ec43bb5c3d5717630189e
};
