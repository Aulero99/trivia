import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";
import { questionsService } from "../Services/QuestionsService.js";
import { appState } from "../AppState.js";

function _drawQuestion(){
    let questionTemplate = ''
    let answerTemplate = ''
    let qNum = appState.qNum
    questionTemplate = appState.questions[qNum].QuestionTemplate
    answerTemplate = appState.questions[qNum].AnswerTemplate

    setHTML('questionBoardHTM', questionTemplate)
    setHTML('answerBoardHTM', answerTemplate)
}

export class QuestionsController{
    constructor(){
        console.log('QuestionsController Online')
        questionsService.Online()
        _drawQuestion()
        appState.on('qNum', _drawQuestion)
    }

    correctAnswer(){
        console.log('Correct')
    }

    incorrectAnswer(){
        console.log('Incorrect');
    }

    nextQuestion(){
        questionsService.nextQuestion()
    }
}