'use babel';
import NotificationManager from "atom";
import PollAppService from "./pollappservice.js";
export default class PoctestView {

  optionElements = [];
  answerElements = [];
  constructor(serializedState) {

    this.handleKeypress = this.handleKeypress.bind(this);
    this.handleAnswerKeypress = this.handleAnswerKeypress.bind(this);
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


    this.questionInput = document.createElement('atom-text-editor');
    console.log(this.questionInput);
    this.questionInput.setAttribute("placeholder","Code");
    this.questionInput.setAttribute("required",true);
    this.questionInput.className = "form-control mb-20 text-editor";

    this.optionsContainer = document.createElement('div');
    this.optionsContainer.className = "mb-20";
    this.optionsContainer.innerHTML = "Set Options (min 2)"
    this.addOptionElement();
    this.addOptionElement();

    this.answersContainer = document.createElement('div');
    this.answersContainer.className = "mb-20";
    this.answersContainer.innerHTML = "Set Answers (min 2)";
    this.answersContainer.style.display = "none";
    this.addAnswerElement();
    this.addAnswerElement();

    this.expectsInputCheckbox = document.createElement('input');
    this.expectsInputCheckbox.type="checkbox";
    this.expectsInputCheckbox.addEventListener("change",this.expectsInputCheckboxToggleHandler.bind(this));

    this.expectsInputLabel = document.createElement('label');
    this.expectsInputLabel.innerHTML = "Does it expects user input";

    this.createButton = document.createElement('button');
    this.createButton.innerHTML = "Create";
    this.createButton.className="btn btn-default";
    this.createButton.addEventListener("click",this.createData.bind(this));


    // appnding elements
    this.element.append(this.panelHeader);
    this.element.append(this.titleInput);
    this.element.append(this.questionInput);
    this.element.append(this.expectsInputCheckbox);
    this.element.append(this.expectsInputLabel);
    this.element.append(this.optionsContainer);
    this.element.append(this.answersContainer);
    this.element.append(this.createButton);
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
    this.questionInput.value = code;
    this.questionInput.getModel().setText(code);
  }
  clear(){
    this.questionInput.getModel().setText("");
    this.optionsContainer.innerHTML = "<div class='mb-20 mt-20'>Set Options (min 2)</div>";
    this.answersContainer.innerHTML = "<div class='mb-20 mt-20'>Set Answers (min 2)</div>";
    this.titleInput.value = "";
    this.optionElements = [];
    this.answerElements = [];
    this.addAnswerElement();
    this.addAnswerElement();
    this.addOptionElement();
    this.addOptionElement();
  }
  expectsInputCheckboxToggleHandler(e){
      if(e.target.checked){
          this.optionsContainer.style.display = "none";
          this.answersContainer.style.display = "block";
      }
      else {
          this.optionsContainer.style.display = "block";
          this.answersContainer.style.display = "none";
      }
  }
  createOptionElement(){
    var optionEle = document.createElement("input");
    optionEle.setAttribute("data-index",this.optionElements.length);
    optionEle.addEventListener("input",this.handleKeypress);
    optionEle.className = "form-control mb-10";
    return optionEle;
  }
  createAnswerElement(){
    var answerEle = document.createElement("input");
    answerEle.setAttribute("data-index",this.answerElements.length);
    answerEle.addEventListener("input",this.handleAnswerKeypress);
    answerEle.className = "form-control mb-10";
    return answerEle;
  }
  addOptionElement(){
    var newOptionEle = this.createOptionElement();
    this.optionsContainer.append(newOptionEle);
    this.optionElements.push(newOptionEle);
  }
  addAnswerElement(){
    var newAnswerEle = this.createAnswerElement();
    this.answersContainer.append(newAnswerEle);
    this.answerElements.push(newAnswerEle);
  }
  handleKeypress(e){
    if(e.target.value && e.target.value.length>0){
      var index = parseInt(e.target.dataset.index);
      if(index+1===this.optionElements.length){
        this.addOptionElement();
      }
    }
  }
  handleAnswerKeypress(e){
    if(e.target.value && e.target.value.length>0){
      var index = parseInt(e.target.dataset.index);
      if(index+1===this.answerElements.length){
        this.addAnswerElement();
      }
    }
  }
  createData(){
    var title = this.titleInput.value;
    var code = this.questionInput.getModel().getText();

    var quiz = {
      name:title,
      code:code,
      templateType:"text",
      source:"atom"
    }
    if(this.expectsInputCheckbox.checked){
        quiz.expectsInput = true;
        quiz.answers = this.answerElements.map(function(ele){
            if(ele.value && ele.value.length>0){
              return ele.value
            }
        });
    }
    else {
        var options = [];
        this.optionElements.forEach(function(ele){
          if(ele.value && ele.value.length>0){
            return {
              name:ele.value
            }
          }
        })
        quiz.quizOptionDetails = options;
    }
    console.log(quiz)
    PollAppService.createQuiz(quiz)
    .then(function(data){
      console.log(data);
      document.dispatchEvent(new Event("quiz-created"));
      atom.notifications.addSuccess("Successfully Created");
    })
    .catch(function(err){
        console.log(err);
        atom.notifications.addSuccess("Error in Creating");
    })

  }

}
