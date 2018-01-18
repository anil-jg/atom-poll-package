'use babel';
import NotificationManager from "atom";
import PollAppService from "./pollappservice.js";
export default class PoctestView {

  optionElements = [];
  constructor(serializedState) {

    this.handleKeypress = this.handleKeypress.bind(this);
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('poctest');

    // Create elements

    this.panelHeader = document.createElement('div');
    this.panelHeader.innerHTML = "Create a Quiz";
    this.panelHeader.className = "panel-ehader mb-20";

    this.titleInput = document.createElement('input');
    this.titleInput.setAttribute("placeholder","Enter your title");
    this.titleInput.setAttribute("required",true);
    this.titleInput.className = "form-control mb-20";


    this.questionInput = document.createElement('textarea');
    this.questionInput.setAttribute("placeholder","Code");
    this.questionInput.setAttribute("required",true);
    this.questionInput.className = "form-control mb-20";

    this.optionsContainer = document.createElement('div');
    this.optionsContainer.className = "mb-20";
    this.optionsContainer.innerHTML = "Set Options (min 2)"
    this.addOptionElement();
    this.addOptionElement();



    this.createButton = document.createElement('button');
    this.createButton.innerHTML = "Create";
    this.createButton.className="btn btn-default";
    this.createButton.addEventListener("click",this.createData.bind(this));


    // appnding elements
    this.element.append(this.panelHeader);
    this.element.append(this.titleInput);
    this.element.append(this.questionInput);
    this.element.append(this.optionsContainer);
    this.element.append(this.createButton);
    console.log(document.querySelector(".mb-20"))
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
  setCode(code){
    this.questionInput.innerHTML = code;
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
  createData(){
    var title = this.titleInput.value;
    var code = this.questionInput.value;
    var options = [];
    this.optionElements.forEach(function(ele){
      if(ele.value && ele.value.length>0){
        return {
          name:ele.value
        }
      }
    })
    var quiz = {
      name:title,
      pollOptionDetails:options,
      code:code,
      templateType:"text",
      source:"atom"
    }
    console.log(quiz)
    PollAppService.createQuiz(quiz)
    .then(function(data){
      console.log(data);
      atom.notifications.addSuccess("Successfully Created");
    })
    .catch(function(err){
        console.log(err);
        atom.notifications.addSuccess("Error in Creating");
    })

  }

}
