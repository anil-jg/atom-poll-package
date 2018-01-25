"use babel";

import sendRequest from "./sendRequest";
export class PollAppService {
  host="http://pollappserver.herokuapp.com/api/v1/";
  createQuiz(quiz){
    quiz.createdBy = "Guest";
    quiz.userId = "1";
    return sendRequest(this.host+"polls",{
      method:"post",
      body:JSON.stringify(quiz)
    })
  }

  login(user){
    return sendRequest(this.host+"auth/login",{
      method:"post",
      body:JSON.stringify(user)
    })
  }

}

const pollAppService = new PollAppService();
export default pollAppService;
