'use babel';
import NotificationManager from "atom";
import PollAppService from "./pollappservice.js";
export default class PoctestLogin {

  optionElements = [];
  constructor(serializedState) {

    this.handleKeypress = this.handleKeypress.bind(this);
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('poctest');

    // Create elements

    this.panelHeader = document.createElement('div');
    this.panelHeader.innerHTML = "Please login to pollapp";
    this.panelHeader.className = "panel-header mb-20";

    this.emailInput = document.createElement('input');
    this.emailInput.setAttribute("placeholder","Email");
    this.emailInput.setAttribute("required",true);
    this.emailInput.className = "form-control mb-20";

    this.passwordInput = document.createElement('input');
    this.passwordInput.setAttribute("placeholder","Password");
    this.passwordInput.setAttribute("required",true);
    this.passwordInput.className = "form-control mb-20"


    this.loginButton = document.createElement('button');
    this.loginButton.innerHTML = "Login";
    this.loginButton.className="btn btn-default";
    this.loginButton.addEventListener("click",this.login.bind(this));


    // appnding elements
    this.element.append(this.panelHeader);
    this.element.append(this.emailInput);
    this.element.append(this.passwordInput);
    this.element.append(this.loginButton);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
  createOptionElement(){
    var optionEle = document.createElement("input");
    optionEle.setAttribute("data-index",this.optionElements.length);
    optionEle.addEventListener("input",this.handleKeypress);
    optionEle.className = "form-control mb-10";
    return optionEle;
  }
  addOptionElement(){
    var newOptionEle = this.createOptionElement();
    this.optionsContainer.append(newOptionEle);
    this.optionElements.push(newOptionEle);
  }
  handleKeypress(e){
    console.log("key");
    if(e.target.value && e.target.value.length>0){
      var index = parseInt(e.target.dataset.index);
      if(index+1===this.optionElements.length){
        this.addOptionElement();
      }
    }
  }
  login(){
    var email = this.emailInput.value;
    var password = this.passwordInput.value;
    var code = this.passwordInput.value;
    var options = [];
    var user = {
      email:email,
      password:password
    }
    PollAppService.login(user)
    .then(function(data){
      console.log(data);
      localStorage.accessToken = data.token;
      var loginEvent = new Event("login");
      document.dispatchEvent(loginEvent);
    })
    .catch(function(err){
        console.log(err);
        atom.notifications.addSuccess("Error in Login",err.message || "Unknown Error");
    })

  }

}
